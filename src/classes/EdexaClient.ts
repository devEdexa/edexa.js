import { ERC20 } from "./ERC20Class";

export class EdexaClient{

    getERC20Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
       return  new ERC20(address,rpc, provider)
    }

    getERC721Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
        return  new ERC20(address,rpc, provider)
    }

    getERC1155Instance(address:string, rpc:string = "https://testnet.edexa.com/rpc" , provider?:any){
        return  new ERC20(address,rpc, provider)
    }

}