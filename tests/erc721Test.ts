import { EdexaClient } from "../src";

async function run() {
  let edexaClient = new EdexaClient();

  let pvtKey1 =
    "4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427be6f";
  let pvtKey2 =
    "1b1545266a6e55c28553750b95fb59cb3be71ff3a7092a257d2b7f85126da47e";

  let signer = edexaClient.createWalletSigner(pvtKey1);
  // let signer = edexaClient.createProviderSigner(window.ethereum)

  // let contract = await edexaClient.createContractERC721({name : 'gautam',symbol : 'GTM'},signer)
  // console.log(contract.address);

  let erc721 = edexaClient.getERC721Instance(
    "0xD519C0B20A67983896791B8bf53005292a1D2710"
  );

  // //read test
  console.log(
    await erc721.getBalance("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"),
    "<<<<<<First account"
  );
  // console.log(await erc721.getBalance("0x2c360D20cE6b3D8b466511eF093C9177c3817B94"),"<<<<<<Second account");
  // console.log(await erc721.getApproved("0"));
  // console.log(await erc721.ownerOf("0"));
  // console.log(await erc721.tokenURI("0"));

  //write test
  // console.log(await erc721.safeMint("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","www.gautambansal.com",signer));

  // console.log(await erc721.approve("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","1", signer));

  // console.log(await erc721.safeTransferFrom("0x2c360D20cE6b3D8b466511eF093C9177c3817B94","0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","1", signer));
}

run();
