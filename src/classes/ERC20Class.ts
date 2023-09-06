import { Contract, ethers } from "ethers";
import { relative } from "path";
import abi from "../abi/ERC20-Abi.json";

export interface ERC20Interface {
  rpc: string;
  provider: any;
  getBalance(address: string): Promise<any>;
  getAllowance(owner: string, spender: string): Promise<any>;
  approve(userAddress: string, amount: string, provider: any): any;
  getAllowance(owner: string, spender: string): any;
  transfer(userAddress: string, amount: string, provider: any): any;
  transferFrom(
    userAddress: string,
    to: string,
    amount: string,
    provider: any
  ): any;
}

export class ERC20 implements ERC20Interface {
  address: string;
  rpc: string;
  provider: any;

  constructor(address: string, rpc: string, provider?: any) {
    this.address = address;
    
    // Create an Ethereum provider based on the input or use a JsonRpcProvider
    this.rpc = rpc;
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
   * Fetch the balance of an address.
   * @param {string} userAddress - The address of the user.
   * @returns {Promise<string>} The balance of the user as a string.
   **/
  async getBalance(userAddress: string) {
    let contract = this.getContractInstance();
    let res = await contract.balanceOf(userAddress);
    return res.toString();
  }

   /**
   * Fetch the allowance for a spender on behalf of an owner.
   * @param {string} owner - The owner's address.
   * @param {string} spender - The spender's address.
   * @returns {Promise<string>} The allowance amount as a string.
   **/
  async getAllowance(owner: string, spender: string) {
    let contract = this.getContractInstance();
    let res = await contract.allowance(owner, spender);
    return res.toString();
  }

  //action function


  /**
   * Approve a spender to spend a specific amount on your behalf.
   * @param {string} userAddress - Your address.
   * @param {string} amount - The amount to approve.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
  async approve(userAddress: string, amount: string, signer: any) {
    let contract = this.getActionContractInstance(signer);
    let res = await contract.approve(userAddress, amount);
    return res.toString();
  }

   /**
   * Transfer a specific amount to a recipient.
   * @param {string} userAddress - Your address.
   * @param {string} amount - The amount to transfer.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
  async transfer(userAddress: string, amount: string, signer: any) {
    let contract = this.getActionContractInstance(signer);
    let res = await contract.transfer(userAddress, amount);
    return res.toString();
  }


   /**
   * Transfer a specific amount from one address to another.
   * @param {string} from - The address to transfer from.
   * @param {string} to - The address to transfer to.
   * @param {string} amount - The amount to transfer.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
  async transferFrom(from: string, to: string, amount: string, signer: any) {
    let contract = this.getActionContractInstance(signer);
    let res = await contract.transferFrom(from, to, amount);
    return res.toString();
  }
}
