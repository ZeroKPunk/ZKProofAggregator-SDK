/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
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

export interface IZKAFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "deployZKAVerifier"
      | "proofInStorage"
      | "proofToStorage"
      | "verifierSetup"
      | "verifyContractList"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployZKAVerifier",
    values: [string, string, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "proofInStorage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "proofToStorage",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifierSetup",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyContractList",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "deployZKAVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proofInStorage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proofToStorage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifierSetup",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyContractList",
    data: BytesLike
  ): Result;
}

export interface IZKAFactory extends BaseContract {
  connect(runner?: ContractRunner | null): IZKAFactory;
  waitForDeployment(): Promise<this>;

  interface: IZKAFactoryInterface;

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

  deployZKAVerifier: TypedContractMethod<
    [_zkpVerifierName: string, _url: string, _deployer: AddressLike],
    [string],
    "nonpayable"
  >;

  proofInStorage: TypedContractMethod<[proofKey: BytesLike], [bigint], "view">;

  proofToStorage: TypedContractMethod<
    [proofKey: BytesLike],
    [boolean],
    "nonpayable"
  >;

  verifierSetup: TypedContractMethod<
    [_storageContract: AddressLike],
    [void],
    "nonpayable"
  >;

  verifyContractList: TypedContractMethod<[], [string[]], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deployZKAVerifier"
  ): TypedContractMethod<
    [_zkpVerifierName: string, _url: string, _deployer: AddressLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "proofInStorage"
  ): TypedContractMethod<[proofKey: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "proofToStorage"
  ): TypedContractMethod<[proofKey: BytesLike], [boolean], "nonpayable">;
  getFunction(
    nameOrSignature: "verifierSetup"
  ): TypedContractMethod<[_storageContract: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verifyContractList"
  ): TypedContractMethod<[], [string[]], "view">;

  filters: {};
}
