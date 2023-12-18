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
exports.ERC1155 = void 0;
const ethers_1 = require("ethers");
const ERC1155_Abi_json_1 = __importDefault(require("../abi/ERC1155-Abi.json"));
const resolve_1 = require("../utils/resolve");
class ERC1155 {
    constructor(address, rpc, provider) {
        this.address = address;
        this.rpc = rpc;
        // Create an Ethereum provider based on the input or use a JsonRpcProvider
        if (provider != undefined)
            this.provider = new ethers_1.ethers.providers.Web3Provider(provider);
        else {
            this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpc);
        }
    }
    //helper functions
    // Create a read-only contract instance
    getContractInstance() {
        let contract = new ethers_1.ethers.Contract(this.address, ERC1155_Abi_json_1.default, this.provider);
        return contract;
    }
    // Create a contract instance for actions (requires a signer)
    getActionContractInstance(signer) {
        let contract = new ethers_1.ethers.Contract(this.address, ERC1155_Abi_json_1.default, signer);
        return contract;
    }
    //read function
    /**
     * Fetch the balance of a specific token for a user's address.
     * @param {string} userAddress - The address of the user.
     * @param {string} id - The ID of the token.
     * @returns {Promise<string>} The balance of the user for the specified token as a string.
     **/
    getBalance(userAddress, id) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getContractInstance();
            let res = yield contract.balanceOf(userAddress, id);
            return res;
        });
    }
    /**
     * Fetch the URI (Uniform Resource Identifier) of a specific token.
     * @param {string} id - The ID of the token.
     * @returns {Promise<string>} The URI of the token as a string.
     **/
    getUri(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getContractInstance();
            let res = yield contract.uri(id);
            return res.toString();
        });
    }
    /**
   * Fetch the balances of multiple tokens (specified by their IDs) for a specific address.
   * @param {string} address - The address for which the balances are to be fetched.
   * @param {string[]} id - The array of token IDs to get balances for.
   * @returns {Promise<string[]>} An array of balances for the specified tokens corresponding to the address.
   */
    getbBalanceOfBatch(address, id) {
        return __awaiter(this, void 0, void 0, function* () {
            address = yield (0, resolve_1.resolveENSOrReturnAddress)(address);
            let contract = this.getContractInstance();
            let res = yield contract.balanceOfBatch(address, id);
            return res;
        });
    }
    //action function
    /**
     * Mint a new token to a user's address with a specified ID, amount, and data.
     * @param {string} userAddress - The user's address.
     * @param {string} id - The ID of the token to mint.
     * @param {string} amount - The amount of tokens to mint.
     * @param {string} data - Additional data associated with the minting (default is "0x").
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    mint(userAddress, id, amount, data = "0x", signer) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.mint(userAddress, id, amount, data);
            return res.toString();
        });
    }
    /**
     * Mint multiple tokens to a user's address with specified IDs, amounts, and data.
     * @param {string} userAddress - The user's address.
     * @param {string[]} id - An array of token IDs to mint.
     * @param {string[]} amount - An array of amounts corresponding to the token IDs.
     * @param {string} data - Additional data associated with the minting (default is "0x").
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    mintBatch(userAddress, id, amount, data = "0x", signer) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.mintBatch(userAddress, id, amount, data);
            return res.toString();
        });
    }
    /**
     * Safely transfer a specific amount of a token from one address to another.
     * @param {string} from - The address to transfer from.
     * @param {string} to - The address to transfer to.
     * @param {string} id - The ID of the token to transfer.
     * @param {string} amount - The amount of tokens to transfer.
     * @param {string} data - Additional data associated with the transfer (default is "0x").
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    safeTransferFrom(from, to, id, amount, data = "0x", signer) {
        return __awaiter(this, void 0, void 0, function* () {
            from = yield (0, resolve_1.resolveENSOrReturnAddress)(from);
            to = yield (0, resolve_1.resolveENSOrReturnAddress)(to);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.safeTransferFrom(from, to, id, amount, data);
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
 * Safely transfer multiple tokens (specified by their IDs) from one address to another.
 * @param {string} from - The sender's address.
 * @param {string} to - The recipient's address.
 * @param {string[]} ids - The array of token IDs to transfer.
 * @param {string[]} value - The array of token amounts to transfer corresponding to each token ID.
 * @param {string} data - Additional data associated with the transfer.
 * @param {any} signer - The signer to authorize the transaction.
 * @returns {Promise<string>} The transaction result as a string.
 */
    safeBatchTransferFrom(from, to, ids, value, data, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            from = yield (0, resolve_1.resolveENSOrReturnAddress)(from);
            to = yield (0, resolve_1.resolveENSOrReturnAddress)(to);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.safeBatchTransferFrom(from, to, ids, value, data);
            return res.toString();
        });
    }
    /**
 * Set or unset the approval of a third party (an operator) to manage all tokens of the sender.
 * @param {string} to - The operator's address to set approval for.
 * @param {Boolean} approved - True to approve, false to revoke approval.
 * @param {any} signer - The signer to authorize the transaction.
 * @returns {Promise<string>} The transaction result as a string.
 */
    setApprovalForAll(to, approved, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            to = yield (0, resolve_1.resolveENSOrReturnAddress)(to);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.safeBatchTransferFrom(to, approved);
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
}
exports.ERC1155 = ERC1155;
//# sourceMappingURL=ERC1155Class.js.map