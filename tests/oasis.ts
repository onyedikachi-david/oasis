import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Oasis } from "../target/types/oasis";
import { expect } from "chai";
import { PublicKey } from "@solana/web3.js";
import { it } from "mocha";

let masterAddrr = null;

describe("oasis", () => {
  // Configure the client to use the local cluster.
  // anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  // const user = (program.provider as anchor.AnchorProvider).wallet;

  const program = anchor.workspace.Oasis as Program<Oasis>;
  const user = (program.provider as anchor.AnchorProvider).wallet;

  it("Should set up a new profile", async () => {
    // Set up a new profile with sample data
    const f_name = "John";
    const l_name = "Doe";
    const p_num = "1234567890";
    const location = "New York";

    // Initialize the Profile account
    const profile = anchor.web3.Keypair.generate();

    const [userProfilePDA, _] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("user-profile"),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    // await program.methods.setupAccount()
    await program.methods
      .setupAccount(f_name, l_name, p_num, location, { customer: {} })
      .accounts({ profile: userProfilePDA, user: user.publicKey })
      .rpc();

    // Fetch the Profile account and verify the fields
    let profileAccount = await program.account.profile.fetch(userProfilePDA);
    console.log(profileAccount);
    expect(profileAccount.fName).to.eq(f_name);
    expect(profileAccount.lName).to.eq(l_name);
    expect(profileAccount.pNum).to.eq(p_num);
    expect(profileAccount.location).to.eq(location);
    expect(profileAccount.userType).to.deep.eq({ customer: {} });
  });

  it("It should set up a counter account", async () => {
    const [CounterPDA, _] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("counter")],
      program.programId
    );
    let counterAccount = await program.methods
      .initCounter()
      .accounts({ counter: CounterPDA, payer: user.publicKey })
      .rpc();

    let counterAccountAddr = await program.account.counter.all();
    console.log("counter pda ", CounterPDA);
    console.log("counter address PDA: ", counterAccountAddr);
    // masterAddrr = masterAccountAddr;
  });

  it("It should set up a new product", async () => {
    for (let i = 0; i < 10; i++) {
      // const id = i;
      const name = `Uziza ${i}`;
      const description = `Best vegetable to use with egusi ${i}`;
      const price = new anchor.BN(20);
      const available_quantity = new anchor.BN(2);

      const [ProductPDA, __] = await PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("user-product"),
          Buffer.from(name),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

      // Create a new product

      let newProduct = await program.methods
        .createProduct(name, description, price, available_quantity)
        .accounts({
          // product: ProductPDA,
          // counter: masterAddrr,
          // user: user.publicKey,
        })
        .rpc();
    }

    let newProductAccount = await program.account.product.all();
    console.log(newProductAccount);
    let counterAccountAddr = await program.account.counter.all();
    console.log("master address PDA: ", counterAccountAddr);
    // expect(newProductAccount.name).to.eq(name);
    // expect(newProductAccount.description).to.eq(description);
    // expect(newProductAccount.price === price);
    // expect(newProductAccount.availableQuantity === available_quantity);
  });
});

// import * as anchor from "@project-serum/anchor";
// import { Program } from "@project-serum/anchor";
// import { SolanaRaffles, IDL } from "../target/types/solana_raffles";
// import {
//   airdrop,
//   getAtaForMint,
//   getRawTokenAccount,
//   log,
//   mintNFT,
// } from "./utils";
// import idl from "../target/idl/solana_raffles.json";
// import {
//   ASSOCIATED_TOKEN_PROGRAM_ID,
//   TOKEN_PROGRAM_ID,
// } from "@solana/spl-token";
// import { PublicKey, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";

// const programId = "4ZEPy6oo8oHzbU6bkiY2m8pLb7aNzyzZaMpAZ6CeZQQf";

// describe("solana-raffles", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());
//   const program = new Program<SolanaRaffles>(
//     IDL,
//     new anchor.web3.PublicKey(programId)
//   );

//   let authority = anchor.web3.Keypair.generate();
//   let participant = anchor.web3.Keypair.generate();

