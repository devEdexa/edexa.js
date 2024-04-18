import { EdexaClient } from './src/index'

async function resolveAddress(input: string) {
    
    let edexaclient = new EdexaClient();
    let ens = await edexaclient.resolveAddr(input);
    console.log("ens name of",input, " is:",ens)
    
    }
async function resolveName(input : string) {
    
    let edexaclient = new EdexaClient();
    let add = await edexaclient.resolveName(input);
    console.log("address of",input, " is:",add)
}



resolveAddress("0x44aDbAcC4B0baD81dBc6D24b9512da3806c5aCCD")
resolveAddress('0x4c48367Ca3192b1B494e65f6c81699Bc62506c73')

resolveName('luttapi.edx')
// resolveName('luttapi')
