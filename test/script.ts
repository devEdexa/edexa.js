import {EdexaClient} from "../src/index";
var assert = require('assert')

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe('Create Wallet and deploy erc20 contract', function () {
    it('should return signer when create wallet', async function () {
        let edexaclient  = new EdexaClient()
        let signer = await edexaclient.createWalletSigner('4557c83dc98a16a2602d51282987d9093b4da40fd88a361d2b44e7335427be6f');
        let arg = {
            name : "gautam",
            symbol: "gau",
            supply: 100
        }
        let tx = await edexaclient.createContractERC20(arg,signer);
        console.log(tx.address)
    });
});