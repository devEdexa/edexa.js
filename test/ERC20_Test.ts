import { EdexaClient } from "../src/index";
var assert = require("assert");
import chai, { expect } from "chai";


require('dotenv').config();


describe("ERC20 Tests", function () {
	it("Create/Deploy New Contract", async function () {
		let edexaclient = new EdexaClient();
		let signer = await edexaclient.createWalletSigner(
			//@ts-ignore
			process.env.PRIVATE_KEY
		);
		let arg = {
			name: "gautam",
			symbol: "gau",
			supply: undefined,
		};
		let tx = await edexaclient.createContractERC20(arg, signer);
		expect(tx.address).to.not.equal(undefined);
	});

	it("Mint Token and Check Balance", async function () {
		let edexaclient = new EdexaClient();
		let signer = await edexaclient.createWalletSigner(
			//@ts-ignore
			process.env.PRIVATE_KEY
		);
		let ERC20 = await edexaclient.getERC20Instance("0x884aed749F7e58eDcA48F1953BFe23C8dbAC4e15");

		let preBalance = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);

		await ERC20.mint("0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5","100",signer);

		let postBalance1 = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);
		let postBalance2 = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);
		let postBalance = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);

		let expectBalance = Number(preBalance) + 100;
		expect(Number(expectBalance)).to.equal(Number(postBalance));
	});

	it("Token Transfer Testing", async function () {
		let edexaclient = new EdexaClient();
		let signer = await edexaclient.createWalletSigner(
			//@ts-ignore
			process.env.PRIVATE_KEY
		);
		let ERC20 = await edexaclient.getERC20Instance(
			"0x884aed749F7e58eDcA48F1953BFe23C8dbAC4e15"
		);

		let preBalance = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);

		await ERC20.mint(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5",
			"100",
			signer
		);

		let postBalance1 = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);
		let postBalance2 = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);
	
		let postBalance = await ERC20.getBalance(
			"0xF6E234C71F1bB45ABa51c977137eF090b2df2Fe5"
		);

	
		let expectBalance = Number(preBalance) + 100;
		expect(Number(expectBalance)).to.equal(Number(postBalance));
	});
});
