import { EdexaClient } from "../src/index";
import chai, { expect } from "chai";

var assert = require("assert");

require("dotenv").config();

describe("StableCoin Tests", function () {
	it("Create/Deploy New Contract", async function () {
		let edexaclient = new EdexaClient();
		let signer = await edexaclient.createWalletSigner(
			//@ts-ignore
			process.env.PRIVATE_KEY
		);
		let arg = {
			name: "gautam",
			symbol: "gau",
			supply: 100,
		};
		let tx = await edexaclient.createContractStableCoin(arg, signer);
		expect(tx.address).to.not.equal(undefined);
	});

	it("Mint Token and Check Balance", async function () {
		let edexaclient = new EdexaClient();
		let signer = await edexaclient.createWalletSigner(
			//@ts-ignore
			process.env.PRIVATE_KEY
		);
		let StableCoin = await edexaclient.getStableCoinInstance(
			"0x6Ea0EBef4a827C3699044eD5A6B19a95004C9Dfe"
		);

		let preBalance = await StableCoin.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);

		await StableCoin.mint(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5",
			"100",
			signer
		);

		let postBalance1 = await StableCoin.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);
		let postBalance2 = await StableCoin.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);
		let postBalance = await StableCoin.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);

		let expectBalance = Number(preBalance) + 100;
		expect(Number(expectBalance)).to.equal(Number(postBalance));
	});
});
