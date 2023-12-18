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
exports.ERC721 = void 0;
const ethers_1 = require("ethers");
const ERC721_Abi_json_1 = __importDefault(require("../abi/ERC721-Abi.json"));
const resolve_1 = require("../utils/resolve");
class ERC721 {
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
        let contract = new ethers_1.ethers.Contract(this.address, ERC721_Abi_json_1.default, this.provider);
        return contract;
    }
    // Create a contract instance for actions (requires a signer)
    getActionContractInstance(signer) {
        let contract = new ethers_1.ethers.Contract(this.address, ERC721_Abi_json_1.default, signer);
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
     * Fetch the approved address for a token ID.
     * @param {string} id - The token ID.
     * @returns {Promise<string>} The approved address as a string.
     **/
    getApproved(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getContractInstance();
            let res = yield contract.getApproved(id);
            return res.toString();
        });
    }
    /**
     * Fetch the owner of a token ID.
     * @param {string} id - The token ID.
     * @returns {Promise<string>} The owner's address as a string.
     **/
    ownerOf(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getContractInstance();
            let res = yield contract.ownerOf(id);
            return res.toString();
        });
    }
    /**
     * Fetch the URI of a token ID.
     * @param {string} id - The token ID.
     * @returns {Promise<string>} The token's URI as a string.
     **/
    tokenURI(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getContractInstance();
            let res = yield contract.tokenURI(id);
            return res.toString();
        });
    }
    //action function
    /**
     * Burn tokens with a specific ID.
     * @param {string} id - The ID of the tokens to burn.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    burn(id, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.burn(id);
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
     * Mint a new token to a user's address with a specified URI.
     * @param {string} userAddress - The user's address.
     * @param {string} uri - The URI for the token.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    safeMint(userAddress, uri, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.safeMint(userAddress, uri);
            return res.toString();
        });
    }
    /**
     * Approve an address to spend a specific token.
     * @param {string} userAddress - Your address.
     * @param {string} id - The token ID to approve.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    approve(userAddress, id, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            userAddress = yield (0, resolve_1.resolveENSOrReturnAddress)(userAddress);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.approve(userAddress, id);
            return res.toString();
        });
    }
    /**
     * Safely transfer a token from one address to another.
     * @param {string} from - The address to transfer from.
     * @param {string} to - The address to transfer to.
     * @param {string} id - The token ID to transfer.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    safeTransferFrom(from, to, id, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            from = yield (0, resolve_1.resolveENSOrReturnAddress)(from);
            to = yield (0, resolve_1.resolveENSOrReturnAddress)(to);
            let contract = this.getActionContractInstance(signer);
            let res = yield contract.transferFrom(from, to, id);
            return res.toString();
        });
    }
}
exports.ERC721 = ERC721;
//# sourceMappingURL=ERC721Class.js.map