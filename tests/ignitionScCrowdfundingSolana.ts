import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { PublicKey } from "@solana/web3.js";
import { BN } from "bn.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { IgnitionScCrowdfundingSolana } from "../target/types/ignition_sc_crowdfunding_solana";

describe("ignitionScCrowdfundingSolana", () => {
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();

  const connection = provider.connection;

  anchor.setProvider(provider);

  const program = anchor.workspace.IgnitionScCrowdfundingSolana as Program<IgnitionScCrowdfundingSolana>;

  const owner = provider.wallet as NodeWallet;

  const idoMint = new PublicKey("5cqHeHKhuGF35qJHvS4RRpnwCz364Ji6KNWXa1isb8in");
  const purchaseMint = new PublicKey("AwgvRPnv9Q5VkTQoPuEdRf4tGpBctffCMJnAYdz9MVXP");
  const decimals = 9;

  const user1 = anchor.web3.Keypair.generate();

  it("Create Pool!", async () => {
    // Add your test here.
    const maxPurchaseForKycUser = new BN(100 * 10 ** decimals);
    const maxPurchaseForNotKycuser = new BN(10 * 10 ** decimals);
    const tokenFee = new BN(0);
    const galaxyFee = new BN(0);
    const crowdFee = new BN(0);
    const galaxyProportion = new BN(5000);
    const earlyProportion = new BN(5000);
    const totalRaiseAmount = new BN(100 * 10 ** decimals);
    const whaleOpen = new BN(Math.floor(Date.now() / 1000));
    const whaleClose = new BN(10);
    const communtiyClose = new BN(10);
    const rate = new BN(1);
    const currencyDecimals = new BN(9);

    const [poolStorage, bump] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('pool_storage'),
        idoMint.toBuffer(),
        purchaseMint.toBuffer(),
        owner.publicKey.toBuffer()
      ],
      program.programId
    );

    const tgeDate = new BN(Math.floor(Date.now() / 1000) + 30);
    const tgePercentage = new BN(100);
    const vestingCliff = tgeDate.add(new BN(1));
    const vestingFrequency = new BN(0);
    const numberOfVesting = new BN(2);
    const [vestingStorageAccount, vesting_bump] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('vesting_storage'),
        idoMint.toBuffer(),
        purchaseMint.toBuffer(),
        owner.publicKey.toBuffer()
      ],
      program.programId
    );

    const tx = await program.methods.createPool(
      [
        maxPurchaseForKycUser,
        maxPurchaseForNotKycuser,
        tokenFee,
        galaxyFee,
        crowdFee,
        galaxyProportion,
        earlyProportion,
        totalRaiseAmount,
        whaleOpen,
        whaleClose,
        communtiyClose,
        rate,
        currencyDecimals,
        tgeDate,
        tgePercentage,
        vestingCliff,
        vestingFrequency,
        numberOfVesting
      ],
      bump,
      vesting_bump
    )
    .accounts({
      purchaseMint,
      idoMint,
    }).rpc();
  });

  it ("Update Time", async () => {
    const whaleCloseTime = new BN(Math.floor(Date.now() / 1000) + 12);
    const communityCloseTime = new BN(Math.floor(Date.now() / 1000) + 12);
    const [poolStorageAccount, bump] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('pool_storage'),
        idoMint.toBuffer(),
        purchaseMint.toBuffer(),
        owner.publicKey.toBuffer()
      ],
      program.programId
    );
    const [vestingStorageAccount, vesting_bump] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('vesting_storage'),
        idoMint.toBuffer(),
        purchaseMint.toBuffer(),
        owner.publicKey.toBuffer()
      ],
      program.programId
    );
    const tx = await program.methods.updateTime(
      whaleCloseTime,
      communityCloseTime
    ).accounts({
      poolStorageAccount,
      vestingStorageAccount
    }).rpc();
  });
  
  // it ("Fund IDO Token", async () => {
  //   const amount = new BN(100 * 10 ** 9);
  //   const [vestingStorage, _] = PublicKey.findProgramAddressSync(
  //     [
  //       anchor.utils.bytes.utf8.encode('vesting_storage'),
  //       owner.publicKey.toBuffer()
  //     ],
  //     program.programId
  //   );
  //   const [vault, bump] = PublicKey.findProgramAddressSync(
  //     [
  //       vestingStorage.toBuffer(),
  //       idoMint.toBuffer()
  //     ],
  //     program.programId
  //   );

  //   const userToken = await getOrCreateAssociatedTokenAccount(
  //     connection,
  //     owner.payer,
  //     idoMint,
  //     owner.publicKey
  //   )
  //   const tx = await program.methods.fundIdoToken(
  //     amount,
  //     bump
  //   ).accounts({
  //     idoMint,
  //     userToken: userToken.address
  //   }).rpc();
  //   console.log("Your transaction signature", tx);
  // });
  // it ("Buy Token", async () => {
  //   const amount = new BN(100 * 10 ** 9);

  //   const userPurchaseToken = await getOrCreateAssociatedTokenAccount(
  //     connection,
  //     owner.payer,
  //     purchaseMint,
  //     owner.publicKey
  //   );

  //   const [vestingStorageAccount, _] = PublicKey.findProgramAddressSync(
  //     [
  //       anchor.utils.bytes.utf8.encode('vesting_storage'),
  //       owner.publicKey.toBuffer()
  //     ],
  //     program.programId
  //   );

  //   const [poolStorageAccount, bump] = PublicKey.findProgramAddressSync(
  //     [
  //       anchor.utils.bytes.utf8.encode('pool_storage'),
  //       owner.publicKey.toBuffer()
  //     ],
  //     program.programId
  //   );

  //   const [purchaseVault, purchaseBump] = PublicKey.findProgramAddressSync(
  //     [
  //       poolStorageAccount.toBuffer(),
  //       owner.publicKey.toBuffer()
  //     ],
  //     program.programId
  //   );

  //   const tx = await program.methods.buyToken(
  //     amount,
  //     purchaseBump
  //   ).accounts({
  //     purchaseMint,
  //     idoMint,
  //     userPurchaseToken: userPurchaseToken.address,
  //     vestingStorageAccount,
  //     poolStorageAccount
  //   }).rpc();
  //   console.log("Your transaction signature", tx);
  //   const vesting = await program.account.userVestingAccount.all();
  //   const vestingData = {
  //     publicKey: vesting[0].publicKey.toBase58(),
  //     totalAmount: vesting[0].account.totalAmount.toString(),
  //     claimedAmount: vesting[0].account.claimedAmount.toString()
  //   }
  //   console.table(vestingData);
  // });
});
