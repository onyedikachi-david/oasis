import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { AppProvider } from "@/context/context";
require("@solana/wallet-adapter-react-ui/styles.css");

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  return (
    <>
      <Header />

      <Hero />
    </>
  );
}
