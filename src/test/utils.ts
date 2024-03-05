import { Wallet, ethers } from "ethers";

export function getWallet(privateKey: string, providerUrl: string) {
  return new Wallet(privateKey, new ethers.JsonRpcProvider(providerUrl));
}
