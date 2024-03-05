import { setGlobalState } from "./globalState";
import {
  ZKAVerifier,
  ZKAVerifier__factory,
  ZKAFactory,
  ZKAFactory__factory,
} from "./typechain-types";
import { Signer } from "ethers";

export async function deployZKProofAggregatorImpl(
  signer: Signer
): Promise<string> {
  const zkpVerifier = await new ZKAVerifier__factory(signer).deploy();
  const zkpVerifierAddress = await zkpVerifier.getAddress();
  await zkpVerifier.waitForDeployment();
  return zkpVerifierAddress;
}

export async function deployZKAFactory(
  signer: Signer,
  ZKProofAggregatorImpl: string
): Promise<ZKAFactory> {
  const zkaFactory = await new ZKAFactory__factory(signer).deploy();
  await zkaFactory.waitForDeployment();
  const tx = await zkaFactory.setimplZKAVerifier(ZKProofAggregatorImpl);
  await tx.wait();
  return zkaFactory;
}

export async function deployAllContractsNeeded(
  signer: Signer
): Promise<ZKAFactory> {
  const ZKProofAggregatorImplAddress = await deployZKProofAggregatorImpl(
    signer
  );
  const zkaFactory = await deployZKAFactory(
    signer,
    ZKProofAggregatorImplAddress
  );
  setGlobalState({ zkaFactory });
  return zkaFactory;
}

export async function deployZKAVerifier(
  zkaFactory: ZKAFactory,
  zkpVerifierName: string,
  url: string,
  deployer: string,
  zkpVerifierAddress: string
): Promise<string> {
  let newZKAVerifier: string = "";
  // const filter = zkaFactory.filters.newZKAVerifierInfo;
  try {
    const tx = await zkaFactory.deployZKAVerifier(
      zkpVerifierName,
      url,
      deployer,
      zkpVerifierAddress
    );
    await tx.wait();
    newZKAVerifier = await zkaFactory.computeZKAVerifierAddress(
      zkpVerifierName,
      url
    );
  } catch (error) {
    console.log("error", error);
  }
  // const events = await zkaFactory.queryFilter(filter);
  // newZKAVerifier = events[0].args?._zkVerifier;
  // zkaFactory.off(filter);
  return newZKAVerifier;
}
