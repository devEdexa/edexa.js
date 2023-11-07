import { EdexaClient } from "../src";



//ens test with erc20 mint

async function test() {
	let edexaClient = new EdexaClient();

  let pvtKey1 =
    "4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427be6f";
  let pvtKey2 =
    "1b1545266a6e55c28553750b95fb59cb3be71ff3a7092a257d2b7f85126da47e";

   
  let signer = edexaClient.createWalletSigner(pvtKey1);


  let erc20 = edexaClient.getERC20Instance(
    "0x4DB67190e915C15aA8CCd889F35185D73dA37878"
  );


  await erc20.mint("shubham.edx", "10000000000000000000000000000000000000", signer);

}


test();
