'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const productRepo = require('~/api/v1/repositories/product.repo')
const checkoutRepo = require('~/api/v1/repositories/checkout.repo')
const orderStatusRepo = require('~/api/v1/repositories/order.status.repo')
const orderRepo = require('~/api/v1/repositories/order.repo')
const orderDetailRepo = require('~/api/v1/repositories/order.detail.repo')
const {
  OrderStatus,
  OrderDetail,
  Product,
  PaymentForm
} = require('~/api/v1/models')
const vnpayProvider = require('~/api/v1/providers/vnpay.provider')
const { app: { paySuccessUrl, payFailUrl } } = require('~/config/environment.config')

const review = async ({ orderProducts = [] }) => {
  const checkedProducts = await checkoutRepo.checkProductsAvailable(
    orderProducts
  )
  if (checkedProducts.includes(undefined))
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order wrong')

  const totalOrder = checkedProducts.reduce((acc, orderProduct) => {
    return acc + orderProduct.price * orderProduct.quantity
  }, 0)

  const fullOrderProducts = await checkoutRepo.getfullOrderProductsByIds(
    orderProducts
  )
  if (fullOrderProducts.includes(undefined))
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order wrong')

  return {
    products: fullOrderProducts,
    totalOrder
  }
}

const order = async ({
  userId,
  shipAddress,
  phoneNumber,
  paymentFormId,
  orderProducts = []
}) => {
  const checkedProducts = await checkoutRepo.checkProductsAvailable(
    orderProducts
  )
  if (checkedProducts.includes(undefined))
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order wrong')

  try {
    const newOrder = await orderRepo.createOrder({
      shipAddress,
      phoneNumber,
      userId,
      paymentFormId,
      orderStatusId: 1
    })

    const fullOrderProducts = await Promise.all(
      orderProducts.map(async (orderProduct) => {
        const foundProduct = await productRepo.getProductById(
          orderProduct.productId
        )
        if (!foundProduct)
          throw new ApiError(StatusCodes.BAD_REQUEST, 'Order wrong')

        const newOrderDetail = await orderDetailRepo.createOrderDetail({
          orderId: newOrder.id,
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
          price: foundProduct.price
        })

        // reduce inventory when ordering
        foundProduct.update({
          stockQuantity: foundProduct.stockQuantity - orderProduct.quantity
        })

        return {
          quantity: newOrderDetail.quantity,
          product: {
            id: foundProduct.id,
            name: foundProduct.name,
            description: foundProduct.description,
            imageUrl: foundProduct.imageUrl,
            price: foundProduct.price
          }
        }
      })
    )

    const foundOrderStatus = await orderStatusRepo.getOrderStatusById(
      newOrder.orderStatusId
    )

    return {
      orderId: newOrder.id,
      shipAddress: newOrder.shipAddress,
      phoneNumber: newOrder.phoneNumber,
      orderStatus: foundOrderStatus.name,
      products: fullOrderProducts
    }
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getAllOrders = async ({ filter, selector, pagination, sorter }) => {
  const orders = await orderRepo.getAllOrders({ filter, selector, pagination, sorter })
  return {
    orders
  }
}

const cancelOrder = async ({ userId, orderId }) => {
  const fullOrder = await orderRepo.getOrderWithQuery({
    where: { userId, id: orderId },
    include: [
      {
        model: OrderStatus,
        as: 'orderStatus',
        attributes: ['name']
      }
    ]
  })
  if (!fullOrder) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')
  const isCancelled = fullOrder.orderStatus.name === 'Pending'
  if (!isCancelled) throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot cannel')

  await orderDetailRepo.deleteOrderDetailByOrderId(fullOrder.id)
  await orderRepo.deleteOrder({ userId, orderId })

  return {}
}

const getOrder = async ({ userId, orderId }) => {
  const fullOrder = await orderRepo.getOrderWithQuery({
    where: { userId, id: orderId },
    attributes: {
      exclude: ['orderStatusId', 'paymentFormId', 'userId']
    },
    include: [
      {
        model: PaymentForm,
        as: 'paymentForm',
        attributes: ['id', 'name']
      },
      {
        model: OrderStatus,
        as: 'orderStatus',
        attributes: ['id', 'name']
      },
      {
        model: OrderDetail,
        as: 'products',
        attributes: {
          exclude: ['orderId', 'productId', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'description', 'imageUrl']
          }
        ]
      }
    ]
  })
  if (!fullOrder) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')
  return fullOrder
}

const createPaymentUrl = async ({ userId, ipAddr, bankCode, orderId }) => {
  const fullOrder = await getOrder({ userId, orderId })

  const isPayable =
    fullOrder.orderStatus.name === 'Pending' &&
    fullOrder.paymentForm.name === 'Online'
  if (!isPayable)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'The order cannot be paid')

  const amount = fullOrder.products.reduce((acc, product) => {
    return acc + product.quantity * product.price
  }, 0)

  const paymentUrl = vnpayProvider.createPaymentUrl({
    ipAddr,
    bankCode,
    orderId,
    amount,
    orderInfo: `Thanh toan cho::: Ma DH: ${orderId} - Ma KH: ${userId}`
  })
  return {
    paymentUrl
  }
}

const checkPay = async (paramsObject) => {
  const isSuccess = vnpayProvider.checkPay(paramsObject)
  if (!isSuccess) return false

  const orderId = paramsObject['vnp_TxnRef']

  const foundOrder = await orderRepo.getOrderWithQuery({
    where: { id: orderId }
  })
  if (!foundOrder) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  const foundOrderStatus = await orderStatusRepo.getOrderStatusByName('Paid')
  if (!foundOrderStatus) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  await foundOrder.update({ orderStatusId: foundOrderStatus.id })

  return true
}

module.exports = {
  review,
  order,
  getAllOrders,
  cancelOrder,
  getOrder,
  createPaymentUrl,
  checkPay
}
