/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  ZKAVerifierLib,
  ZKAVerifierLibInterface,
} from "../../library/ZKAVerifierLib";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "proof",
        type: "bytes",
      },
    ],
    name: "fetchProofKey",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x61018061003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c8063eb8e38eb1461003a575b600080fd5b61004d610048366004610094565b61005f565b60405190815260200160405180910390f35b600082823060405160200161007693929190610106565b60405160208183030381529060405280519060200120905092915050565b600080602083850312156100a757600080fd5b823567ffffffffffffffff808211156100bf57600080fd5b818501915085601f8301126100d357600080fd5b8135818111156100e257600080fd5b8660208285010111156100f457600080fd5b60209290920196919550909350505050565b6040815282604082015282846060830137600060608483010152600060607fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f860116830101905073ffffffffffffffffffffffffffffffffffffffff8316602083015294935050505056fea164736f6c6343000817000a";

type ZKAVerifierLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZKAVerifierLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZKAVerifierLib__factory extends ContractFactory {
  constructor(...args: ZKAVerifierLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      ZKAVerifierLib & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ZKAVerifierLib__factory {
    return super.connect(runner) as ZKAVerifierLib__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZKAVerifierLibInterface {
    return new Interface(_abi) as ZKAVerifierLibInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ZKAVerifierLib {
    return new Contract(address, _abi, runner) as unknown as ZKAVerifierLib;
  }
}
