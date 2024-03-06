import { beforeAll, describe, expect, test } from "vitest";
import { ZkProofAggregator, SPV } from "../zkProofAggregator";
import { Wallet, ethers, Signer, keccak256 } from "ethers";
import {
  SPVVerifier,
  SPVVerifier__factory,
  VerifierMock,
  VerifierMock__factory,
} from "../zkpContractsImpl";
import { getWallet } from "./utils";
import { deployZKAFactory, deployZKProofAggregatorImpl } from "../deployment";
require("dotenv").config("./.env");

describe("spv state tests", () => {
  let spv: SPV;
  let verifierMock: VerifierMock;
  let proofMock: string;

  beforeAll(async () => {
    const privateKey: string = process.env.PRIVATE_KEY || "";
    const providerUrl: string = process.env.DEFAULT_RPC_URL || "";
    if (!privateKey || !providerUrl) {
      throw new Error(
        "private key can not be empty, pls add your private to the environment to be able to run the tests"
      );
    }
    const signer: Signer = getWallet(privateKey, providerUrl);
    spv = new SPV(signer);
    verifierMock = await new VerifierMock__factory(signer).deploy();
    await verifierMock.waitForDeployment();
    await spv.deploy(await verifierMock.getAddress());
  });

  test("getGlobalState", async () => {
    const globalState = spv.getConfig();
    expect(globalState.spvVerifier).toBeDefined();
  });

  test("test verify", async () => {
    const spvMockVerifier = await new VerifierMock__factory(
      spv.getConfig().signer
    ).deploy();
    await spvMockVerifier.waitForDeployment();
    proofMock = await spvMockVerifier.getVerifyCalldata("for test");
    const tx = await spv.verify(proofMock);
    await tx.wait();
  });

  test("test sync state", async () => {
    const mockState = keccak256(ethers.randomBytes(32));
    const tx = await spv.syncState(mockState);
    await tx.wait();
  });
});
