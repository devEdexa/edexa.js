import { expect } from 'chai'
import dotenv from 'dotenv'
import { EdexaClient } from '../src/index'

// This error should crash whole process
const env = dotenv.config().parsed
if (!env) throw new Error('⚠️ Couldn not find .env file ⚠️')

describe.skip('StableCoin Tests', function () {
  it('Create/Deploy New Contract', async function () {
    const edexaclient = new EdexaClient()
    const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)
    const arg = {
      name: 'gautam',
      symbol: 'gau',
      supply: 100,
    }
    const tx = await edexaclient.createContractStableCoin(arg, signer)
    expect(tx.address).to.not.equal(undefined)
  })

  it('Mint Token and Check Balance', async function () {
    const edexaclient = new EdexaClient()
    const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)
    const StableCoin = await edexaclient.getStableCoinInstance(
      '0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe',
    )

    const preBalance = await StableCoin.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )

    await StableCoin.mint(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      '100',
      signer,
    )

    //waiting for 2 sec since block is getting processed..
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const postBalance = await StableCoin.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )

    const expectBalance = Number(preBalance) + 100
    expect(Number(expectBalance)).to.equal(Number(postBalance))
  })
  it('Mint Token in Stablecoin should fail because caller is not owner', async function () {
    try {
      const edexaclient = new EdexaClient()
      const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY2)
      const StableCoin = await edexaclient.getStableCoinInstance(
        '0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe',
      )

      await StableCoin.mint(
        '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
        '100',
        signer,
      )

      expect.fail('Minting should not be allowed from a non-owner address')
    } catch (error) {
      expect(error.message).to.include('Execution reverted')
    }
  })

  it('pass empty string as address in mint function should fail', async function () {
    try {
      const edexaclient = new EdexaClient()
      const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY2)

      const StableCoin = await edexaclient.getStableCoinInstance(
        '0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe',
      )

      await StableCoin.mint('', '100', signer)
      expect.fail('token mint which should not be mint')
    } catch (error) {
      expect(error.message).to.include('ENS Not Registered for')
    }
  })
})
