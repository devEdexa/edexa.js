import { sign } from "crypto";
import { ERC20 } from "./ERC20Class";
import {  ethers } from "ethers";
import { ERC721 } from "./ERC721Class";
import { ERC1155 } from "./ERC1155Class";

export class EdexaClient{

    //signers

    /**
   * Create a signer using a private key and provider URL.
   * @param {string} pvtKey - The private key to create the signer.
   * @returns {any} The signer object.
   **/
    createWalletSigner(pvtKey : string){
        const wallet = new ethers.Wallet(pvtKey);
        const provider =  new ethers.providers.JsonRpcProvider("https://testnet.edexa.com/rpc");
        let signer = wallet.connect(provider)
        return signer;
    }


    /**
   * Create a signer using a provider object.
   * @param {any} providerObject - The provider object to create the signer.
   * @returns {any} The signer object.
   **/
    createProviderSigner(providerObject: any){
    let provider = new ethers.providers.Web3Provider(providerObject);
    let signer = provider.getSigner()
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
    getERC20Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
       return  new ERC20(address,rpc, provider)
    }

    /**
   * Get an instance of the ERC721 contract.
   * @param {string} address - The address of the ERC721 contract.
   * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
   * @param {any} provider - The optional provider object.
   * @returns {ERC721} An instance of the ERC721 contract.
   **/
    getERC721Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
        return  new ERC721(address,rpc, provider)
    }

     /**
   * Get an instance of the ERC1155 contract.
   * @param {string} address - The address of the ERC1155 contract.
   * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
   * @param {any} provider - The optional provider object.
   * @returns {ERC1155} An instance of the ERC1155 contract.
   **/
    getERC1155Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
        return  new ERC1155(address,rpc, provider)
    }




}