//   let tokenMint: PublicKey = null;
//   let participantMintAta: PublicKey = null;

//   before("initialize client", async () => {
//     await airdrop(authority.publicKey, program.provider.connection);
//     await airdrop(participant.publicKey, program.provider.connection);

//     log(
//       `
//     Authority: ${authority.publicKey.toString()}
//     Participant: ${participant.publicKey.toString()}
//     `,
//       "blue"
//     );

//     const token = await mintNFT(
//       program.provider,
//       participant,
//       participant,
//       participant,
//       10000
//     );

//     tokenMint = token.tokenMint;
//     participantMintAta = token.payerAta;
//   });

//   it("create raffle", async () => {
//     let raffle = anchor.web3.Keypair.generate();

//     let ticket_price = new anchor.BN(1000);
//     let ends = new anchor.BN(Date.now() / 1000 + 5); // ends in 5 seconds

//     let title = "Okay Bears Giveaway 🎉";
//     let description = "Giving away 1 okay bears, join our discord to enter.";
//     let image = "https://i.ibb.co/w04Prt6/c1f64245afb2.gif";

//     let winners = 1;

//     const instruction = await program.methods
//       .createRaffle(ticket_price, ends, title, description, image, winners, 0)
//       .accounts({
//         raffle: raffle.publicKey,
//         authority: authority.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//         tokenMint: tokenMint,
//       })
//       .instruction();

//     const transaction = new anchor.web3.Transaction();
//     transaction.add(instruction);

//     const tx = await program.provider.sendAndConfirm(transaction, [
//       authority,
//       raffle,
//     ]);

//     log(
//       `
//     Created Raffle
//     Signature: ${tx}
//     Raffle ID: ${raffle.publicKey.toString()}
//     `,
//       "blue"
//     );
//   });

//   it("purchase ticket", async () => {
//     let ticket = anchor.web3.Keypair.generate();
//     let raffle = (await program.account.raffle.all())[0];

//     const [authAta, _1] = await getAtaForMint(authority.publicKey, tokenMint);
//     const [partAta, _2] = await getAtaForMint(participant.publicKey, tokenMint);

//     const instruction = await program.methods
//       .purchaseTicket()
//       .accounts({
//         raffle: raffle.publicKey,
//         ticket: ticket.publicKey,
//         participant: participant.publicKey,
//         authority: authority.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//         tokenMint: tokenMint,
//         authorityAta: authAta,
//         participantAta: partAta,
//         rent: SYSVAR_RENT_PUBKEY,
//       })
//       .instruction();

//     const transaction = new anchor.web3.Transaction();
//     transaction.add(instruction);

//     const tx = await program.provider.sendAndConfirm(transaction, [
//       ticket,
//       participant,
//     ]);

//     log(
//       `
//     Created Ticket
//     Signature: ${tx}
//     Ticket ID: ${ticket.publicKey.toString()}
//     Participant Balance: ${(
//       await getRawTokenAccount(program.provider, partAta)
//     ).amount.toString()}
//     Manager Balance: ${(
//       await getRawTokenAccount(program.provider, authAta)
//     ).amount.toString()}
//     `,
//       "blue"
//     );
//   });

//   it("delete raffle", async () => {
//     let raffle = (await program.account.raffle.all())[0];
//     let ticket = (await program.account.ticket.all())[0];

//     log(
//       `
//     Winner: ${ticket.account.participant.toString()}
//     Raffle ID: ${raffle.publicKey.toString()}
//     `,
//       "blue"
//     );

//     const instruction = await program.methods
//       .endRaffle()
//       .accounts({
//         raffle: raffle.publicKey,
//         authority: authority.publicKey,
//       })
//       .instruction();

//     const transaction = new anchor.web3.Transaction();
//     transaction.add(instruction);

//     const tx = await program.provider.sendAndConfirm(transaction, [authority]);

//     log(
//       `
//     Deleted Raffle
//     Signature: ${tx}
//     Raffle ID: ${raffle.publicKey.toString()}
//     `,
//       "blue"
//     );
//   });
// });
