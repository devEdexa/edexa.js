import { EdexaClient } from "./src";

async function run(){

let edexaClient = new EdexaClient();

let erc20 = edexaClient.getERC20Instance("0x16CbE705C6982236BF4D74D88fC994Af2C7C6658");

console.log(await erc20.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"));


}






















































run();