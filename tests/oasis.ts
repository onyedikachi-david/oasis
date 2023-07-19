import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Oasis } from "../target/types/oasis";
import { expect } from "chai";
import { PublicKey } from "@solana/web3.js";

describe("oasis", () => {
  // Configure the client to use the local cluster.
  // anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();

  const program = anchor.workspace.Oasis as Program<Oasis>;

  it("Should set up a new profile", async () => {
    const user = (program.provider as anchor.AnchorProvider).wallet;

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
});
