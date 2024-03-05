import { beforeAll, describe, expect, test } from "vitest";
import { ZkProofAggregator } from "../zkProofAggregator";
import { Wallet, ethers, Signer, keccak256 } from "ethers";
import { VerifierMock } from "../zkpContractsImpl";
import { getWallet } from "./utils";
require("dotenv").config("./.env");

describe.skip("zk-globalState-change tests", () => {
  let zkpproofAggregator: ZkProofAggregator;
  let plonk2MockVerifier: VerifierMock;
  let proofMock: string;

  beforeAll(async () => {
    const privateKey: string = keccak256(ethers.randomBytes(32));
    const providerUrl: string = process.env.DEFAULT_RPC_URL || "";
    if (!privateKey || !providerUrl)
      throw new Error(
        "private key can not be empty, pls add your private to the environment to be able to run the tests"
      );
    const signer: Signer = getWallet(privateKey, providerUrl);
    zkpproofAggregator = ZkProofAggregator.getInstance(signer);
  });

  test("getGlobalState", async () => {
    const globalState = zkpproofAggregator.getConfig();
    expect(globalState).toBeDefined();
    console.log("globalState", globalState);
  });

  test("changeState", async () => {
    const privateKey: string = process.env.PRIVATE_KEY || "";
    const providerUrl: string = process.env.DEFAULT_RPC_URL || "";

    if (!privateKey || !providerUrl)
      throw new Error(
        "private key can not be empty, pls add your private to the environment to be able to run the tests"
      );
    const signer: Signer = getWallet(privateKey, providerUrl);
    zkpproofAggregator.setConfig({ signer });
    const globalState = zkpproofAggregator.getConfig();
    expect(globalState).toBeDefined();
    console.log("globalState", globalState);
  });
});
