import { beforeAll, describe, expect, test } from "vitest";
import { ZkProofAggregator } from "../zkProofAggregator";
import { Wallet, ethers, Signer } from "ethers";
import {
  VerifierMock,
  VerifierMock__factory,
  ZKAFactory,
} from "../zkpContractsImpl";
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

    await zkpproofAggregator.deployAllContractsNeeded(
      zkpproofAggregator.getGlobalState().signer
    );

    const zkaFactory: ZKAFactory =
      zkpproofAggregator.getGlobalState().zkaFactory;

    console.log("ZKAFactory deploy at: ", await zkaFactory.getAddress());

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
    const { tx, computeZKAVerifierAddress } =
      await zkpproofAggregator.deployZKAVerifier(
        zkpVerifierName,
        url,
        deployer,
        await plonk2MockVerifier.getAddress()
      );
    await tx.wait();
    console.log("zkpVerifierAddress: ", computeZKAVerifierAddress);
  });

  test("fetchZKAVerifier", async () => {
    const zkpVerifierAddress = await zkpproofAggregator.fetchVerifiersMeta();
    console.log("zkpVerifierMeta: ", zkpVerifierAddress);
    expect(zkpVerifierAddress).toBeDefined();
  });

  test("testZkpVerify", async () => {
    const currentVerifier = (await zkpproofAggregator.fetchVerifiersMeta())[0]
      .verifierAddress;
    const tx = await zkpproofAggregator.zkpVerify(currentVerifier, proofMock);
    await tx.wait();
  });
});
