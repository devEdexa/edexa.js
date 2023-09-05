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
        if(provider != undefined)
        this.provider =  new ethers.providers.Web3Provider(provider);
        else{
        this.provider =  new ethers.providers.JsonRpcProvider(rpc);
        }
    }

    //helper functions

    getContractInstance(){
        let contract = new ethers.Contract(this.address, abi, this.provider)
        return contract;
    }

    getActionContractInstance(signer : any){
        let contract = new ethers.Contract(this.address, abi, signer)
        return contract
    }    



    //read function

    async getBalance(userAddress: string){
        let contract  = this.getContractInstance();
        let res = await contract.balanceOf(userAddress);
        return res.toString();
    }

    async getApproved(id : string){
        let contract  = this.getContractInstance();
        let res = await contract.getApproved(id);
        return res.toString()
    }

    async ownerOf(id : string){
        let contract  = this.getContractInstance();
        let res = await contract.ownerOf(id);
        return res.toString()
    }

    async tokenURI(id : string){
        let contract  = this.getContractInstance();
        let res = await contract.tokenURI(id);
        return res.toString()
    }

    //action function

    async safeMint(userAddress: string, uri : string , signer : any){
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.safeMint(userAddress,uri);
        return res.toString();
    }

    async approve(userAddress: string, id : string , signer : any){
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.approve(userAddress,id);
        return res.toString();
    }

    async safeTransferFrom(from: string, to:string, id : string , signer : any) {
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.transferFrom(from,to,id);
        return  res.toString();
    }

}