import { EdexaClient } from "./src";

async function run(){

    
let edexaClient = new EdexaClient("0xdC8e4ae1cB0743B07475200EA36452b79891434C","https://polygon-mumbai.g.alchemy.com/v2/pHr1ZteTXFW-FI43IL8qJS2QGjLtaf98")
await edexaClient.erc20.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5");


}






















































run();