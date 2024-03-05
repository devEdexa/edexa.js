import { EdexaClient } from '../src/index'

async function testdeploy() {
  let edexaclient = new EdexaClient()
  let signer = await edexaclient.createWalletSigner(
    '4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427be6f',
  )
  //@ts-ignore
  let tx = await edexaclient.createContractAtomicSwapEth(signer)

  console.log(tx.address)
}

async function testnewContract() {
  let edexaclient = new EdexaClient()

  let signer = await edexaclient.createWalletSigner(
    '4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427be6f',
  )

  let Object = await edexaclient.getAtomicSwapEthInstance(
    '0xB2175fbd8bccf6Cb6Ab88CBce08D315743B80293',
  )

  let tx = await Object.newContract(
    '0x5692CA67aE81BA409A941846ffee6f0D181Cd409',
    '0x730e03974dc00b82b4d4c914b1c59f088d0a6472e8ed592970d384b8e80eea32',
    '1709372940',
    '0.01',
    signer,
  )
  console.log(tx)
}

async function testWithdraw() {
  let edexaclient = new EdexaClient()

  let signer = await edexaclient.createWalletSigner(
    'f6fabf348abaa3a248eb19ef3c9cadafde13083b1046496f9251566dbf2700f1',
  )

  let Object = await edexaclient.getAtomicSwapEthInstance(
    '0xB2175fbd8bccf6Cb6Ab88CBce08D315743B80293',
  )

  let tx = await Object.withdraw(
    '0x566fcc60ffd831116b98745412c1f906467c5522c54bba962447d705b3d07fe0',
    '',
    signer,
  )

  console.log(tx)
}

testWithdraw()
