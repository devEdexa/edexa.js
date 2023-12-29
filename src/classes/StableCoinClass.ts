// Import necessary modules and dependencies
import { Contract, ethers } from 'ethers'
import { relative } from 'path'
import abi from '../abi/StableCoin.json'
import { EdexaClient } from './EdexaClient'
import { resolveENSOrReturnAddress } from '../utils/resolve'

// Define the interface for the StableCoin
export interface StableCoinInterface {
  rpc: string
  provider: any
  getBalance(address: string): Promise<any>
  getAllowance(owner: string, spender: string): Promise<any>
  approve(userAddress: string, amount: string, provider: any): any
  transfer(userAddress: string, amount: string, provider: any): any
  transferFrom(
    userAddress: string,
    to: string,
    amount: string,
    provider: any,
  ): any
  removeFromBlacklist(_account: string, provider: any): Promise<any>
  addToBlacklist(_account: string, provider: any): Promise<any>
}

// Implement the StableCoin class based on the defined interface
export class StableCoin implements StableCoinInterface {
  address: string
  rpc: string
  provider: any

  // Constructor for the StableCoin class
  constructor(address: string, rpc: string, provider?: any) {
    this.address = address

    // Create an Ethereum provider based on the input or use a JsonRpcProvider
    this.rpc = rpc
    if (provider != undefined)
      this.provider = new ethers.providers.Web3Provider(provider)
    else {
      this.provider = new ethers.providers.JsonRpcProvider(rpc)
    }
  }

  // Helper functions

  // Create a read-only contract instance
  getContractInstance() {
    let contract = new ethers.Contract(this.address, abi, this.provider)
    return contract
  }

  // Create a contract instance for actions (requires a signer)
  getActionContractInstance(signer: any) {
    let contract = new ethers.Contract(this.address, abi, signer)
    return contract
  }

  // Read functions

  /**
   * Fetch the balance of an address.
   * @param {string} userAddress - The address of the user.
   * @returns {Promise<string>} The balance of the user as a string.
   **/
  async getBalance(userAddress: string) {
    // Resolve ENS or return the address directly
    userAddress = await resolveENSOrReturnAddress(userAddress)

    let contract = this.getContractInstance()
    let res = await contract.balanceOf(userAddress)
    return res.toString()
  }

  /**
   * Fetch the allowance for a spender on behalf of an owner.
   * @param {string} owner - The owner's address.
   * @param {string} spender - The spender's address.
   * @returns {Promise<string>} The allowance amount as a string.
   **/
  async getAllowance(owner: string, spender: string) {
    owner = await resolveENSOrReturnAddress(owner)
    spender = await resolveENSOrReturnAddress(spender)

    let contract = this.getContractInstance()
    let res = await contract.allowance(owner, spender)
    return res.toString()
  }

  // Action functions

  /**
   * Burn a specific amount of tokens.
   * @param {string} amount - The amount of tokens to burn.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
  async burn(amount: string, signer: any): Promise<string> {
    let contract = this.getActionContractInstance(signer)
    let res = await contract.burn(amount)
    return res.toString()
  }

  /**
   * Burn a specific amount of tokens from a specific address.
   * @param {string} from - The address from which to burn tokens.
   * @param {string} amount - The amount of tokens to burn.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
  async burnFrom(from: string, amount: string, signer: any): Promise<string> {
    from = await resolveENSOrReturnAddress(from)

    let contract = this.getActionContractInstance(signer)
    let res = await contract.burnFrom(from, amount)
    return res.toString()
  }

  /**
   * Mint a specific amount of tokens and send them to a recipient.
   * @param {string} to - The address to which tokens will be minted.
   * @param {string} amount - The amount of tokens to mint.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
  async mint(to: string, amount: string, signer: any): Promise<string> {
    to = await resolveENSOrReturnAddress(to)
    let contract = this.getActionContractInstance(signer)
    let res = await contract.mint(to, amount)
    return res.toString()
  }

  /**
   * Pause the contract.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
  async pause(signer: any): Promise<string> {
    let contract = this.getActionContractInstance(signer)
    let res = await contract.pause()
    return res.toString()
  }

  /**
   * Unpause the contract.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
  async unpause(signer: any): Promise<string> {
    let contract = this.getActionContractInstance(signer)
    let res = await contract.unpause()
    return res.toString()
  }

  /**
   * Renounce ownership of the contract.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
  async renounceOwnership(signer: any): Promise<string> {
    let contract = this.getActionContractInstance(signer)
    let res = await contract.renounceOwnership()
    return res.toString()
  }

  /**
   * Transfer ownership of the contract to a new address.
   * @param {string} to - The address to which ownership will be transferred.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
  async transferOwnership(to: string, signer: any): Promise<string> {
    to = await resolveENSOrReturnAddress(to)
    let contract = this.getActionContractInstance(signer)
    let res = await contract.transferOwnership(to)
    return res.toString()
  }

  /**
   * Approve a spender to spend a specific amount on your behalf.
   * @param {string} userAddress - Your address.
   * @param {string} amount - The amount to approve.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
  async approve(userAddress: string, amount: string, signer: any) {
    userAddress = await resolveENSOrReturnAddress(userAddress)

    let contract = this.getActionContractInstance(signer)
    let res = await contract.approve(userAddress, amount)
    return res.toString()
  }

  /**
   * Transfer a specific amount to a recipient.
   * @param {string} userAddress - Your address.
   * @param {string} amount - The amount to transfer.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
  async transfer(userAddress: string, amount: string, signer: any) {
    userAddress = await resolveENSOrReturnAddress(userAddress)

    let contract = this.getActionContractInstance(signer)
    let res = await contract.transfer(userAddress, amount)
    return res.toString()
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
    from = await resolveENSOrReturnAddress(from)
    to = await resolveENSOrReturnAddress(to)
    let contract = this.getActionContractInstance(signer)
    let res = await contract.transferFrom(from, to, amount)
    return res.toString()
  }

  // Blacklist functions

  /**
   * Add an account to the blacklist.
   * @param {string} _account - The address to add to the blacklist.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<any>} The transaction result.
   */
  async addToBlacklist(_account: string, signer: any): Promise<any> {
    _account = await resolveENSOrReturnAddress(_account)
    let contract = this.getActionContractInstance(signer)
    let res = await contract.addToBlacklist(_account)
    return res.toString()
  }

  /**
   * Remove an account from the blacklist.
   * @param {string} _account - The address to remove from the blacklist.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<any>} The transaction result.
   */
  async removeFromBlacklist(_account: string, signer: any): Promise<any> {
    _account = await resolveENSOrReturnAddress(_account)
    let contract = this.getActionContractInstance(signer)
    let res = await contract.removeFromBlacklist(_account)
    return res.toString()
  }
}
