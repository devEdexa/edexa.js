import { ethers } from "ethers";
export interface ERC1155Interface {
    rpc: string;
    provider: any;
    getBalance(address: string, id: string): Promise<any>;
    safeTransferFrom(from: string, to: string, id: string, amount: string, data: string, signer: any): any;
}
export declare class ERC1155 implements ERC1155Interface {
    address: string;
    rpc: string;
    provider: any;
    constructor(address: string, rpc: string, provider?: any);
    getContractInstance(): ethers.Contract;
    getActionContractInstance(signer: any): ethers.Contract;
    /**
     * Fetch the balance of a specific token for a user's address.
     * @param {string} userAddress - The address of the user.
     * @param {string} id - The ID of the token.
     * @returns {Promise<string>} The balance of the user for the specified token as a string.
     **/
    getBalance(userAddress: string, id: string): Promise<any>;
    /**
     * Fetch the URI (Uniform Resource Identifier) of a specific token.
     * @param {string} id - The ID of the token.
     * @returns {Promise<string>} The URI of the token as a string.
     **/
    getUri(id: string): Promise<any>;
    /**
   * Fetch the balances of multiple tokens (specified by their IDs) for a specific address.
   * @param {string} address - The address for which the balances are to be fetched.
   * @param {string[]} id - The array of token IDs to get balances for.
   * @returns {Promise<string[]>} An array of balances for the specified tokens corresponding to the address.
   */
    getbBalanceOfBatch(address: string, id: string[]): Promise<any>;
    /**
     * Mint a new token to a user's address with a specified ID, amount, and data.
     * @param {string} userAddress - The user's address.
     * @param {string} id - The ID of the token to mint.
     * @param {string} amount - The amount of tokens to mint.
     * @param {string} data - Additional data associated with the minting (default is "0x").
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    mint(userAddress: string, id: string, amount: string, data: string, signer: any): Promise<any>;
    /**
     * Mint multiple tokens to a user's address with specified IDs, amounts, and data.
     * @param {string} userAddress - The user's address.
     * @param {string[]} id - An array of token IDs to mint.
     * @param {string[]} amount - An array of amounts corresponding to the token IDs.
     * @param {string} data - Additional data associated with the minting (default is "0x").
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    mintBatch(userAddress: string, id: string[], amount: string[], data: string, signer: any): Promise<any>;
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
    safeTransferFrom(from: string, to: string, id: string, amount: string, data: string, signer: any): Promise<any>;
    /**
   * Renounce ownership of the contract.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
    renounceOwnership(signer: any): Promise<string>;
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
    safeBatchTransferFrom(from: string, to: string, ids: string[], value: string[], data: string, signer: any): Promise<string>;
    /**
 * Set or unset the approval of a third party (an operator) to manage all tokens of the sender.
 * @param {string} to - The operator's address to set approval for.
 * @param {Boolean} approved - True to approve, false to revoke approval.
 * @param {any} signer - The signer to authorize the transaction.
 * @returns {Promise<string>} The transaction result as a string.
 */
    setApprovalForAll(to: string, approved: Boolean, signer: any): Promise<string>;
    /**
   * Transfer ownership of the contract to a new address.
   * @param {string} to - The address to which ownership will be transferred.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   */
    transferOwnership(to: string, signer: any): Promise<string>;
}
