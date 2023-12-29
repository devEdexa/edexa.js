import { ethers, ContractFactory } from 'ethers'
import { ERC20 } from './ERC20Class'
import { ERC721 } from './ERC721Class'
import { ERC1155 } from './ERC1155Class'
import { StableCoin } from './StableCoinClass'
import {
  erc20ArgType,
  erc721ArgType,
  erc1155ArgType,
  stableCoinArgType,
} from '../types/types'
import {
  erc1155Bytecode,
  erc721Bytecode,
  erc20Bytecode1,
  erc20Bytecode2,
  stableCoinByteCode,
} from '../bytecode/byteCode'
import erc20Abi from '../abi/ERC20-Abi.json'
import erc721Abi from '../abi/ERC721-Abi.json'
import erc1155Abi from '../abi/ERC1155-Abi.json'
import stableCoinAbi from '../abi/StableCoin.json'
import ensAbi from '../abi/ENS.json'

export class EdexaClient {
  //signers

  /**
   * Create an ERC20 contract using the provided arguments and signer.
   * @param {erc20ArgType} arg - Arguments for creating the ERC20 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC20 contract.
   **/
  async createContractERC20(arg: erc20ArgType, signer: any) {
    let factory
    let contract
    if (arg.supply == undefined) {
      factory = new ContractFactory(erc20Abi, erc20Bytecode1, signer)
      contract = await factory.deploy(arg.name, arg.symbol, 0)
    } else {
      factory = new ContractFactory(erc20Abi, erc20Bytecode2, signer)
      contract = await factory.deploy(arg.name, arg.symbol, arg.supply)
    }
    return contract
  }

  /**
   * Create an ERC721 contract using the provided arguments and signer.
   * @param {erc721ArgType} arg - Arguments for creating the ERC721 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC721 contract.
   **/
  async createContractERC721(arg: erc721ArgType, signer: any) {
    const factory = new ContractFactory(erc721Abi, erc721Bytecode, signer)
    const contract = await factory.deploy(arg.name, arg.symbol)
    return contract
  }

  /**
   * Create an ERC1155 contract using the provided arguments and signer.
   * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC1155 contract.
   **/
  async createContractERC1155(arg: erc1155ArgType, signer: any) {
    const factory = new ContractFactory(erc1155Abi, erc1155Bytecode, signer)
    const contract = await factory.deploy(arg.uri)
    return contract
  }

  /**
   * Create an ERC1155 contract using the provided arguments and signer.
   * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC1155 contract.
   **/
  async createContractStableCoin(arg: stableCoinArgType, signer: any) {
    const factory = new ContractFactory(
      stableCoinAbi,
      stableCoinByteCode,
      signer,
    )

    const contract = await factory.deploy(arg.name, arg.symbol, arg.supply)
    return contract
  }

  /**
   * Create an ERC1155 contract using the provided arguments and signer.
   * @param {erc1155ArgType} arg - Arguments for creating the ERC1155 contract.
   * @param {any} signer - The signer to authorize the deployment.
   * @returns {Promise<any>} The deployed ERC1155 contract.
   **/

  /**
   * Create a signer using a private key and provider URL.
   * @param {string} pvtKey - The private key to create the signer.
   * @returns {any} The signer object.
   **/
  createWalletSigner(pvtKey: string) {
    const wallet = new ethers.Wallet(pvtKey)
    const provider = new ethers.providers.JsonRpcProvider(
      'https://testnet.edexa.com/rpc',
    )
    let signer = wallet.connect(provider)
    return signer
  }

  /**
   * Create a signer using a provider object.
   * @param {any} providerObject - The provider object to create the signer.
   * @returns {any} The signer object.
   */
  createProviderSigner(providerObject: any) {
    let provider = new ethers.providers.Web3Provider(providerObject)
    let signer = provider.getSigner()
    return signer
  }

  // ERC contracts

  /**
   * Get an instance of the ERC20 contract.
   * @param {string} address - The address of the ERC20 contract.
   * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
   * @param {any} provider - The optional provider object.
   * @returns {ERC20} An instance of the ERC20 contract.
   **/
  getERC20Instance(
    address: string,
    rpc: string = 'https://testnet.edexa.com/rpc',
    provider?: any,
  ) {
    return new ERC20(address, rpc, provider)
  }

  /**
   * Get an instance of the ERC721 contract.
   * @param {string} address - The address of the ERC721 contract.
   * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
   * @param {any} provider - The optional provider object.
   * @returns {ERC721} An instance of the ERC721 contract.
   **/
  getERC721Instance(
    address: string,
    rpc: string = 'https://testnet.edexa.com/rpc',
    provider?: any,
  ) {
    return new ERC721(address, rpc, provider)
  }

  /**
   * Get an instance of the ERC1155 contract.
   * @param {string} address - The address of the ERC1155 contract.
   * @param {string} rpc - The RPC URL (default is "https://testnet.edexa.com/rpc").
   * @param {any} provider - The optional provider object.
   * @returns {ERC1155} An instance of the ERC1155 contract.
   **/
  getERC1155Instance(
    address: string,
    rpc: string = 'https://testnet.edexa.com/rpc',
    provider?: any,
  ) {
    return new ERC1155(address, rpc, provider)
  }

  getStableCoinInstance(
    address: string,
    rpc: string = 'https://testnet.edexa.com/rpc',
    provider?: any,
  ) {
    return new StableCoin(address, rpc, provider)
  }

  async resolveENSOrReturnAddress(input: string): Promise<string> {
    try {
      // Check if the input is a valid Ethereum address
      if (ethers.utils.isAddress(input)) {
        return input
      } else {
        // If it's not a valid address, try to resolve it through ENS
        const provider = new ethers.providers.JsonRpcProvider(
          'https://testnet.edexa.com/rpc',
        )
        const ens = new ethers.Contract(
          '0x0cc23341aacFc90B1582d965943d1f10D94638Cf',
          ensAbi,
          provider,
        )

        // Resolve the ENS domain to an Ethereum address
        const detailsObject = await ens.getDomainInfo(input)

        if (detailsObject) {
          if (
            detailsObject.resolver ==
            '0x0000000000000000000000000000000000000000'
          )
            throw new Error(`ENS Not Registered for ${input}`)
          else return detailsObject.resolver
        } else {
          throw new Error(`ENS resolution failed for ${input}`)
        }
      }
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`)
    }
  }
}
