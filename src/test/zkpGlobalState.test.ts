import { beforeAll, describe, expect, test } from "vitest";
import { ZkProofAggregator } from "../zkProofAggregator";
import { Wallet, ethers, Signer } from "ethers";
import {
  VerifierMock,
  VerifierMock__factory,
  ZKAFactory,
} from "../typechain-types";
import { sign } from "crypto";
require("dotenv").config("./.env");

function getWallet(privateKey: string, providerUrl: string) {
  return new Wallet(privateKey, new ethers.JsonRpcProvider(providerUrl));
}

describe("zk-globalState tests", () => {
  let zkpproofAggregator: ZkProofAggregator;
  let plonk2MockVerifier: VerifierMock;
  let proofMock: string;

  beforeAll(async () => {
    const privateKey: string = process.env.PRIVATE_KEY || "";
    const providerUrl: string = process.env.DEFAULT_RPC_URL || "";
    if (!privateKey || !providerUrl)
      throw new Error(
        "private key can not be empty, pls add your private to the environment to be able to run the tests"
      );
    const signer: Signer = getWallet(privateKey, providerUrl);
    zkpproofAggregator = ZkProofAggregator.getInstance(signer);

    const zkaFactory: ZKAFactory =
      await zkpproofAggregator.deployAllContractsNeeded(
        zkpproofAggregator.getGlobalState().signer
      );
    console.log("ZKAFactory deploy at: ", await zkaFactory.getAddress());
    console.log("golobalState: ", zkpproofAggregator.getGlobalState());

    plonk2MockVerifier = await new VerifierMock__factory(signer).deploy();
    await plonk2MockVerifier.waitForDeployment();
    proofMock = await plonk2MockVerifier.getVerifyCalldata("for test");
  });

  test("getGlobalState", async () => {
    const globalState = zkpproofAggregator.getGlobalState();
    expect(globalState).toBeDefined();
  });

  test("deployZKAVerifier", async () => {
    const zkpVerifierName = "PLONK2";
    const url = "http://localhost:3000";
    const deployer = zkpproofAggregator.getGlobalState().signer.getAddress();
    const zkpVerifierAddress = await zkpproofAggregator.deployZKAVerifier(
      zkpVerifierName,
      url,
      deployer,
      await plonk2MockVerifier.getAddress()
    );
    console.log("zkpVerifierAddress: ", zkpVerifierAddress);
  });

  test("fetchZKAVerifier", async () => {
    const zkpVerifierAddress = await zkpproofAggregator.fetchVerifiersMeta();
    console.log("zkpVerifierAddress: ", zkpVerifierAddress);
    expect(zkpVerifierAddress).toBeDefined();
  });

  test("testZkpVerify", async () => {
    const currentVerifier = (await zkpproofAggregator.fetchVerifiersMeta())[0]
      .verifierAddress;
    const tx = await zkpproofAggregator.zkpVerify(currentVerifier, proofMock);
    await tx.wait();
  });
});
