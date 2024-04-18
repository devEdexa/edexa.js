import { RPC_URL } from './src/constants';
import { EdexaClient } from './src/index'
import { ethers } from 'ethers'
async function checkENS() {
    
    let edexaclient = new EdexaClient();
    let ens = await edexaclient.resolveENSOrReturnAddress('0x4c48367Ca3192b1B494e65f6c81699Bc62506c73');
    console.log("ens name of given address:",ens)
    
    }
async function resolveAddress() {
    
    let edexaclient = new EdexaClient();
    let ens = await edexaclient.resolveAddress('luttapi.edx');
    console.log("address of given ens name:",ens)
    
}
    checkENS()
    resolveAddress()
