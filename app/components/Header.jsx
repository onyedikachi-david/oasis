import Image from "next/image";
import Link from "next/link";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end sm:flex `,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer  `,
};

// import { Web3Auth } from "@web3auth/modal";

// //Initialize within your constructor
// const web3auth = new Web3Auth({
//   clientId: "YOUR_WEB3AUTH_CLIENT_ID", // Get your Client ID from Web3Auth Dashboard
//   chainConfig: {
//     chainNamespace: "solana",
//     chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
//     rpcTarget: "https://api.devnet.solana.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
//   },
// });

// await web3auth.initModal();

const Header = (address) => {
  return (
    <div className={style.wrapper}>
      <Link href="/">
        <div className={style.logoContainer}>
          <div className={style.logoText}>Oasis</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          placeholder={`connected wallet address: ${address.address}`}
        />
      </div>
      <div className={style.headerItems}>
        <Link href="#">
          <div className={style.headerItem}> Store </div>
        </Link>

        <div className={style.headerIcon}>
          <CgProfile />
        </div>
        {/* <div className={style.headerIcon}> */}
        {/* <MdOutlineAccountBalanceWallet /> */}
        <WalletMultiButton />

        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
