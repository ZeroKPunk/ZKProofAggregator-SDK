/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface IZKAVerifierInterface extends Interface {
  getFunction(
    nameOrSignature: "ZKAFactory" | "ZKVerifier" | "zkpVerify"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ZKAFactory",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ZKVerifier",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "zkpVerify",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "ZKAFactory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ZKVerifier", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "zkpVerify", data: BytesLike): Result;
}

export interface IZKAVerifier extends BaseContract {
  connect(runner?: ContractRunner | null): IZKAVerifier;
  waitForDeployment(): Promise<this>;

  interface: IZKAVerifierInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  ZKAFactory: TypedContractMethod<[], [string], "view">;

  ZKVerifier: TypedContractMethod<[], [string], "view">;

  zkpVerify: TypedContractMethod<[zkProof: BytesLike], [boolean], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "ZKAFactory"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ZKVerifier"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "zkpVerify"
  ): TypedContractMethod<[zkProof: BytesLike], [boolean], "nonpayable">;

  filters: {};
}
