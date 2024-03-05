/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IZKAFactory,
  IZKAFactoryInterface,
} from "../../interface/IZKAFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_zkpVerifierName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_url",
        type: "string",
      },
      {
        internalType: "address",
        name: "_deployer",
        type: "address",
      },
    ],
    name: "deployZKAVerifier",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proofKey",
        type: "bytes32",
      },
    ],
    name: "proofInStorage",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proofKey",
        type: "bytes32",
      },
    ],
    name: "proofToStorage",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_storageContract",
        type: "address",
      },
    ],
    name: "verifierSetup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyContractList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IZKAFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IZKAFactoryInterface {
    return new Interface(_abi) as IZKAFactoryInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IZKAFactory {
    return new Contract(address, _abi, runner) as unknown as IZKAFactory;
  }
}
