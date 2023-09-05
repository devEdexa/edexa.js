import { sign } from "crypto";
import { ERC20 } from "./ERC20Class";
import {  ethers } from "ethers";
import { ERC721 } from "./ERC721Class";
import { ERC1155 } from "./ERC1155Class";

export class EdexaClient{

    //signers
    createWalletSigner(pvtKey : string){
        const wallet = new ethers.Wallet(pvtKey);
        const provider =  new ethers.providers.JsonRpcProvider("https://testnet.edexa.com/rpc");
        let signer = wallet.connect(provider)
        return signer;
    }

    createProviderSigner(providerObject: any){
    let provider = new ethers.providers.Web3Provider(providerObject);
    let signer = provider.getSigner()
    return signer;
    }


    // ERC contracts
    getERC20Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
       return  new ERC20(address,rpc, provider)
    }

    getERC721Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
        return  new ERC721(address,rpc, provider)
    }

    getERC1155Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
        return  new ERC1155(address,rpc, provider)
    }




}