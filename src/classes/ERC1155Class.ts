import { ethers } from "ethers";
import abi from "../abi/ERC1155-Abi.json";

export interface ERC1155Interface {
  rpc: string;
  provider: any;
  getBalance(address: string, id: string): Promise<any>;
  safeTransferFrom(
    from: string,
    to: string,
    id: string,
    amount: string,
    data: string,
    signer: any
  ): any;
}

export class ERC1155 implements ERC1155Interface {
  address: string;
  rpc: string;
  provider: any;

  constructor(address: string, rpc: string, provider?: any) {
    this.address = address;
    this.rpc = rpc;

    // Create an Ethereum provider based on the input or use a JsonRpcProvider
    if (provider != undefined)
      this.provider = new ethers.providers.Web3Provider(provider);
    else {
      this.provider = new ethers.providers.JsonRpcProvider(rpc);
    }
  }

  //helper functions

  // Create a read-only contract instance
  getContractInstance() {
    let contract = new ethers.Contract(this.address, abi, this.provider);
    return contract;
  }

  // Create a contract instance for actions (requires a signer)
  getActionContractInstance(signer: any) {
    let contract = new ethers.Contract(this.address, abi, signer);
    return contract;
  }

  //read function

  /**
   * Fetch the balance of a specific token for a user's address.
   * @param {string} userAddress - The address of the user.
   * @param {string} id - The ID of the token.
   * @returns {Promise<string>} The balance of the user for the specified token as a string.
   **/
  async getBalance(userAddress: string, id: string) {
    let contract = this.getContractInstance();
    let res = await contract.balanceOf(userAddress, id);
    return res.toString();
  }

  /**
   * Fetch the URI (Uniform Resource Identifier) of a specific token.
   * @param {string} id - The ID of the token.
   * @returns {Promise<string>} The URI of the token as a string.
   **/
  async getUri(id: string) {
    let contract = this.getContractInstance();
    let res = await contract.uri(id);
    return res.toString();
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
  async mint(
    userAddress: string,
    id: string,
    amount: string,
    data: string = "0x",
    signer: any
  ) {
    let contract = this.getActionContractInstance(signer);
    let res = await contract.mint(userAddress, id, amount, data);
    return res.toString();
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
  async mintBatch(
    userAddress: string,
    id: string[],
    amount: string[],
    data: string = "0x",
    signer: any
  ) {
    let contract = this.getActionContractInstance(signer);
    let res = await contract.mintBatch(userAddress, id, amount, data);
    return res.toString();
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
  async safeTransferFrom(
    from: string,
    to: string,
    id: string,
    amount: string,
    data: string = "0x",
    signer: any
  ) {
    let contract = this.getActionContractInstance(signer);
    let res = await contract.safeTransferFrom(from, to, id, amount, data);
    return res.toString();
  }
}
