import { EdexaClient } from "../src/index";
import chai, { expect } from "chai";

var assert = require("assert");
 require('dotenv').config();

describe("ERC1155 Tests", function () {
	it("Create/Deploy New Contract", async function () {
		let edexaclient = new EdexaClient();
		let signer = await edexaclient.createWalletSigner(
			//@ts-ignore
			process.env.PRIVATE_KEY
		);
		let arg = {
			uri: "www.google.com",
		};
		let tx = await edexaclient.createContractERC1155(arg, signer);
		expect(tx.address).to.not.equal(undefined);
	});

	it("Mint Batch NFT and Check Balance", async function () {
		let edexaclient = new EdexaClient();
		let signer = await edexaclient.createWalletSigner(
			//@ts-ignore
			process.env.PRIVATE_KEY
		);
		//@ts-ignore
		let ERC1155 = await edexaclient.getERC1155Instance("0x5F48978275feE805a1465BAff95C8a0C69B1f385");

		let preBalance = await ERC1155.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0"
		);

		await ERC1155.mintBatch("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5",["0"],["1"],undefined,signer);

		let postBalance1 = await ERC1155.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0"
		);
		let postBalance2 = await ERC1155.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0"
		);
		let postBalance = await ERC1155.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","0"
		);

		let expectBalance = Number(preBalance) + 1;
		expect(Number(expectBalance)).to.equal(Number(postBalance));
	});
});
