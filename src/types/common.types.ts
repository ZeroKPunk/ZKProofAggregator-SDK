import { Signer } from "ethers";
import { ZKAFactory } from "../zkpContractsImpl";
export interface IzkpGlobalState {
  [k: string]: boolean | Signer | ZKAFactory;
  isMainnet: boolean;
  signer: Signer;
  zkaFactory: ZKAFactory;
}

export interface IVerifierMeta {
  verifierAddress: string;
  zkpVerifierName: string;
  url: string;
  deployer: string;
  deployTimestamp: BigInt;
}
