import { Signer } from "ethers";
import { IzkpGlobalState, IspvGlobalState } from "./types";
import {
  ZKAFactory,
  ZKAFactory__factory,
  SPVVerifier,
  SPVVerifier__factory,
} from "./zkpContractsImpl";

let globalState: IzkpGlobalState = {
  isMainnet: false,
  signer: {} as Signer,
  zkaFactory: {} as ZKAFactory,
};

let spvGlobalState: IspvGlobalState = {
  isMainnet: false,
  signer: {} as Signer,
  spvVerifier: {} as SPVVerifier,
};

function setGlobalState(newState: Partial<IzkpGlobalState> = {}) {
  const globalStateKeys = Object.keys(newState);
  if (!!globalStateKeys.length) {
    globalStateKeys.forEach((v) => {
      globalState[v] = newState[v] ?? globalState[v];
    });
  }
}

function setFactory(signer: Signer, zkaFactoryAddress: string) {
  const zkaFactory: ZKAFactory = ZKAFactory__factory.connect(
    zkaFactoryAddress,
    signer
  );
  setGlobalState({ zkaFactory });
}

function getGlobalState(): IzkpGlobalState {
  return globalState;
}

function setSpvGlobalState(newState: Partial<IspvGlobalState> = {}) {
  const spvGlobalStateKeys = Object.keys(newState);
  if (!!spvGlobalStateKeys.length) {
    spvGlobalStateKeys.forEach((v) => {
      spvGlobalState[v] = newState[v] ?? spvGlobalState[v];
    });
  }
}

function setSPV(signer: Signer, spvVerifierAddress: string) {
  const spvVerifier: SPVVerifier = SPVVerifier__factory.connect(
    spvVerifierAddress,
    signer
  );
  setSpvGlobalState({ spvVerifier });
}

function getSpvGlobalState(): IspvGlobalState {
  return spvGlobalState;
}

export {
  setGlobalState,
  getGlobalState,
  setFactory,
  setSpvGlobalState,
  getSpvGlobalState,
  setSPV,
};
