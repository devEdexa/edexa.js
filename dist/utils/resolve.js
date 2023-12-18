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
exports.resolveENSOrReturnAddress = void 0;
const ethers_1 = require("ethers");
const ENS_json_1 = __importDefault(require("../abi/ENS.json"));
function resolveENSOrReturnAddress(input) {
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
exports.resolveENSOrReturnAddress = resolveENSOrReturnAddress;
//# sourceMappingURL=resolve.js.map