import { EdexaClient } from "./src";

async function run(){

let edexaClient = new EdexaClient();

let pvtKey1 = "4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427be6f"
let pvtKey2 = "1b1545266a6e55c28553750b95fb59cb3be71ff3a7092a257d2b7f85126da47e";

let signer = edexaClient.createWalletSigner(pvtKey1)
// let signer = edexaClient.createProviderSigner(window.ethereum)

let erc1155 = edexaClient.getERC1155Instance("0xb2f0c4041c320963025fF73872E231908381B19b");

//read test
console.log(await erc1155.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0"),"<<<<<< account 1, id 0");
console.log(await erc1155.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","1"),"<<<<<< account 1, id 1");
console.log(await erc1155.getBalance("0x2c360D20cE6b3D8b466511eF093C9177c3817B94","0"),"<<<<<< account 2, id 0");
console.log(await erc1155.getBalance("0x2c360D20cE6b3D8b466511eF093C9177c3817B94","1"),"<<<<<< account 2 , id 1");
console.log(await erc1155.getUri("1"));

//write test
console.log(await erc1155.mint("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5",'0','10000000000',undefined,signer));
// console.log(await erc1155.mintBatch("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5",['0',"1"],['12','12'],undefined,signer));
// console.log(await erc1155.safeTransferFrom("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0x2c360D20cE6b3D8b466511eF093C9177c3817B94","1","2",undefined,signer));


console.log(await erc1155.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0"),"<<<<<< account 1, id 0");
console.log(await erc1155.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","1"),"<<<<<< account 1, id 1");
console.log(await erc1155.getBalance("0x2c360D20cE6b3D8b466511eF093C9177c3817B94","0"),"<<<<<< account 2, id 0");
console.log(await erc1155.getBalance("0x2c360D20cE6b3D8b466511eF093C9177c3817B94","1"),"<<<<<< account 2 , id 1");
console.log(await erc1155.getUri("1"));

}






















































run();