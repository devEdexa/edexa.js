import { Contract, ethers } from "ethers";
import { relative } from "path";
import abi from "../abi/ERC20-Abi.json"




export interface ERC20Interface{
    rpc : string;
    provider : any;
    getBalance(address : string) : Promise<any>;
    approve(userAddress: string, amount : string, provider : any) : any;
    getAllowance() : any;
    transfer() : any;
    withdraw() : any;
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

    getContractInstance(){
        let contract = new ethers.Contract(this.address, abi, this.provider)
        return contract;
    }

    getActionContractInstance(provider : any){
        provider = new ethers.providers.Web3Provider(provider);
        let signer = provider.getSigner();
        let contract = new ethers.Contract(this.address, abi, signer)
        return contract
    }    


    async getBalance(userAddress: string){
        let contract  = this.getContractInstance();
        let res = await contract.balanceOf(userAddress);
        return res.toString();
    }

    async approve(userAddress: string, amount : string , provider : any){
        let contract  = this.getActionContractInstance(provider);
        let res = await contract.approve(userAddress,amount);
        return res.toString();
    }

    getAllowance(){

    }


    transfer() {
        
    }
    
    withdraw() {
        
    }

}