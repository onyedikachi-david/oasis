import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { BN } from "@project-serum/anchor";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  getProductAddress,
  getCounterAddress,
  getProfileAddress,
  getProgram,
} from "@/utils/program";
import { confirmTx } from "@/utils/helper";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // States
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // get provider
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const program = useMemo(() => {
    if (connection) {
      return getProgram(connection, wallet ?? "");
    }
  }, [connection, wallet]);

  const initCounter = async () => {
    setError("");
    setSuccess("");
    console.log("Running");
    try {
      const txHash = await program.methods
        .initCounter()
        .accounts({
          counter: counterAddress,
          payer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      await confirmTx(txHash, connection);

      // updateState();
      toast.success("Initialized Master");
    } catch (err) {
      setError(err.message);
      toast.error("Initializing FAILED!");
    }
  };

  const setupAccount = async () => {
    setError("");
    setSuccess("");
    console.log("Running");
  };

  return (
    <AppContext.Provider
      value={{
        connected: wallet?.publicKey ? true : false,
        initCounter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
