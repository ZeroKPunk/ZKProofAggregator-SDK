import { Signer } from "ethers";
import { ZKAFactory, SPVVerifier } from "../zkpContractsImpl";
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

export interface IspvGlobalState {
  [k: string]: boolean | Signer | SPVVerifier;
  isMainnet: boolean;
  signer: Signer;
  spvVerifier: SPVVerifier;
}
