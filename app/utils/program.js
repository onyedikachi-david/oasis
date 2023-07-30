import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import IDL from "./idl.json";

import {
  PROGRAM_ID,
  PRODUCT_SEED,
  PROFILE_SEED,
  COUNTER_SEED,
} from "./constants";

// Fetch the program
export const getProgram = (connection, wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  const program = new Program(IDL, PROGRAM_ID, provider);
  return program;
};

export const getCounterAddress = async () => {
  return (
    await PublicKey.findProgramAddress([Buffer.from(COUNTER_SEED)], PROGRAM_ID)
  )[0];
};

export const getProfileAddress = async () => {
  return (
    await PublicKey.findProgramAddress([Buffer.from(PROFILE_SEED)], PROGRAM_ID)
  )[0];
};

export const getProductAddress = async () => {
  return (
    await PublicKey.findProgramAddress([Buffer.from(PRODUCT_SEED)], PROGRAM_ID)
  )[0];
};
