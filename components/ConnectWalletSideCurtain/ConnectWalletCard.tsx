import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import Text from "../Text";

export function ConnectWalletCard({
  onWalletClicked,
  name,
  logo,
  prettyName,
  isComingSoon = false,
}: {
  onWalletClicked: (name: string) => () => Promise<void>;
  name: string;
  logo?: string;
  prettyName: string;
  isComingSoon?: boolean;
}) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between py-3 px-6 transition-all duration-300 ease-in-out hover:bg-[#2B2B2BFA]"
      onClick={isComingSoon ? undefined : onWalletClicked(name)}
      style={{
        opacity: isComingSoon ? 0.5 : 1,
      }}
    >
      <div className="flex flex-grow items-center justify-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={logo}
          alt="Logo"
          onError={(e) => {
            e.currentTarget.onerror = null;
          }}
          className="h-10 w-10 rounded-lg"
          style={{
            filter: isComingSoon ? "grayscale(100%)" : undefined,
          }}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-left text-sm font-medium !leading-[20px] text-black-100 dark:text-white-100">
            {prettyName}
          </div>
        </div>
      </div>
      <div className="flex flex-grow" />
      {isComingSoon && (
        <Text
          size="sm"
          color="text-black-100 dark:text-gray-400"
          className="mr-1"
        >
          Coming Soon
        </Text>
      )}
      <div className="material-icons-outlined flex !h-6 !w-6 items-center justify-center p-1 text-gray-500 dark:text-gray-500">
        <FaAngleRight />
      </div>
    </div>
  );
}
