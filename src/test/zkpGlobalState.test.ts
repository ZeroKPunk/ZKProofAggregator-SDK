import { beforeAll, describe, expect, test } from "vitest";
import { ZkProofAggregator } from "../zkProofAggregator";
import { Wallet, ethers, Signer, ContractTransactionResponse } from "ethers";
import {
  VerifierMock,
  VerifierMock__factory,
  ZKAFactory,
} from "../zkpContractsImpl";
import { getWallet } from "./utils";
require("dotenv").config("./.env");

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

    await zkpproofAggregator.deploy();

    const zkaFactory: ZKAFactory = zkpproofAggregator.getConfig().zkaFactory;

    console.log("ZKAFactory deploy at: ", await zkaFactory.getAddress());

    plonk2MockVerifier = await new VerifierMock__factory(signer).deploy();
    await plonk2MockVerifier.waitForDeployment();
    proofMock = await plonk2MockVerifier.getVerifyCalldata("for test");
  });

  test("getGlobalState", async () => {
    const globalState = zkpproofAggregator.getConfig();
    expect(globalState).toBeDefined();
  });

  test("deployZKAVerifier", async () => {
    const zkpVerifierName = "PLONK2";
    const url = "http://localhost:3000";
    const deployer = await zkpproofAggregator.getConfig().signer.getAddress();
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
    const zkpVerifierMeta = await zkpproofAggregator.fetchVerifiersMeta();
    console.log("zkpVerifierMeta: ", zkpVerifierMeta);
    expect(zkpVerifierMeta).toBeDefined();
  });

  test("testZkpVerify", async () => {
    const currentVerifier = (await zkpproofAggregator.fetchVerifiersMeta())[0]
      .verifierAddress;
    const tx = await zkpproofAggregator.zkpVerify(currentVerifier, proofMock);
    const transactionReceipt = await tx.wait();
    const gasUsed = transactionReceipt!.gasUsed;
    console.log("ZkpVerify gasUsed: ", gasUsed);

    const proofStatus = await zkpproofAggregator.checkProofVerifyStatus(
      currentVerifier,
      proofMock
    );
    expect(proofStatus).toBeDefined();
    console.log("proofStatus: ", proofStatus);
  });
});
