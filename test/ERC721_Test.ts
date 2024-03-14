import { expect } from 'chai'
import dotenv from 'dotenv'
import { EdexaClient } from '../src/index'

// This error should crash whole process
const env = dotenv.config().parsed
if (!env) throw new Error('⚠️ Couldn not find .env file ⚠️')

describe.skip('ERC721 Tests', function () {
  it('Create/Deploy New Contract and Mint NFT', async function () {
    const edexaclient = new EdexaClient()
    const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)
    const arg = {
      name: 'gautam',
      symbol: 'gau',
    }
    const tx = await edexaclient.createContractERC721(arg, signer)
    expect(tx.address).to.not.equal(undefined)
  })
  it('Mint NFT and Check Balance', async function () {
    const edexaclient = new EdexaClient()
    const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)
    const ERC721 = await edexaclient.getERC721Instance(
      '0x43AC33963a3d07A275D87463265Fe2f5C66c662A',
    )
    const preBalance = await ERC721.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )
    await ERC721.safeMint(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
      'www.google.com',
      signer,
    )
    //waiting for 2 sec since block is getting processed..
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const postBalance = await ERC721.getBalance(
      '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
    )
    const expectBalance = Number(preBalance) + 1
    expect(Number(expectBalance)).to.equal(Number(postBalance))
  })
  it('Mint NFT Should Fail because caller is not owner', async function () {
    try {
      const edexaclient = new EdexaClient()
      const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY2)
      const ERC721 = await edexaclient.getERC721Instance(
        '0x43AC33963a3d07A275D87463265Fe2f5C66c662A',
      )
      await ERC721.safeMint(
        '0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5',
        'www.google.com',
        signer,
      )
      expect.fail('Minting should not be allowed from a non-owner address')
    } catch (error) {
      expect(error.message).to.include('Ownable: caller is not the owner')
    }
  })
  it('Mint NFT Should if we pass empty user address ', async function () {
    try {
      const edexaclient = new EdexaClient()
      const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY2)
      const ERC721 = await edexaclient.getERC721Instance(
        '0x43AC33963a3d07A275D87463265Fe2f5C66c662A',
      )
      await ERC721.safeMint('', 'www.google.com', signer)
      expect.fail('NFT mint, which should not be mint')
    } catch (error) {
      expect(error.message).to.include('ENS Not Registered for')
    }
  })
})
