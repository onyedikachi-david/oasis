import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Oasis } from "../target/types/oasis";
import { expect } from "chai";

describe("oasis", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Oasis as Program<Oasis>;

  it("Should set up a new profile", async () => {
    const user = (program.provider as anchor.AnchorProvider).wallet;

    // Set up a new profile with sample data
    const f_name = "John";
    const l_name = "Doe";
    const p_num = "1234567890";
    const location = "NewYork";
    // const user_type = Oasis.UserType.Customer;

    // Create a new user account to act as the signer for the transaction
    // const user = anchor.web3.Keypair.generate();

    // Initialize the Profile account
    const profile = anchor.web3.Keypair.generate();

    // await program.methods.setupAccount()
    await program.methods
      .setupAccount(f_name, l_name, p_num, "New York", { customer: {} })
      .accounts({ profile: profile.publicKey, user: user.publicKey })
      .signers([profile])
      .rpc();

    // Fetch the Profile account and verify the fields
    let profileAccount = await program.account.profile.fetch(profile.publicKey);
    console.log(profileAccount);
    expect(profileAccount.fName).to.eq(f_name);
    expect(profileAccount.lName).to.eq(l_name);
    expect(profileAccount.pNum).to.eq(p_num);
    // expect(profileAccount.location).to.eq(location);
    // expect(profileAccount.userType).to.eq(user_type);
  });
});
