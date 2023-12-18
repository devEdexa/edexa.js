import { ethers } from "ethers";
export interface ERC721Interface {
    rpc: string;
    provider: any;
    getBalance(address: string): Promise<any>;
    getApproved(id: string): Promise<any>;
    approve(userAddress: string, amount: string, provider: any): any;
    safeTransferFrom(userAddress: string, to: string, amount: string, provider: any): any;
    safeMint(userAddress: string, uri: string, signer: any): any;
}
export declare class ERC721 implements ERC721Interface {
    address: string;
    rpc: string;
    provider: any;
    constructor(address: string, rpc: string, provider?: any);
    getContractInstance(): ethers.Contract;
    getActionContractInstance(signer: any): ethers.Contract;
    /**
     * Fetch the balance of an address.
     * @param {string} userAddress - The address of the user.
     * @returns {Promise<string>} The balance of the user as a string.
     **/
    getBalance(userAddress: string): Promise<any>;
    /**
     * Fetch the approved address for a token ID.
     * @param {string} id - The token ID.
     * @returns {Promise<string>} The approved address as a string.
     **/
    getApproved(id: string): Promise<any>;
    /**
     * Fetch the owner of a token ID.
     * @param {string} id - The token ID.
     * @returns {Promise<string>} The owner's address as a string.
     **/
    ownerOf(id: string): Promise<any>;
    /**
     * Fetch the URI of a token ID.
     * @param {string} id - The token ID.
     * @returns {Promise<string>} The token's URI as a string.
     **/
    tokenURI(id: string): Promise<any>;
    /**
     * Burn tokens with a specific ID.
     * @param {string} id - The ID of the tokens to burn.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    burn(id: string, signer: any): Promise<string>;
    /**
     * Pause the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    pause(signer: any): Promise<string>;
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
     * Unpause the contract.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     */
    unpause(signer: any): Promise<string>;
    /**
     * Mint a new token to a user's address with a specified URI.
     * @param {string} userAddress - The user's address.
     * @param {string} uri - The URI for the token.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    safeMint(userAddress: string, uri: string, signer: any): Promise<any>;
    /**
     * Approve an address to spend a specific token.
     * @param {string} userAddress - Your address.
     * @param {string} id - The token ID to approve.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    approve(userAddress: string, id: string, signer: any): Promise<any>;
    /**
     * Safely transfer a token from one address to another.
     * @param {string} from - The address to transfer from.
     * @param {string} to - The address to transfer to.
     * @param {string} id - The token ID to transfer.
     * @param {any} signer - The signer to authorize the transaction.
     * @returns {Promise<string>} The transaction result as a string.
     **/
    safeTransferFrom(from: string, to: string, id: string, signer: any): Promise<any>;
}
