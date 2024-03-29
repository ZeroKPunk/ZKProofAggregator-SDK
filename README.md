## Install 
npm i zkproofaggregator-sdk

## Create instance

### 1. Create zkpproofAggregator

create without deployed zkaFactory contract
```
import { ZkProofAggregator } from 'zkproofaggregator-sdk';

const zkpproofAggregator = new ZkProofAggregator(signer);
```
create with zkaFactory contract
```
import { ZkProofAggregator } from 'zkproofaggregator-sdk';

const zkpproofAggregator = new ZkProofAggregator(signer, zkaFactoryAddress);
```

reconnect signer
```
zkpproofAggregator.connect(newSigner);
spv.connect(newSigner);
```

### 2. Create SPV
create without deployed spv contract
```
import { SPV } from 'zkproofaggregator-sdk';

const spv = new SPV(signer);
```
create with spv contract
```
import { SPV } from 'zkproofaggregator-sdk';

const spv = new SPV(signer, spvAddress);
```

## Deploy contracts
in development environment, you can deploy contracts by using the following methods.
```
const zkpproofAggregator = new ZkProofAggregator(signer);
await zkpproofAggregator.deploy();
```

```
const spv = new SPV(signer);
await spv.deploy();
```

you can check all detail in config
```
const zkaSatate = zkpproofAggregator.getConfig();
const spvState = spv.getConfig();
```

after call deploy methods, contracts address has been add to instance.config()

## Verify zkproof in L2
### 1. create custom zkproof verifier
```
const zkpproofAggregator = new ZkProofAggregator(signer, zkaFactoryAddress);
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
```

### 2. fetch zkproof verifier
```
const zkpVerifierAddress = await zkpproofAggregator.fetchVerifiersMeta();
```


### 3. verify zkproof
```
const tx = await zkpproofAggregator.zkpVerify(currentVerifier, proof);
await tx.wait();
```

### 4. check proof verify status
```
const proofStatus = await zkpproofAggregator.checkProofVerifyStatus(
  currentVerifier,
  proofMock
);
```


## verification in L1
```
const spv = new SPV(signer, spvAddress);
const tx = await spv.verify(proofMock);
await tx.wait();
```