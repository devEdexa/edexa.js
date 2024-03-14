import { ethers } from 'ethers'
import abi from '../abi/CBDC-Abi.json'
import erc20Abi from '../abi/ERC20-Abi.json'
import { CBDC_CONTRACT_ADDRESS, ETHER_UNITS } from '../constants'

export class CBDC {
  address: string
  rpc: string
  provider: ethers.providers.JsonRpcProvider
  contract: any
  constructor(rpc: string) {
    this.address = CBDC_CONTRACT_ADDRESS
    this.rpc = rpc
    this.provider = new ethers.providers.JsonRpcProvider(rpc)
    this.contract = new ethers.Contract(this.address, abi, this.provider)
  }

  // Create a read-only contract instance
  setContractInstance(signer) {
    try {
      this.contract = new ethers.Contract(this.address, abi, signer)
      return this.contract
    } catch (error) {
      throw error
    }
  }

  // Create a contract instance for actions (requires a signer)
  private getContractInstance(address, signer: ethers.Wallet) {
    try {
      const contract = new ethers.Contract(address, erc20Abi, signer)
      return contract
    } catch (error) {
      throw error
    }
  }

  async createOrder(
    tokenToGive: any,
    amountToGive: number,
    tokenToReceive: any,
    amountToReceive: number,
    signer: ethers.Wallet,
    creationFee: number,
  ) {
    try {
      const tokenToGiveContract = this.getContractInstance(tokenToGive, signer)
      await this.setContractInstance(signer)
      const approveTx = await tokenToGiveContract.approve(
        this.address,
        ethers.utils.parseUnits(amountToGive.toString(), ETHER_UNITS.ETHER),
      )
      await approveTx.wait()
      const tx = await this.contract.createOrder(
        tokenToGive,
        ethers.utils.parseUnits(amountToGive.toString(), ETHER_UNITS.ETHER),
        tokenToReceive,
        ethers.utils.parseUnits(amountToReceive.toString(), ETHER_UNITS.ETHER),
        {
          value: ethers.utils.parseUnits(
            creationFee.toString(),
            ETHER_UNITS.WEI,
          ),
        },
      )
      await tx.wait()
      return tx.hash
    } catch (error) {
      throw error
    }
  }

  async swap(
    orderId: number,
    amountToReceive: string,
    tokenToGive: string,
    amountToGive: number,
    signer,
  ) {
    try {
      // console.log(
      //   ethers.utils
      //     .parseUnits('5000'.toString(), ETHER_UNITS.ETHER)
      //     .toString(),
      // )
      const tokenToGiveContract = this.getContractInstance(tokenToGive, signer)
      const approveTransaction = await tokenToGiveContract.approve(
        this.address,
        amountToGive,
      )
      await approveTransaction.wait()
      await this.setContractInstance(signer)
      const tx = await this.contract.swap(orderId, amountToReceive)
      await tx.wait()
      return tx.hash
    } catch (error) {
      throw error
    }
  }

  async cancelOrder(orderId: any) {
    try {
      const tx = await this.contract.cancelOrder(orderId)
      await tx.wait()
      return tx.hash
    } catch (error) {
      throw error
    }
  }

  async getCreationFee(): Promise<number> {
    try {
      const transactionFee = await this.contract.creationFee()
      return parseFloat(transactionFee.toString())
    } catch (error) {
      throw error
    }
  }

  async getActiveOrders(address): Promise<number[]> {
    let activeOrdersList = await this.contract.searchOrderByToken(address)
    activeOrdersList = activeOrdersList.map((order) =>
      parseInt(order.toString()),
    )
    return activeOrdersList
  }

  async getOrderDetails(orderId) {
    const orderDetails = await this.contract.getOrderDetails(orderId)
    return orderDetails
  }

  async calculateAmountToAprove(orderId, amountWant): Promise<number> {
    const amountToGive = await this.contract.calAmountToAprove(
      orderId,
      amountWant,
    )
    return parseFloat(amountToGive.toString())
  }

  async getTransactionDetails(address: any) {
    return this.provider.getTransactionReceipt(address)
  }
}
