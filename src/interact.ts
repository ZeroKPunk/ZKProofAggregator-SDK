import {
  ZKAVerifier,
  ZKAVerifier__factory,
  ZKAFactory,
  ZKAFactory__factory,
} from "./typechain-types";

import { Signer } from "ethers";
import { IVerifierMeta } from "./types";

export async function fetchAllZKAVerifiersMeta(
  zkaFactory: ZKAFactory
): Promise<IVerifierMeta[]> {
  let verifierMetas: IVerifierMeta[] = [];
  const { allVerifiers, allMetas } = await zkaFactory.fetchAllZKAVerifiers();
  for (let i = 0; i < allVerifiers.length; i++) {
    verifierMetas.push({
      verifierAddress: allVerifiers[i],
      zkpVerifierName: allMetas[i].zkpVerifierName,
      url: allMetas[i].url,
      deployer: allMetas[i].deployer,
      deployTimestamp: allMetas[i].deployTimestamp,
    });
  }
  return verifierMetas;
}

export async function zkpVerify(
  signer: Signer,
  ZKAVerifierAddress: string,
  zkProof: string
): Promise<{
  verifyResult: boolean;
  proofKey: string;
}> {
  let verifyResult: boolean = true;
  let proofKey: string = "";
  const zkaVerifier: ZKAVerifier = ZKAVerifier__factory.connect(
    ZKAVerifierAddress,
    signer
  );

  try {
    const tx = await zkaVerifier.zkpVerify(zkProof);
    await tx.wait();
  } catch (error) {
    console.log("error: ", error);
    verifyResult = false;
  }

  try {
    proofKey = await zkaVerifier.fetchProofKey(zkProof);
  } catch (error) {
    console.log("error: ", error);
  }

  return {
    verifyResult,
    proofKey: proofKey,
  };
}
