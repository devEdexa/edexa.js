export type erc20ArgType = {
  name: string
  symbol: string
  supply?: number | undefined
}
export type stableCoinArgType = {
  name: string
  symbol: string
  supply: number
}

export type erc721ArgType = {
  name: string
  symbol: string
}

export type erc1155ArgType = {
  uri: string
}
