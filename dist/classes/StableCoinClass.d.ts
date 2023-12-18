import { Contract } from "ethers";
export interface StableCoinInterface {
    rpc: string;
    provider: any;
    getBalance(address: string): Promise<any>;
    getAllowance(owner: string, spender: string): Promise<any>;
    approve(userAddress: string, amount: string, provider: any): any;
    transfer(userAddress: string, amount: string, provider: any): any;
    transferFrom(userAddress: string, to: string, amount: string, provider: any): any;
    removeFromBlacklist(_account: string, provider: any): Promise<any>;
    addToBlacklist(_account: string, provider: any): Promise<any>;
}
export declare class StableCoin implements StableCoinInterface {
    address: string;
    rpc: string;
    provider: any;
    constructor(address: string, rpc: string, provider?: any);
    getContractInstance(): Contract;
    getActionContractInstance(signer: any): Contract;
    /**
     * Fetch the balance of an address.
     * @param {string} userAddress - The address of the user.
     * @returns {Promise<string>} The balance of the user as a string.
     **/
    getBalance(userAddress: string): Promise<any>;
    /**
     * Fetch the allowance for a spender on behalf of an owner.
     * @param {string} owner - The owner's address.
     * @param {string} spender - The spender's address.
     * @returns {Promise<string>} The allowance amount as a string.
     **/
    getAllowance(owner: string, spender: string): Promise<any>;
    /**
     * Burn a specific amount of tokens.
     * @param {string} amount - The amount of tokens to burn.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    burn(amount: string, signer: any): Promise<string>;
    /**
     * Burn a specific amount of tokens from a specific address.
     * @param {string} from - The address from which to burn tokens.
     * @param {string} amount - The amount of tokens to burn.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    burnFrom(from: string, amount: string, signer: any): Promise<string>;
    /**
     * Mint a specific amount of tokens and send them to a recipient.
     * @param {string} to - The address to which tokens will be minted.
     * @param {string} amount - The amount of tokens to mint.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    mint(to: string, amount: string, signer: any): Promise<string>;
    /**
     * Pause the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    pause(signer: any): Promise<string>;
    /**
     * Unpause the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    unpause(signer: any): Promise<string>;
    /**
     * Renounce ownership of the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    renounceOwnership(signer: any): Promise<string>;
    /**
     * Transfer ownership of the contract to a new address.
     * @param {string} to - The address to which ownership will be transferred.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    transferOwnership(to: string, signer: any): Promise<string>;
    /**
     * Approve a spender to spend a specific amount on your behalf.
     * @param {string} userAddress - Your address.
     * @param {string} amount - The amount to approve.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    approve(userAddress: string, amount: string, signer: any): Promise<any>;
    /**
     * Transfer a specific amount to a recipient.
     * @param {string} userAddress - Your address.
     * @param {string} amount - The amount to transfer.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    transfer(userAddress: string, amount: string, signer: any): Promise<any>;
    /**
     * Transfer a specific amount from one address to another.
     * @param {string} from - The address to transfer from.
     * @param {string} to - The address to transfer to.
     * @param {string} amount - The amount to transfer.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    transferFrom(from: string, to: string, amount: string, signer: any): Promise<any>;
    /**
     * Add an account to the blacklist.
     * @param {string} _account - The address to add to the blacklist.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<any>} The transaction result.
     */
    addToBlacklist(_account: string, signer: any): Promise<any>;
    /**
     * Remove an account from the blacklist.
     * @param {string} _account - The address to remove from the blacklist.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<any>} The transaction result.
     */
    removeFromBlacklist(_account: string, signer: any): Promise<any>;
}
