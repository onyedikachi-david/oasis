import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Oasis } from "../target/types/oasis";
import { expect } from "chai";
import { PublicKey } from "@solana/web3.js";
import { it } from "mocha";

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

  it("It should set up a new product", async () => {
    for (let i = 0; i < 5; i++) {
      const name = `Uziza ${i}`;
      const description = `Best vegetable to use with egusi ${i}`;
      const price = new anchor.BN(20);
      const available_quantity = new anchor.BN(2);

      const [ProductPDA, _] = await PublicKey.findProgramAddress(
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
        .accounts({ product: ProductPDA, user: user.publicKey })
        .rpc();
    }

    let newProductAccount = await program.account.product.all();
    console.log(newProductAccount);
    // expect(newProductAccount.name).to.eq(name);
    // expect(newProductAccount.description).to.eq(description);
    // expect(newProductAccount.price === price);
    // expect(newProductAccount.availableQuantity === available_quantity);
  });
});
