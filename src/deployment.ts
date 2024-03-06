import { setGlobalState, setSpvGlobalState } from "./globalState";
import {
  ZKAVerifier,
  ZKAVerifier__factory,
  ZKAFactory,
  ZKAFactory__factory,
  SPVVerifier,
  SPVVerifier__factory,
} from "./zkpContractsImpl";
import { Signer, ContractTransactionResponse } from "ethers";

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

export async function deployAllContractsNeeded(signer: Signer): Promise<void> {
  const ZKProofAggregatorImplAddress = await deployZKProofAggregatorImpl(
    signer
  );
  const zkaFactory = await deployZKAFactory(
    signer,
    ZKProofAggregatorImplAddress
  );
  setGlobalState({ zkaFactory });
}

export async function deployZKAVerifier(
  zkaFactory: ZKAFactory,
  zkpVerifierName: string,
  url: string,
  deployer: string,
  zkpVerifierAddress: string
): Promise<{
  tx: ContractTransactionResponse;
  computeZKAVerifierAddress: string;
}> {
  return {
    tx: await zkaFactory.deployZKAVerifier(
      zkpVerifierName,
      url,
      deployer,
      zkpVerifierAddress
    ),
    computeZKAVerifierAddress: await zkaFactory.computeZKAVerifierAddress(
      zkpVerifierName,
      url
    ),
  };
}

export async function deploySPVAllContractsNeeded(
  signer: Signer,
  spvVerifierAddress: string
): Promise<void> {
  const spvVerifier = await new SPVVerifier__factory(signer).deploy();
  await spvVerifier.waitForDeployment();
  setSpvGlobalState({ spvVerifier });
  const tx = await spvVerifier.setVerifier(spvVerifierAddress);
  await tx.wait();
}
