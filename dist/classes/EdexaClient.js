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
exports.EdexaClient = void 0;
const ethers_1 = require("ethers");
const ERC20Class_1 = require("./ERC20Class");
const ERC721Class_1 = require("./ERC721Class");
const ERC1155Class_1 = require("./ERC1155Class");
const StableCoinClass_1 = require("./StableCoinClass");
const byteCode_1 = require("../bytecode/byteCode");
const ERC20_Abi_json_1 = __importDefault(require("../abi/ERC20-Abi.json"));
const ERC721_Abi_json_1 = __importDefault(require("../abi/ERC721-Abi.json"));
const ERC1155_Abi_json_1 = __importDefault(require("../abi/ERC1155-Abi.json"));
const StableCoin_json_1 = __importDefault(require("../abi/StableCoin.json"));
const ENS_json_1 = __importDefault(require("../abi/ENS.json"));
class EdexaClient {
    //signers
    /**
     * Create an ERC20 contract using the provided arguments and signer.
     * @param {erc20ArgType} arg - Arguments for creating the ERC20 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC20 contract.
     **/
    createContractERC20(arg, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            let factory;
            let contract;
            if (arg.supply == undefined) {
                factory = new ethers_1.ContractFactory(ERC20_Abi_json_1.default, byteCode_1.erc20Bytecode1, signer);
                contract = yield factory.deploy(arg.name, arg.symbol, 0);
            }
            else {
                factory = new ethers_1.ContractFactory(ERC20_Abi_json_1.default, byteCode_1.erc20Bytecode2, signer);
                contract = yield factory.deploy(arg.name, arg.symbol, arg.supply);
            }
            return contract;
        });
    }
    /**
     * Create an ERC721 contract using the provided arguments and signer.
     * @param {erc721ArgType} arg - Arguments for creating the ERC721 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC721 contract.
     **/
    createContractERC721(arg, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = new ethers_1.ContractFactory(ERC721_Abi_json_1.default, byteCode_1.erc721Bytecode, signer);
            const contract = yield factory.deploy(arg.name, arg.symbol);
            return contract;
        });
    }
    /**
     * Create an ERC1155 contract using the provided arguments and signer.
     * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC1155 contract.
     **/
    createContractERC1155(arg, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = new ethers_1.ContractFactory(ERC1155_Abi_json_1.default, byteCode_1.erc1155Bytecode, signer);
            const contract = yield factory.deploy(arg.uri);
            return contract;
        });
    }
    /**
     * Create an ERC1155 contract using the provided arguments and signer.
     * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC1155 contract.
     **/
    createContractStableCoin(arg, signer) {
        return __awaiter(this, void 0, void 0, function* () {
           
            const factory = new ethers_1.ContractFactory(StableCoin_json_1.default, byteCode_1.stableCoinByteCode, signer);

            const contract = yield factory.deploy(arg.name, arg.symbol, arg.supply);
            return contract;
        });
    }
    /**
     * Create an ERC1155 contract using the provided arguments and signer.
     * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC1155 contract.
     **/
    /**
     * Create a signer using a private key and provider URL.
     * @param {string} pvtKey - The private key to create the signer.
     * @returns {any} The signer object.
     **/
    createWalletSigner(pvtKey) {
        const wallet = new ethers_1.ethers.Wallet(pvtKey);
        const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://testnet.edexa.com/rpc");
        let signer = wallet.connect(provider);
        return signer;
    }
    /**
     * Create a signer using a provider object.
     * @param {any} providerObject - The provider object to create the signer.
     * @returns {any} The signer object.
     */
    createProviderSigner(providerObject) {
        let provider = new ethers_1.ethers.providers.Web3Provider(providerObject);
        let signer = provider.getSigner();
        return signer;
    }
    // ERC contracts
    /**
     * Get an instance of the ERC20 contract.
     * @param {string} address - The address of the ERC20 contract.
     * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
     * @param {any} provider - The optional provider object.
     * @returns {ERC20} An instance of the ERC20 contract.
     **/
    getERC20Instance(address, rpc = "https://testnet.edexa.com/rpc", provider) {
        return new ERC20Class_1.ERC20(address, rpc, provider);
    }
    /**
     * Get an instance of the ERC721 contract.
     * @param {string} address - The address of the ERC721 contract.
     * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
     * @param {any} provider - The optional provider object.
     * @returns {ERC721} An instance of the ERC721 contract.
     **/
    getERC721Instance(address, rpc = "https://testnet.edexa.com/rpc", provider) {
        return new ERC721Class_1.ERC721(address, rpc, provider);
    }
    /**
     * Get an instance of the ERC1155 contract.
     * @param {string} address - The address of the ERC1155 contract.
     * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
     * @param {any} provider - The optional provider object.
     * @returns {ERC1155} An instance of the ERC1155 contract.
     **/
    getERC1155Instance(address, rpc = "https://testnet.edexa.com/rpc", provider) {
        return new ERC1155Class_1.ERC1155(address, rpc, provider);
    }
    getStableCoinInstance(address, rpc = "https://testnet.edexa.com/rpc", provider) {
        return new StableCoinClass_1.StableCoin(address, rpc, provider);
    }
    resolveENSOrReturnAddress(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the input is a valid Ethereum address
                if (ethers_1.ethers.utils.isAddress(input)) {
                    return input;
                }
                else {
                    // If it's not a valid address, try to resolve it through ENS
                    const provider = new ethers_1.ethers.providers.JsonRpcProvider('https://testnet.edexa.com/rpc');
                    const ens = new ethers_1.ethers.Contract('0x0cc23341aacFc90B1582d965943d1f10D94638Cf', ENS_json_1.default, provider);
                    // Resolve the ENS domain to an Ethereum address
                    const detailsObject = yield ens.getDomainInfo(input);
                    if (detailsObject) {
                        if (detailsObject.resolver == "0x0000000000000000000000000000000000000000")
                            throw new Error(`ENS Not Registered for ${input}`);
                        else
                            return detailsObject.resolver;
                    }
                    else {
                        throw new Error(`ENS resolution failed for ${input}`);
                    }
                }
            }
            catch (error) {
                throw new Error(`Error: ${error.message}`);
            }
        });
    }
}
exports.EdexaClient = EdexaClient;
//# sourceMappingURL=EdexaClient.js.map