import { Signer } from "ethers";
import { IzkpGlobalState } from "./types";
import { ZKAFactory, ZKAFactory__factory } from "./zkpContractsImpl";

let globalState: IzkpGlobalState = {
  isMainnet: false,
  signer: {} as Signer,
  zkaFactory: {} as ZKAFactory,
};

function setGlobalState(newState: Partial<IzkpGlobalState> = {}) {
  const globalStateKeys = Object.keys(newState);
  if (!!globalStateKeys.length) {
    globalStateKeys.forEach((v) => {
      globalState[v] = newState[v] ?? globalState[v];
    });
  }
}

function setZkaFactory(signer: Signer, zkaFactoryAddress: string) {
  const zkaFactory: ZKAFactory = ZKAFactory__factory.connect(
    zkaFactoryAddress,
    signer
  );
  setGlobalState({ zkaFactory });
}

function getGlobalState(): IzkpGlobalState {
  return globalState;
}

export { setGlobalState, getGlobalState, setZkaFactory };
