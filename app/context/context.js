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
  const [counterAddress, setCounterAddress] = useState();
  const [profileDetails, setProfileDetails] = useState();
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

  useEffect(() => {
    updateState();
  }, [program, profileDetails]);

  const updateState = async () => {
    if (!program) return;

    console.log("program", program);

    try {
      // if (!counterAddress) {
      //   const counterAddress = await getCounterAddress();
      //   initCounter();
      //   setCounterAddress(counterAddress);
      // }

      if (!profileDetails) {
        // fetch profile address if any
        const fetchedProfileAddress = await program.account.profile.fetch(
          await getProfileAddress(wallet)
        );
        console.log("Fetched profile address", fetchedProfileAddress);
        fetchedProfileAddress
          ? (setProfileDetails(fetchedProfileAddress), setInitialized(true))
          : (setProfileDetails(), setInitialized(false));
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const setupAccount = async (value) => {
    setError("");
    setSuccess("");
    console.log("Working on it bro...");
    try {
      // const customer = {}; // Create an empty customer object
      // customer.customer_type = value.customer_type; // Assign the customer_type value to the customer object
      console.log(value);
      console.log(program);
      console.log(wallet.publicKey);
      console.log(SystemProgram.programId);
      const txHash = await program.methods
        .setupAccount(value.f_name, value.l_name, value.p_num, value.location, {
          customer: {},
        })
        .accounts({
          profile: await getProfileAddress(wallet),
          user: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      await confirmTx(txHash, connection);
      updateState();
      toast.success("Account profile setup successful");
    } catch (err) {
      console.log("An error occurred", err);
      toast.error("Setup account profile failed.");
    }
  };

  const initCounter = async () => {
    setError("");
    setSuccess("");
    console.log("Running");
    try {
      const txHash = await program.methods
        .initCounter()
        .accounts({
          counter: await getCounterAddress(),
          payer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      await confirmTx(txHash, connection);

      // updateState();
      toast.success("Initialized Master");
    } catch (err) {
      console.log(err);
      setError(err.message);
      toast.error("Initializing FAILED!");
    }
  };

  const createProduct = async (value) => {
    setError("");
    setSuccess("");
    console.log("Running");
    console.log(value);
    try {
      const txHash = await program.methods
        .createProduct(
          value.name,
          value.description,
          new BN(value.price),
          new BN(value.available_quantity)
        )
        .accounts({
          product: await getProductAddress(),
          counter: counterAddress,
          user: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      await confirmTx(txHash, connection);
      toast.success("Product created");
    } catch (err) {
      console.log("An error occurred", err);
      setError(err.message);
      toast.error("Creating product FAILED!");
    }
  };

  return (
    <AppContext.Provider
      value={{
        connected: wallet?.publicKey ? true : false,
        initCounter,
        setupAccount,
        profileDetails,
        initialized,
        error,
        success,
        createProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
