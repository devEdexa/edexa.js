import { expect } from 'chai'
import dotenv from 'dotenv'
import { EdexaClient } from '../src/index'

// This error should crash whole process
const env = dotenv.config().parsed
if (!env) throw new Error('⚠️ Couldn not find .env file ⚠️')

describe.skip('Wallet Signer Test', function () {
  it('Create New Signer by passing empty string as private key', async function () {
    try {
      const edexaclient = new EdexaClient()
      await edexaclient.createWalletSigner('')
      expect.fail(
        'This line should not be reached as signer should not created',
      )
    } catch (error) {
      expect(error.message).to.include('invalid hexlify value')
    }
  })

  it('Create New Signer with incorrect private key', async function () {
    try {
      const edexaclient = new EdexaClient()
      await edexaclient.createWalletSigner(
        '4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427',
      )
    } catch (error) {
      expect(error.message).to.include('invalid hexlify value')
    }
  })

  it('Create New Signer with Right Private Key', async function () {
    const edexaclient = new EdexaClient()
    const signer = await edexaclient.createWalletSigner(env.PRIVATE_KEY)
    expect(signer).to.have.property('_isSigner')
    expect(signer).to.have.property('_isSigner').equal(true)
  })
})
