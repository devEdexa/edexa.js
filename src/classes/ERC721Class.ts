import {  ethers } from "ethers";
import abi from "../abi/ERC721-Abi.json"

export interface ERC721Interface{
    rpc : string;
    provider : any;
    getBalance(address : string) : Promise<any>;
    getApproved(id : string) : Promise<any>;
    approve(userAddress: string, amount : string, provider : any) : any;
    safeTransferFrom(userAddress: string, to : string ,amount : string , provider : any) : any;
    safeMint(userAddress: string, uri : string , signer : any) : any;
}

export class ERC721 implements ERC721Interface{

    address :string;
    rpc : string;
    provider : any;

    constructor( address: string , rpc: string , provider ?:any){
        this.address = address;
        this.rpc = rpc;

    // Create an Ethereum provider based on the input or use a JsonRpcProvider
        if(provider != undefined)
        this.provider =  new ethers.providers.Web3Provider(provider);
        else{
        this.provider =  new ethers.providers.JsonRpcProvider(rpc);
        }
    }

    //helper functions


    // Create a read-only contract instance
    getContractInstance(){
        let contract = new ethers.Contract(this.address, abi, this.provider)
        return contract;
    }

    // Create a contract instance for actions (requires a signer)
    getActionContractInstance(signer : any){
        let contract = new ethers.Contract(this.address, abi, signer)
        return contract
    }    



    //read function

    /**
   * Fetch the balance of an address.
   * @param {string} userAddress - The address of the user.
   * @returns {Promise<string>} The balance of the user as a string.
   **/
    async getBalance(userAddress: string){
        let contract  = this.getContractInstance();
        let res = await contract.balanceOf(userAddress);
        return res.toString();
    }

     /**
   * Fetch the approved address for a token ID.
   * @param {string} id - The token ID.
   * @returns {Promise<string>} The approved address as a string.
   **/
    async getApproved(id : string){
        let contract  = this.getContractInstance();
        let res = await contract.getApproved(id);
        return res.toString()
    }

     /**
   * Fetch the owner of a token ID.
   * @param {string} id - The token ID.
   * @returns {Promise<string>} The owner's address as a string.
   **/
    async ownerOf(id : string){
        let contract  = this.getContractInstance();
        let res = await contract.ownerOf(id);
        return res.toString()
    }

    /**
   * Fetch the URI of a token ID.
   * @param {string} id - The token ID.
   * @returns {Promise<string>} The token's URI as a string.
   **/
    async tokenURI(id : string){
        let contract  = this.getContractInstance();
        let res = await contract.tokenURI(id);
        return res.toString()
    }

    //action function

    /**
   * Mint a new token to a user's address with a specified URI.
   * @param {string} userAddress - The user's address.
   * @param {string} uri - The URI for the token.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
    async safeMint(userAddress: string, uri : string , signer : any){
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.safeMint(userAddress,uri);
        return res.toString();
    }

     /**
   * Approve an address to spend a specific token.
   * @param {string} userAddress - Your address.
   * @param {string} id - The token ID to approve.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
    async approve(userAddress: string, id : string , signer : any){
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.approve(userAddress,id);
        return res.toString();
    }

    /**
   * Safely transfer a token from one address to another.
   * @param {string} from - The address to transfer from.
   * @param {string} to - The address to transfer to.
   * @param {string} id - The token ID to transfer.
   * @param {any} signer - The signer to authorize the transaction.
   * @returns {Promise<string>} The transaction result as a string.
   **/
    async safeTransferFrom(from: string, to:string, id : string , signer : any) {
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.transferFrom(from,to,id);
        return  res.toString();
    }

}