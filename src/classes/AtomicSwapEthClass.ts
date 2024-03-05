import { ethers } from 'ethers'
import abi from '../abi/AtomicSwapEth.json'
import { resolveENSOrReturnAddress } from '../utils/resolve'

export interface AtomicSwapEthInterface {
  rpc: string
  provider: ethers.providers.JsonRpcProvider
  address: string
}

export class AtomicSwapEth implements AtomicSwapEthInterface {
  address: string
  rpc: string
  provider: ethers.providers.JsonRpcProvider

  constructor(address: string, rpc: string) {
    this.address = address
    this.rpc = rpc
    this.provider = new ethers.providers.JsonRpcProvider(rpc)
  }

  //helper functions

  // Create a read-only contract instance
  getContractInstance() {
    try {
      let contract = new ethers.Contract(this.address, abi, this.provider)
      return contract
    } catch (error) {
      throw error
    }
  }

  // Create a contract instance for actions (requires a signer)
  getActionContractInstance(signer: ethers.Wallet) {
    try {
      let contract = new ethers.Contract(this.address, abi, signer)
      return contract
    } catch (error) {
      throw error
    }
  }

  //read function

  async getContract(_contractId: string) {
    try {
      let contract = this.getContractInstance()
      let res = await contract.getContract(_contractId)
      return res
    } catch (error) {
      throw error
    }
  }

  async newContract(
    _receiver: string,
    _hashlock: string,
    _timelock: string,
    amount: string,
    signer: any,
  ) {
    try {
      let contract = this.getActionContractInstance(signer)
      const options = {
        value: ethers.utils.parseEther(amount)
      }
      let res = await contract.newContract(_receiver, _hashlock, _timelock, options)
      return res
    } catch (error) {
      throw error
    }
  }

  async refund(_contractId: string, signer: any) {
    try {
      let contract = this.getActionContractInstance(signer)
      let res = await contract.refund(_contractId)
      return res.toString()
    } catch (error) {
      throw error
    }
  }

  async withdraw(_contractId: string,_preimage: string, signer: any) {
    try {
      let contract = this.getActionContractInstance(signer);
      let res = await contract.withdraw(_contractId, _preimage);
      return res.toString()
    } catch (error) {
      throw error
    }
  }
  
}
