import dotenv from 'dotenv'
import { EdexaClient } from '../src/index'
import { expect } from 'chai'

// This error should crash whole process
const env = dotenv.config().parsed
if (!env) throw new Error('⚠️ Couldn not find .env file ⚠️')

const ordersList: any = []
describe('CBDC Tests', function () {
  it('Get Creation Fee for creating order', async function () {
    const edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance() // creationFee  of cbdc

    const creationFee = await cbdc.getCreationFee()
    expect(creationFee).to.be.an('number')
  })

  it('Check Balance before order tokens', async function () {
    const edexaclient = new EdexaClient()
    const sender = edexaclient.getERC20Instance(
      '0x7F6601406B9C7CD6a99f26aCc92Af351bBDDc76B', // MTK
    )

    const receiver = edexaclient.getERC20Instance(
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // RJ
    )

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

  it('Create New Order', async function () {
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
      1, // Creation Fee from Get Creation Fee for creating order
    )
    expect(order).to.be.an('string')
  })

  it('Get active Order list', async function () {
    const edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    const creationFee = await cbdc.getActiveOrders(
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e',
    )
    expect(creationFee).to.be.an('array')

    // to validate each element of array as an number
    creationFee.forEach((value) => {
      ordersList.push(value)
      expect(value).to.be.a('number')
    })
  })

  it('Get Order details', async function () {
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

  it('Calulate apporve token', async function () {
    const edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    ordersList.forEach(async (orderId) => {
      // to validate orderId and it's type
      expect(orderId).to.be.a('number')

      const amountToApprove = await cbdc.calculateAmountToAprove(0, 100)
      // validating orders details corrospond to orderId
      expect(amountToApprove).to.be.an('number')
    })
  })

  it('Swap Order', async function () {
    const edexaclient = new EdexaClient()
    const receiverSigner = edexaclient.createWalletSigner(
      env.RECEIVER_PRIVATE_KEY,
    )
    const cbdc = edexaclient.getCBDCInstance() // contract address of cbdc

    const orderData = await cbdc.swap(
      8, // order id(any order id out of order list)
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
    const sender = edexaclient.getERC20Instance(
      '0x7F6601406B9C7CD6a99f26aCc92Af351bBDDc76B', // MTK
    )

    const receiver = edexaclient.getERC20Instance(
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // RJ
    )

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
})
