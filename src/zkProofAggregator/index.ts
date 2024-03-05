import { Signer, ContractTransactionResponse } from "ethers";
import { IzkpGlobalState, IVerifierMeta } from "../types";
import { getGlobalState, setGlobalState, setZkaFactory } from "../globalState";
import {
  deployAllContractsNeeded,
  deployZKAFactory,
  deployZKAVerifier,
  deployZKProofAggregatorImpl,
} from "../deployment";
import { fetchAllZKAVerifiersMeta, zkpVerify } from "../interact";
export class ZkProofAggregator {
  private static instance: ZkProofAggregator;
  constructor(signer: Signer, zkaFactoryAddres?: string) {
    setGlobalState({ signer });
    if (zkaFactoryAddres) {
      setZkaFactory(signer, zkaFactoryAddres);
    }
  }

  public static getInstance(signer: Signer, zkaFactoryAddres?: string) {
    if (!ZkProofAggregator.instance) {
      ZkProofAggregator.instance = new ZkProofAggregator(
        signer,
        zkaFactoryAddres
      );
    }
    return ZkProofAggregator.instance;
  }

  getGlobalState(): IzkpGlobalState {
    return getGlobalState();
  }

  setGlobalState(newState: Partial<IzkpGlobalState> = {}) {
    setGlobalState(newState);
  }

  setZkaFactory(signer: Signer, zkaFactoryAddress: string) {
    setZkaFactory(signer, zkaFactoryAddress);
  }

  async deployAllContractsNeeded(signer: Signer) {
    return deployAllContractsNeeded(signer);
  }

  async deployZKProofAggregatorImpl(signer: Signer): Promise<string> {
    return deployZKProofAggregatorImpl(signer);
  }

  async deployFactory(signer: Signer, ZKProofAggregatorImpl: string) {
    if (!ZKProofAggregatorImpl || ZKProofAggregatorImpl === "") {
      throw new Error(
        "ZKProofAggregatorImpl not found, please deploy it first."
      );
    }
    return deployZKAFactory(signer, ZKProofAggregatorImpl);
  }

  async deployZKAVerifier(
    zkpVerifierName: string,
    url: string,
    deployer: string,
    zkpVerifierAddress: string
  ): Promise<string> {
    const { zkaFactory } = getGlobalState();
    if (!zkaFactory) {
      throw new Error("ZKAFactory not found, please deploy it first.");
    }
    return deployZKAVerifier(
      zkaFactory,
      zkpVerifierName,
      url,
      deployer,
      zkpVerifierAddress
    );
  }

  async fetchVerifiersMeta(): Promise<IVerifierMeta[]> {
    const { zkaFactory } = getGlobalState();
    if (!zkaFactory) {
      throw new Error("ZKAFactory not found, please deploy it first.");
    }
    return fetchAllZKAVerifiersMeta(zkaFactory);
  }

  async zkpVerify(
    ZKAVerifierAddress: string,
    zkProof: string
  ): Promise<ContractTransactionResponse> {
    const { signer } = getGlobalState();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
    return zkpVerify(signer, ZKAVerifierAddress, zkProof);
  }
}
