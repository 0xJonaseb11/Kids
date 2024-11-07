import WalletIcon from "../public/account_balance_wallet.svg";
import { useChain } from "@cosmos-kit/react";
import { sliceAddress } from "../config/formatAddress";
import Image from "next/image";
import Text from "./Text";
import { useQuery } from "@chakra-ui/media-query";
import { useEffect, useState } from "react";
import { formatNumber, fromSmall } from "../config/mathutils";
import { IoMdCloseCircle } from "react-icons/io";

interface WalletButtonOptions { 
  balance?: string | null, openEmbeddedWalletModal: Function 
}

export function WalletButton({ balance, openEmbeddedWalletModal }: WalletButtonOptions) {
  const { openView, status, address, chain, disconnect } = useChain("stargaze");
  console.log(address) // leave it for debugging
  let text = "Connect Wallet";
  if (status === "Connected") {
    text = sliceAddress(address ?? "");
  } else if (status === "Connecting") {
    text = "Connecting...";
  }

  return (
    <div className="flex items-center gap-2 h-10 justify-between border bg-white-100 border-white-100 rounded-3xl px-5 py-2">
      <button
        onClick={() => { 
          if(status === 'Connected') { 
            openEmbeddedWalletModal();
          }
          else {
            openView();
          }
          
      }}
        disabled={status === "Connecting"}
        className="flex items-center gap-2 justify-between "
        
      >
        <Image
          color="#000"
          src={WalletIcon}
          alt="wallet"
          style={{
            filter: "invert(1)",
          }}
          height={16}
          width={16}
        />
        <div className="flex flex-col items-center gap-0 justify-center">
          {status === "Connected" && (
            <Text
              size="sm"
              color="text-black-100 font-bold"
              className="m-0 p-0"
            >
              {formatNumber(fromSmall(balance ?? "0").decimalPlaces(3))} STARS
            </Text>
          )}
          <Text
            size={status === "Connected" ? "xs" : "sm"}
            color={
              status === "Connected"
                ? "text-black-100 "
                : "text-black-100 font-bold"
            }
            className={status === "Connected" ? "mt-[-6px] p-0" : "mt-0 p-0"}
          >
            {text}
          </Text>
        </div>
      </button>
      {status === "Connected" && (
        <button onClick={() => disconnect()}>
          <span title="Disconnect Wallet">
            <IoMdCloseCircle size={16} title="Disconnect Wallet" />
          </span>
        </button>
      )}
    </div>
  );
}
