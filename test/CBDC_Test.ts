import dotenv from 'dotenv'
import { EdexaClient } from '../src/index'
import { expect } from 'chai'

// This error should crash whole process
const env = dotenv.config().parsed
if (!env) throw new Error('⚠️ Couldn not find .env file ⚠️')

const ordersList: any = []
let orderId: number
let fee: number
describe('CBDC Tests', function () {
  it.skip('Get Creation Fee for creating order', async function () {
    const edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance() // creationFee  of cbdc

    const creationFee = await cbdc.getCreationFee()
    expect(creationFee).to.be.an('number')
    fee = creationFee
  })

  it.skip('Create New Order', async function () {
    const edexaclient = new EdexaClient()
    const senderSigner = await edexaclient.createWalletSigner(
      env.SENDER_PRIVATE_KEY,
    )
    await edexaclient.createWalletSigner(env.RECEIVER_PRIVATE_KEY)
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    const order = await cbdc.createOrder(
      '0x7F6601406B9C7CD6a99f26aCc92Af351bBDDc76B', // MTK
      1000, // amount in ether
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // RJ
      5000, // amunt in ether
      senderSigner,
      fee, // Creation Fee from Get Creation Fee for creating order
    )
    expect(order).to.be.an('string')
  })

  it.skip('Get active Order list', async function () {
    const edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    const activeOrders = await cbdc.getActiveOrders(
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e',
    )
    expect(activeOrders).to.be.an('array')

    // to validate each element of array as an number
    activeOrders.forEach((value) => {
      ordersList.push(value)
      expect(value).to.be.a('number')
    })
    orderId = activeOrders[Math.floor(Math.random() * activeOrders.length)]
  })

  it.skip('Get Order details', async function () {
    const edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    ordersList.forEach(async (orderId) => {
      // to validate orderId and it's type
      expect(orderId).to.be.a('number')

      const oderDetail = await cbdc.getOrderDetails(orderId)
      // validating orders details corrospond to orderId
      expect(oderDetail).to.be.an('array')
    })
  })

  it.skip('Calulate apporve token', async function () {
    const edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    ordersList.forEach(async (orderId) => {
      // to validate orderId and it's type
      expect(orderId).to.be.a('number')

      const amountToApprove = await cbdc.calculateAmountToAprove(orderId, 100)
      // validating orders details corrospond to orderId
      expect(amountToApprove).to.be.an('number')
    })
  })

  it.skip('Swap Order', async function () {
    const edexaclient = new EdexaClient()
    const receiverSigner = edexaclient.createWalletSigner(
      env.RECEIVER_PRIVATE_KEY,
    )
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    const orderData = await cbdc.swap(
      orderId, // order id(any order id out of order list)
      '1000', // original request
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // contract address of to
      5000, // in refernce of original request to amount
      receiverSigner,
    )
    // validating orders details corrospond to orderId
    expect(orderData).to.be.an('string')
  })

  it.skip('Check Balance after swap of tokens', async function () {
    const edexaclient = new EdexaClient()
    // const sender = edexaclient.getERC20Instance(
    //   '0x7F6601406B9C7CD6a99f26aCc92Af351bBDDc76B', // MTK
    // )

    // const receiver = edexaclient.getERC20Instance(
    //   '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // RJ
    // )

    // console.log(
    //   `balance of 0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da(Receiver) ${await sender.getBalance(
    //     '0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da',
    //   )} MTK TOKEN`,
    // )
    // console.log(
    //   `balance of 0xb464d56F97145b89eE1e060D43B90a2D62a994fC(sender) ${await sender.getBalance(
    //     '0xb464d56F97145b89eE1e060D43B90a2D62a994fC',
    //   )} MTK TOKEN`,
    // )
    // console.log(
    //   `balance of 0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da(Receiver) ${await receiver.getBalance(
    //     '0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da',
    //   )} RJ TOKEN`,
    // )
    // console.log(
    //   `balance of 0xb464d56F97145b89eE1e060D43B90a2D62a994fC(sender) ${await receiver.getBalance(
    //     '0xb464d56F97145b89eE1e060D43B90a2D62a994fC',
    //   )} RJ TOKEN`,
    // )
  })

  it.skip('Cancel Order', async function () {
    const edexaclient = new EdexaClient()
    const senderSigner = edexaclient.createWalletSigner(env.SENDER_PRIVATE_KEY)
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc
    const orderData = await cbdc.cancelOrder(
      orderId, // order id(any order id out of order list)
      senderSigner,
    )
    // validating orders details corrospond to orderId
    expect(orderData).to.be.an('string')
  })
})
