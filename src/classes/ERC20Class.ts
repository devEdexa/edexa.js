import { Contract, ethers } from "ethers";
import { relative } from "path";
import abi from "../abi/ERC20-Abi.json"

export interface ERC20Interface{
    rpc : string;
    provider : any;
    getBalance(address : string) : Promise<any>;
    getAllowance(owner : string,spender:string) : Promise<any>;
    approve(userAddress: string, amount : string, provider : any) : any;
    getAllowance(owner : string,spender:string) : any;
    transfer(userAddress: string, amount : string , provider : any) : any;
    transferFrom(userAddress: string, to : string ,amount : string , provider : any) : any;
}

export class ERC20 implements ERC20Interface{

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

    async getAllowance(owner : string,spender:string){
        let contract  = this.getContractInstance();
        let res = await contract.allowance(owner,spender);
        return res.toString()
    }

    //action function

    async approve(userAddress: string, amount : string , signer : any){
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.approve(userAddress,amount);
        return res.toString();
    }

    async transfer(userAddress: string, amount : string , signer : any) {
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.transfer(userAddress,amount);
        return res.toString();
    }
    
    async transferFrom(from: string, to:string, amount : string , signer : any) {
        let contract  = this.getActionContractInstance(signer);
        let res = await contract.transferFrom(from,to,amount);
        return res.toString();
    }

}