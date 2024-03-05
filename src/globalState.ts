import { Signer } from "ethers";
import { IzkpGlobalState } from "./types";
import {
  ZKAVerifier,
  ZKAVerifier__factory,
  ZKAFactory,
  ZKAFactory__factory,
} from "./typechain-types";

// let globalState: IGlobalState = {
//   isMainnet: true,
//   dealerId: "",
//   activeSignerType: SIGNER_TYPES.EVM,
//   evmSigner: {} as Signer,
//   starknetSigner: {} as Account,
//   loopringSigner: {} as Web3,
// };

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
