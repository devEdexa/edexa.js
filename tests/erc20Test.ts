import { sign } from "crypto";
import { EdexaClient } from "../src";

async function run() {
  let edexaClient = new EdexaClient();

  let pvtKey1 =
    "4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427be6f";
  let pvtKey2 =
    "1b1545266a6e55c28553750b95fb59cb3be71ff3a7092a257d2b7f85126da47e";

  let signer = edexaClient.createWalletSigner(pvtKey1);

  // let contract = await edexaClient.createContractERC20({name : "gautam", symbol : "GTM", supply : 500},signer);
  // let contract = await edexaClient.createContractERC20({name : "gautam", symbol : "GTM", supply : undefined},signer);
  // console.log(contract.address);

  let erc20 = edexaClient.getERC20Instance(
    "0x4DB67190e915C15aA8CCd889F35185D73dA37878"
  );

  console.log(
    await erc20.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"),
    "<<<<Balance of account 1"
  );

  // console.log(await erc20.getBalance("0x2c360D20cE6b3D8b466511eF093C9177c3817B94"), "<<<<Balance of account 2");

  // await erc20.getAllowance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0x2c360D20cE6b3D8b466511eF093C9177c3817B94");

  // await erc20.transfer("0x2c360D20cE6b3D8b466511eF093C9177c3817B94","1000000000000000000", signer);

  // await erc20.approve("0x2c360D20cE6b3D8b466511eF093C9177c3817B94","2000000000000000000", signer);
    
  await erc20.mint("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5", "10000000000000000000000000000000000000", signer);
  // await erc20.transferFrom("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0x2c360D20cE6b3D8b466511eF093C9177c3817B94","1000000000000000000", signer);

  // console.log('after');
  // console.log(await erc20.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"), "<<<<Balance of account 1");
  // console.log(await erc20.getBalance("0x2c360D20cE6b3D8b466511eF093C9177c3817B94"), "<<<<Balance of account 2");
}

run();