import { writeFileSync } from 'fs'
import { EdexaClient } from '../src/index'
import chai, { expect } from 'chai'

var assert = require('assert')

require('dotenv').config()

describe('CBDC Tests', function () {
  it('Get Creation Fee for creating order', async function () {
    let edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance(
      '0xAf31f74431f176EC2c8fB00237f8cfA354603957', // contract address of cbdc
    )

    const creationFee = await cbdc.getCreationFee()
    console.log(creationFee)
  })

  it.skip('Check Balance before order tokens', async function () {
    let edexaclient = new EdexaClient()
    const sender = edexaclient.getERC20Instance(
      '0x7F6601406B9C7CD6a99f26aCc92Af351bBDDc76B', // MTK
    )

    const receiver = edexaclient.getERC20Instance(
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // RJ
    )

    console.log(
      `balance of 0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da(Receiver) ${await sender.getBalance(
        '0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da',
      )} MTK TOKEN`,
    )
    console.log(
      `balance of 0xb464d56F97145b89eE1e060D43B90a2D62a994fC(sender) ${await sender.getBalance(
        '0xb464d56F97145b89eE1e060D43B90a2D62a994fC',
      )} MTK TOKEN`,
    )
    console.log(
      `balance of 0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da(Receiver) ${await receiver.getBalance(
        '0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da',
      )} RJ TOKEN`,
    )
    console.log(
      `balance of 0xb464d56F97145b89eE1e060D43B90a2D62a994fC(sender) ${await receiver.getBalance(
        '0xb464d56F97145b89eE1e060D43B90a2D62a994fC',
      )} RJ TOKEN`,
    )
  })

  it.skip('Create New Order', async function () {
    let edexaclient = new EdexaClient()
    let senderSigner = await edexaclient.createWalletSigner(
      //@ts-ignore
      process.env.SENDER_PRIVATE_KEY,
    )
    let receiverSigner = await edexaclient.createWalletSigner(
      //@ts-ignore
      process.env.RECEIVER_PRIVATE_KEY,
    )
    const cbdc = edexaclient.getCBDCInstance(
      '0xAf31f74431f176EC2c8fB00237f8cfA354603957', // contract address of cbdc
    )
    // console.log(cbdc)
    console.log('signer')
    console.log('test called')
    const s = await cbdc.createOrder(
      '0x7F6601406B9C7CD6a99f26aCc92Af351bBDDc76B', // MTK
      1000, // amount in ether
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // RJ
      5000, // amunt in ether
      senderSigner,
      1,
    )
    console.log(s)
  })

  it('Get active Order list', async function () {
    let edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance(
      '0xAf31f74431f176EC2c8fB00237f8cfA354603957', // contract address of cbdc
    )

    const creationFee = await cbdc.getActiveOrders(
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e',
    )
    console.log(creationFee)
  })

  it('Get Order details', async function () {
    let edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance(
      '0xAf31f74431f176EC2c8fB00237f8cfA354603957', // contract address of cbdc
    )

    const creationFee = await cbdc.getOrderDetails(0)
    console.log(creationFee)
  })

  it('Calulate apporve token', async function () {
    let edexaclient = new EdexaClient()
    const cbdc = edexaclient.getCBDCInstance(
      '0xAf31f74431f176EC2c8fB00237f8cfA354603957', // contract address of cbdc
    )

    const creationFee = await cbdc.calculateAmountToAprove(0, 100)
    console.log(creationFee)
    // calAmountToAprove
  })
  it.skip('Swap Order', async function () {
    let edexaclient = new EdexaClient()
    let receiverSigner = edexaclient.createWalletSigner(
      //@ts-ignore
      process.env.RECEIVER_PRIVATE_KEY,
    )
    const cbdc = edexaclient.getCBDCInstance(
      '0x3F3066Cc4C1049E8864a07c7475Dc39Ed4C2a46D', // contract address of cbdc
    )
    const r = await cbdc.swap(
      '8',
      '1000',
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e',
      '5000',
      receiverSigner,
    )
    console.log(r)
  })

  it.skip('Check Balance after swap of tokens', async function () {
    let edexaclient = new EdexaClient()
    const sender = edexaclient.getERC20Instance(
      '0x7F6601406B9C7CD6a99f26aCc92Af351bBDDc76B', // MTK
    )

    const receiver = edexaclient.getERC20Instance(
      '0x66e8c2ddb39a2a60D08e6616a4bE776B2e76E52e', // RJ
    )

    console.log(
      `balance of 0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da(Receiver) ${await sender.getBalance(
        '0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da',
      )} MTK TOKEN`,
    )
    console.log(
      `balance of 0xb464d56F97145b89eE1e060D43B90a2D62a994fC(sender) ${await sender.getBalance(
        '0xb464d56F97145b89eE1e060D43B90a2D62a994fC',
      )} MTK TOKEN`,
    )
    console.log(
      `balance of 0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da(Receiver) ${await receiver.getBalance(
        '0x45FFdf30a3e7c8099F5a7C145A10CBE6660cd0Da',
      )} RJ TOKEN`,
    )
    console.log(
      `balance of 0xb464d56F97145b89eE1e060D43B90a2D62a994fC(sender) ${await receiver.getBalance(
        '0xb464d56F97145b89eE1e060D43B90a2D62a994fC',
      )} RJ TOKEN`,
    )
  })
})
