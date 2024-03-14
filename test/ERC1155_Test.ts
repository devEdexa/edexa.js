import { expect } from 'chai'
import dotenv from 'dotenv'
import { EdexaClient } from '../src/index'

// This error should crash whole process
const env = dotenv.config().parsed
if (!env) throw new Error('⚠️ Couldn not find .env file ⚠️')

describe.skip('ERC1155 Tests', function () {
  it('Create/Deploy New Contract', async function () {
    const edexaclient = new EdexaClient()
    const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)
    const arg = {
      uri: 'www.google.com',
    }
    const tx = await edexaclient.createContractERC1155(arg, signer)
    expect(tx.address).to.not.equal(undefined)
  })

  it('Mint Batch NFT and Check Balance', async function () {
    const edexaclient = new EdexaClient()
    const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)

    const ERC1155 = await edexaclient.getERC1155Instance(
      '0x5F48978275feE805a1465BAff95C8a0C69B1f385',
    )

    const preBalance = await ERC1155.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      '0',
    )

    await ERC1155.mintBatch(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      ['0'],
      ['1'],
      signer,
    )

    //waiting for 2 sec since block is getting processed..
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const postBalance = await ERC1155.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      '0',
    )

    const expectBalance = Number(preBalance) + 1
    expect(Number(expectBalance)).to.equal(Number(postBalance))
  })

  it('Mint Batch NFT should fail if we pass empty string as user address', async function () {
    try {
      const edexaclient = new EdexaClient()
      const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)

      const ERC1155 = await edexaclient.getERC1155Instance(
        '0x5F48978275feE805a1465BAff95C8a0C69B1f385',
      )

      await ERC1155.mintBatch('', ['0'], ['1'], signer)
      expect.fail('NFT mint, which should not be mint')
    } catch (error) {
      expect(error.message).to.include('ENS Not Registered for')
    }
  })
})
