import { Signer, ContractTransactionResponse } from "ethers";
import { IzkpGlobalState, IVerifierMeta, IspvGlobalState } from "../types";
import {
  getGlobalState,
  getSpvGlobalState,
  setGlobalState,
  setSPV,
  setSpvGlobalState,
  setFactory,
} from "../globalState";
import {
  deployAllContractsNeeded,
  deploySPVAllContractsNeeded,
  deployZKAFactory,
  deployZKAVerifier,
  deployZKProofAggregatorImpl,
} from "../deployment";
import {
  fetchAllZKAVerifiersMeta,
  getProofStatus,
  zkpVerify,
} from "../interact";
import { as } from "vitest/dist/reporters-5f784f42";
export class ZkProofAggregator {
  private static instance: ZkProofAggregator;
  constructor(signer: Signer, zkaFactoryAddres?: string) {
    setGlobalState({ signer });
    if (zkaFactoryAddres) {
      setFactory(signer, zkaFactoryAddres);
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

  connect(signer: Signer) {
    setGlobalState({ signer });
  }

  setFactory(zkaFactoryAddress: string) {
    const { signer } = this.getConfig();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
    setFactory(signer, zkaFactoryAddress);
  }

  async deploy(): Promise<void> {
    const { signer } = this.getConfig();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
    return deployAllContractsNeeded(signer);
  }

  async deployZKProofAggregatorImpl(): Promise<string> {
    const { signer } = this.getConfig();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
    return deployZKProofAggregatorImpl(signer);
  }

  async deployFactory(ZKProofAggregatorImpl: string) {
    const { signer } = this.getConfig();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
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

  async checkProofVerifyStatus(
    ZKAVerifierAddress: string,
    zkProof: string
  ): Promise<BigInt> {
    const { signer } = getGlobalState();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
    return getProofStatus(
      signer,
      getGlobalState().zkaFactory,
      ZKAVerifierAddress,
      zkProof
    );
  }
}

export class SPV {
  private static instance: SPV;
  constructor(signer: Signer, spvAddress?: string) {
    setSpvGlobalState({ signer });
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

  connect(signer: Signer) {
    setSpvGlobalState({ signer });
  }

  getConfig() {
    return getSpvGlobalState();
  }

  setConfig(newState: Partial<IspvGlobalState> = {}) {
    setSpvGlobalState(newState);
  }

  async deploy(spvVerifierAddress: string): Promise<void> {
    const { signer } = this.getConfig();
    return deploySPVAllContractsNeeded(signer, spvVerifierAddress);
  }

  async verify(proof: string): Promise<ContractTransactionResponse> {
    const { signer, spvVerifier } = this.getConfig();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
    if (!spvVerifier) {
      throw new Error("SPVVerifier not found, please deploy it first.");
    }
    return spvVerifier.verify(proof);
  }

  async syncState(mptRoot: string): Promise<ContractTransactionResponse> {
    const { signer, spvVerifier } = this.getConfig();
    if (!signer) {
      throw new Error("Signer not found, please set it first.");
    }
    if (!spvVerifier) {
      throw new Error("SPVVerifier not found, please deploy it first.");
    }
    return spvVerifier.syncState(mptRoot);
  }
}
