import { ERC20 } from "./ERC20Class";

export class EdexaClient{

    erc20 !: ERC20;

    constructor(address?:string, rpc?:string, provider?:any) {
        this.erc20 = new ERC20(address || '',rpc || '', provider); // Initialize the property in the constructor
    }


}