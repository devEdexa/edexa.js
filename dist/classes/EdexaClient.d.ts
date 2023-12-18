import { ethers } from "ethers";
import { ERC20 } from "./ERC20Class";
import { ERC721 } from "./ERC721Class";
import { ERC1155 } from "./ERC1155Class";
import { StableCoin } from "./StableCoinClass";
import { erc20ArgType, erc721ArgType, erc1155ArgType, stableCoinArgType } from "../types/types";
export declare class EdexaClient {
    /**
     * Create an ERC20 contract using the provided arguments and signer.
     * @param {erc20ArgType} arg - Arguments for creating the ERC20 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC20 contract.
     **/
    createContractERC20(arg: erc20ArgType, signer: any): Promise<any>;
    /**
     * Create an ERC721 contract using the provided arguments and signer.
     * @param {erc721ArgType} arg - Arguments for creating the ERC721 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC721 contract.
     **/
    createContractERC721(arg: erc721ArgType, signer: any): Promise<ethers.Contract>;
    /**
     * Create an ERC1155 contract using the provided arguments and signer.
     * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC1155 contract.
     **/
    createContractERC1155(arg: erc1155ArgType, signer: any): Promise<ethers.Contract>;
    /**
     * Create an ERC1155 contract using the provided arguments and signer.
     * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
     * @param {any} signer - The signer to authorize the deployment.
     * @returns {Promise<any>} The deployed ERC1155 contract.
     **/
    createContractStableCoin(arg: stableCoinArgType, signer: any): Promise<ethers.Contract>;
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
    createWalletSigner(pvtKey: string): ethers.Wallet;
    /**
     * Create a signer using a provider object.
     * @param {any} providerObject - The provider object to create the signer.
     * @returns {any} The signer object.
     */
    createProviderSigner(providerObject: any): ethers.providers.JsonRpcSigner;
    /**
     * Get an instance of the ERC20 contract.
     * @param {string} address - The address of the ERC20 contract.
     * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
     * @param {any} provider - The optional provider object.
     * @returns {ERC20} An instance of the ERC20 contract.
     **/
    getERC20Instance(address: string, rpc?: string, provider?: any): ERC20;
    /**
     * Get an instance of the ERC721 contract.
     * @param {string} address - The address of the ERC721 contract.
     * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
     * @param {any} provider - The optional provider object.
     * @returns {ERC721} An instance of the ERC721 contract.
     **/
    getERC721Instance(address: string, rpc?: string, provider?: any): ERC721;
    /**
     * Get an instance of the ERC1155 contract.
     * @param {string} address - The address of the ERC1155 contract.
     * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
     * @param {any} provider - The optional provider object.
     * @returns {ERC1155} An instance of the ERC1155 contract.
     **/
    getERC1155Instance(address: string, rpc?: string, provider?: any): ERC1155;
    getStableCoinInstance(address: string, rpc?: string, provider?: any): StableCoin;
    resolveENSOrReturnAddress(input: string): Promise<string>;
}
