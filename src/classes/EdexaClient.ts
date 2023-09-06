import { ERC20 } from "./ERC20Class";
import { ethers, ContractFactory } from "ethers";
import { ERC721 } from "./ERC721Class";
import { ERC1155 } from "./ERC1155Class";
import { erc20ArgType, erc721ArgType, erc1155ArgType } from "../types/types";
import {
  erc20Bytecode,
  erc1155Bytecode,
  erc721Bytecode,
} from "../bytecode/byteCode";
import erc20Abi from "../abi/ERC20-Abi.json";
import erc721Abi from "../abi/ERC721-Abi.json";
import erc1155Abi from "../abi/ERC1155-Abi.json";

export class EdexaClient {
  //signers

  /**
   * Create an ERC20 contract using the provided arguments and signer.
   * @param {erc20ArgType} arg - Arguments for creating the ERC20 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC20 contract.
   **/
  async createContractERC20(arg: erc20ArgType, signer: any) {
    const factory = new ContractFactory(erc20Abi, erc20Bytecode, signer);
    const contract = await factory.deploy(arg.name, arg.symbol, arg.supply);
    return contract;
  }

  /**
   * Create an ERC721 contract using the provided arguments and signer.
   * @param {erc721ArgType} arg - Arguments for creating the ERC721 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC721 contract.
   **/
  async createContractERC721(arg: erc721ArgType, signer: any) {
    const factory = new ContractFactory(erc721Abi, erc721Bytecode, signer);
    const contract = await factory.deploy(arg.name, arg.symbol);
    return contract;
  }

  /**
   * Create an ERC1155 contract using the provided arguments and signer.
   * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC1155 contract.
   **/
  async createContractERC1155(arg: erc1155ArgType, signer: any) {
    const factory = new ContractFactory(erc1155Abi, erc1155Bytecode, signer);
    const contract = await factory.deploy(arg.uri);
    return contract;
  }/**
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
  createWalletSigner(pvtKey: string) {
    const wallet = new ethers.Wallet(pvtKey);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://testnet.edexa.com/rpc"
    );
    let signer = wallet.connect(provider);
    return signer;
  }

  /**
   * Create a signer using a provider object.
   * @param {any} providerObject - The provider object to create the signer.
   * @returns {any} The signer object.
   */
  createProviderSigner(providerObject: any) {
    let provider = new ethers.providers.Web3Provider(providerObject);
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
  getERC20Instance(
    address: string,
    rpc: string = "https://testnet.edexa.com/rpc",
    provider?: any
  ) {
    return new ERC20(address, rpc, provider);
  }

  /**
   * Get an instance of the ERC721 contract.
   * @param {string} address - The address of the ERC721 contract.
   * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
   * @param {any} provider - The optional provider object.
   * @returns {ERC721} An instance of the ERC721 contract.
   **/
  getERC721Instance(
    address: string,
    rpc: string = "https://testnet.edexa.com/rpc",
    provider?: any
  ) {
    return new ERC721(address, rpc, provider);
  }

  /**
   * Get an instance of the ERC1155 contract.
   * @param {string} address - The address of the ERC1155 contract.
   * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
   * @param {any} provider - The optional provider object.
   * @returns {ERC1155} An instance of the ERC1155 contract.
   **/
  getERC1155Instance(
    address: string,
    rpc: string = "https://testnet.edexa.com/rpc",
    provider?: any
  ) {
    return new ERC1155(address, rpc, provider);
  }
}
