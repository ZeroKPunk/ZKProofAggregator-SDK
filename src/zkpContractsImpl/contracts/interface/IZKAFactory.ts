/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace IZKAFactory {
  export type VerifierMetaStruct = {
    zkpVerifierName: string;
    url: string;
    deployer: AddressLike;
    deployTimestamp: BigNumberish;
  };

  export type VerifierMetaStructOutput = [
    zkpVerifierName: string,
    url: string,
    deployer: string,
    deployTimestamp: bigint
  ] & {
    zkpVerifierName: string;
    url: string;
    deployer: string;
    deployTimestamp: bigint;
  };
}

export interface IZKAFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "computeZKAVerifierAddress"
      | "deployZKAVerifier"
      | "fetchAllZKAVerifiers"
      | "implZKAVerifier"
      | "proofInStorage"
      | "proofToStorage"
      | "setimplZKAVerifier"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "newZKAVerifierInfo" | "proofToStorageInfo"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "computeZKAVerifierAddress",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "deployZKAVerifier",
    values: [string, string, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "fetchAllZKAVerifiers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "implZKAVerifier",
    values?: undefined
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
    functionFragment: "setimplZKAVerifier",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "computeZKAVerifierAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployZKAVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fetchAllZKAVerifiers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "implZKAVerifier",
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
    functionFragment: "setimplZKAVerifier",
    data: BytesLike
  ): Result;
}

export namespace newZKAVerifierInfoEvent {
  export type InputTuple = [
    _zkVerifier: AddressLike,
    _zkpVerifierName: string,
    _url: string,
    _deployer: AddressLike
  ];
  export type OutputTuple = [
    _zkVerifier: string,
    _zkpVerifierName: string,
    _url: string,
    _deployer: string
  ];
  export interface OutputObject {
    _zkVerifier: string;
    _zkpVerifierName: string;
    _url: string;
    _deployer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace proofToStorageInfoEvent {
  export type InputTuple = [_proofKey: BytesLike, _saveTimestamp: BigNumberish];
  export type OutputTuple = [_proofKey: string, _saveTimestamp: bigint];
  export interface OutputObject {
    _proofKey: string;
    _saveTimestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
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

  computeZKAVerifierAddress: TypedContractMethod<
    [_zkpVerifierName: string, _url: string],
    [string],
    "view"
  >;

  deployZKAVerifier: TypedContractMethod<
    [
      _zkpVerifierName: string,
      _url: string,
      _deployer: AddressLike,
      _zkpVerifierAddress: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  fetchAllZKAVerifiers: TypedContractMethod<
    [],
    [
      [string[], IZKAFactory.VerifierMetaStructOutput[]] & {
        allVerifiers: string[];
        allMetas: IZKAFactory.VerifierMetaStructOutput[];
      }
    ],
    "view"
  >;

  implZKAVerifier: TypedContractMethod<[], [string], "view">;

  proofInStorage: TypedContractMethod<[proofKey: BytesLike], [bigint], "view">;

  proofToStorage: TypedContractMethod<
    [proofKey: BytesLike],
    [void],
    "nonpayable"
  >;

  setimplZKAVerifier: TypedContractMethod<
    [_implementation: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "computeZKAVerifierAddress"
  ): TypedContractMethod<
    [_zkpVerifierName: string, _url: string],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "deployZKAVerifier"
  ): TypedContractMethod<
    [
      _zkpVerifierName: string,
      _url: string,
      _deployer: AddressLike,
      _zkpVerifierAddress: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "fetchAllZKAVerifiers"
  ): TypedContractMethod<
    [],
    [
      [string[], IZKAFactory.VerifierMetaStructOutput[]] & {
        allVerifiers: string[];
        allMetas: IZKAFactory.VerifierMetaStructOutput[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "implZKAVerifier"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "proofInStorage"
  ): TypedContractMethod<[proofKey: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "proofToStorage"
  ): TypedContractMethod<[proofKey: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setimplZKAVerifier"
  ): TypedContractMethod<[_implementation: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "newZKAVerifierInfo"
  ): TypedContractEvent<
    newZKAVerifierInfoEvent.InputTuple,
    newZKAVerifierInfoEvent.OutputTuple,
    newZKAVerifierInfoEvent.OutputObject
  >;
  getEvent(
    key: "proofToStorageInfo"
  ): TypedContractEvent<
    proofToStorageInfoEvent.InputTuple,
    proofToStorageInfoEvent.OutputTuple,
    proofToStorageInfoEvent.OutputObject
  >;

  filters: {
    "newZKAVerifierInfo(address,string,string,address)": TypedContractEvent<
      newZKAVerifierInfoEvent.InputTuple,
      newZKAVerifierInfoEvent.OutputTuple,
      newZKAVerifierInfoEvent.OutputObject
    >;
    newZKAVerifierInfo: TypedContractEvent<
      newZKAVerifierInfoEvent.InputTuple,
      newZKAVerifierInfoEvent.OutputTuple,
      newZKAVerifierInfoEvent.OutputObject
    >;

    "proofToStorageInfo(bytes32,uint64)": TypedContractEvent<
      proofToStorageInfoEvent.InputTuple,
      proofToStorageInfoEvent.OutputTuple,
      proofToStorageInfoEvent.OutputObject
    >;
    proofToStorageInfo: TypedContractEvent<
      proofToStorageInfoEvent.InputTuple,
      proofToStorageInfoEvent.OutputTuple,
      proofToStorageInfoEvent.OutputObject
    >;
  };
}