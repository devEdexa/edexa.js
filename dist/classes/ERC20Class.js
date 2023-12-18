"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20 = void 0;
const ethers_1 = require("ethers");
const ERC20_Abi_json_1 = __importDefault(require("../abi/ERC20-Abi.json"));
const resolve_1 = require("../utils/resolve");
class ERC20 {
    constructor(address, rpc, provider) {
        this.address = address;
        // Create an Ethereum provider based on the input or use a JsonRpcProvider
        this.rpc = rpc;
        if (provider != undefined)
            this.provider = new ethers_1.ethers.providers.Web3Provider(provider);
        else {
            this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpc);
        }
    }
    //helper functions
    // Create a read-only contract instance
    getContractInstance() {
        let contract = new ethers_1.ethers.Contract(this.address, ERC20_Abi_json_1.default, this.provider);
        return contract;
    }
    // Create a contract instance for actions (requires a signer)
    getActionContractInstance(signer) {
        let contract = new ethers_1.ethers.Contract(this.address, ERC20_Abi_json_1.default, signer);
        return contract;
    }
    //read function
    /**
     * Fetch the balance of an address.
     * @param {string} userAddress - The address of the user.
     * @returns {Promise<string>} The balance of the user as a string.
     **/
    getBalance(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getContractInstance();
            let res = yield contract.balanceOf(userAddress);
            return res.toString();
        });
    }
    /**
     * Fetch the allowance for a spender on behalf of an owner.
     * @param {string} owner - The owner's address.
     * @param {string} spender - The spender's address.
     * @returns {Promise<string>} The allowance amount as a string.
     **/
    getAllowance(owner, spender) {
        return __awaiter(this, void 0, void 0, function* () {
            owner = yield (0, resolve_1.resolveENSOrReturnAddress)(owner);
            spender = yield (0, resolve_1.resolveENSOrReturnAddress)(spender);
            let contract = this.getContractInstance();
            let res = yield contract.allowance(owner, spender);
            return res.toString();
        });
    }
    //action function
    /**
     * Burn a specific amount of tokens.
     * @param {string} amount - The amount of tokens to burn.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    burn(amount, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.burn(amount);
            return res.toString();
        });
    }
    /**
     * Burn a specific amount of tokens from a specific address.
     * @param {string} from - The address from which to burn tokens.
     * @param {string} amount - The amount of tokens to burn.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    burnFrom(from, amount, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            from = yield (0, resolve_1.resolveENSOrReturnAddress)(from);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.burnFrom(from, amount);
            return res.toString();
        });
    }
    /**
     * Mint a specific amount of tokens and send them to a recipient.
     * @param {string} to - The address to which tokens will be minted.
     * @param {string} amount - The amount of tokens to mint.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    mint(to, amount, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            to = yield (0, resolve_1.resolveENSOrReturnAddress)(to);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.mint(to, amount);
            return res.toString();
        });
    }
    /**
     * Pause the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    pause(signer) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.pause();
            return res.toString();
        });
    }
    /**
     * Unpause the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    unpause(signer) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.unpause();
            return res.toString();
        });
    }
    /**
     * Renounce ownership of the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    renounceOwnership(signer) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.renounceOwnership();
            return res.toString();
        });
    }
    /**
     * Transfer ownership of the contract to a new address.
     * @param {string} to - The address to which ownership will be transferred.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    transferOwnership(to, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            to = yield (0, resolve_1.resolveENSOrReturnAddress)(to);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.transferOwnership(to);
            return res.toString();
        });
    }
    /**
     * Approve a spender to spend a specific amount on your behalf.
     * @param {string} userAddress - Your address.
     * @param {string} amount - The amount to approve.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    approve(userAddress, amount, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.approve(userAddress, amount);
            return res.toString();
        });
    }
    /**
     * Transfer a specific amount to a recipient.
     * @param {string} userAddress - Your address.
     * @param {string} amount - The amount to transfer.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    transfer(userAddress, amount, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.transfer(userAddress, amount);
            return res.toString();
        });
    }
    /**
     * Transfer a specific amount from one address to another.
     * @param {string} from - The address to transfer from.
     * @param {string} to - The address to transfer to.
     * @param {string} amount - The amount to transfer.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    transferFrom(from, to, amount, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            from = yield (0, resolve_1.resolveENSOrReturnAddress)(from);
            to = yield (0, resolve_1.resolveENSOrReturnAddress)(to);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.transferFrom(from, to, amount);
            return res.toString();
        });
    }
}
exports.ERC20 = ERC20;
//# sourceMappingURL=ERC20Class.js.map