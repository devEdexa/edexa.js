import { Contract, ethers } from "ethers";
import { relative } from "path";
import abi from "../abi/ERC20-Abi.json"




export interface ERC20Interface{
    rpc : string;
    provider : any;
    getBalance(address : string) : Promise<any>;
    approve() : any;
    getAllowance() : any;
    transfer() : any;
    withdraw() : any;
}



export class ERC20 implements ERC20Interface{


    address :string;
    rpc : string;
    provider : any;

    constructor( address: string , rpc: string , pro ?:any){
        this.address = address || '';
        this.rpc = rpc || '';
        if(pro)
        this.provider =  new ethers.providers.Web3Provider(pro);
        if(rpc)
        this.provider =  new ethers.providers.JsonRpcProvider(rpc);
    }

    getContractInstance(){

        let contract = new ethers.Contract(this.address, abi, this.provider)
        return contract;
    }

    async getBalance(userAddress: string){
        let contract  = this.getContractInstance();
        let res = await contract.balanceOf(userAddress);
        console.log(res.toString());
        return res.toString();
        console.log(userAddress,"<<<<<<<<<<<<<<<<<<<<<<<")
    }

    approve(){

    }

    getAllowance(){

    }


    transfer() {
        
    }
    
    withdraw() {
        
    }

}