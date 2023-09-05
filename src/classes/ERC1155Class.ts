import {  ethers } from "ethers";
import abi from "../abi/ERC1155-Abi.json"

export interface ERC1155Interface{
    rpc : string;
    provider : any;
    getBalance(address : string, id : string) : Promise<any>;
    safeTransferFrom(from :string, to: string, id : string ,amount :string,data : string, signer : any) : any;
}

export class ERC1155 implements ERC1155Interface{

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

    async getBalance(userAddress: string, id : string){
        let contract  = this.getContractInstance();
        let res = await contract.balanceOf(userAddress,id);
        return res.toString();
    }



    async getUri(id : string){
        let contract  = this.getContractInstance();
        let res = await contract.uri(id);
        return res.toString()
    }

    //action function

    async mint(userAddress: string, id : string ,amount :string,data : string = "0x", signer : any){
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.mint(userAddress,id,amount,data);
        return res.toString();
    }

    async mintBatch(userAddress: string, id : string[] ,amount :string[],data : string = "0x", signer : any){
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.mintBatch(userAddress,id,amount,data);
        return res.toString();
    }

    async safeTransferFrom(from :string, to: string, id : string ,amount :string,data : string = "0x", signer : any) {
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.safeTransferFrom(from,to,id,amount,data);
        return  res.toString();
    }


}