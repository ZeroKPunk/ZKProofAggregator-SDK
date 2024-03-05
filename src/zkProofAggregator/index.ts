import { Signer, ContractTransactionResponse } from "ethers";
import { IzkpGlobalState, IVerifierMeta, IspvGlobalState } from "../types";
import {
  getGlobalState,
  getSpvGlobalState,
  setGlobalState,
  setSPV,
  setSpvGlobalState,
  setZkaFactory,
} from "../globalState";
import {
  deployAllContractsNeeded,
  deploySPVVerifier,
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

  getConfig(): IzkpGlobalState {
    return getGlobalState();
  }

  setConfig(newState: Partial<IzkpGlobalState> = {}) {
    setGlobalState(newState);
  }

  setZkaFactory(signer: Signer, zkaFactoryAddress: string) {
    setZkaFactory(signer, zkaFactoryAddress);
  }

  async deployAllContractsNeeded(signer: Signer): Promise<void> {
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
  ): Promise<{
    tx: ContractTransactionResponse;
    computeZKAVerifierAddress: string;
  }> {
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

export class SPV {
  private static instance: SPV;
  constructor(signer: Signer, spvAddress?: string) {
    setGlobalState({ signer });
    if (spvAddress) {
      setSPV(signer, spvAddress);
    }
  }
  public static getInstance(signer: Signer, spvAddress?: string) {
    if (!SPV.instance) {
      SPV.instance = new SPV(signer, spvAddress);
    }
    return SPV.instance;
  }

  getConfig() {
    return getSpvGlobalState();
  }

  setConfig(newState: Partial<IspvGlobalState> = {}) {
    setSpvGlobalState(newState);
  }

  async deploySPVVerifier(
    signer: Signer,
    spvVerifierAddress: string
  ): Promise<ContractTransactionResponse> {
    return deploySPVVerifier(signer, spvVerifierAddress);
  }
}
