import { type WalletClient } from "@leapwallet/elements"; // Import WalletClient
import { useWalletClient } from "@cosmos-kit/react";
import { useMemo } from "react";
import Long from "long";


export const useElementsWalletClient = (): WalletClient => {
  const { client } = useWalletClient();

  const walletClient: WalletClient = useMemo(() => {
    if (!client) return {} as WalletClient;

    return {
      enable: async (chainIds: string | string[]) => {
        return client?.enable!(chainIds);
      },
      getAccount: async (chainId: string) => {
        await client?.enable!(chainId);
        const result = await client!.getAccount!(chainId);
        return {
          bech32Address: result.address,
          pubKey: result.pubkey,
          isNanoLedger: !!result.isNanoLedger,
        };
      },
      getSigner: async (chainId: string) => {
        const signer = await client?.getOfflineSignerDirect!(chainId);
        const aminoSigner = await client!.getOfflineSignerAmino!(chainId);

        return {
          signDirect: async (signerAddress: string, signDoc: any) => {
            const result = await signer?.signDirect(signerAddress, signDoc);
            return {
              signature: new Uint8Array(
                Buffer.from(result?.signature?.signature ?? "", "base64")
              ),
              signed: {
                ...result?.signed,
                accountNumber: Long.fromValue(result?.signed?.accountNumber) as Long.Long, // Explicitly cast to Long.Long
              },
            };
          },
          signAmino: async (address: string, signDoc: any) => {
            const res = await aminoSigner.signAmino(address, signDoc);
            return {
              signature: new Uint8Array(
                Buffer.from(res.signature.signature, "base64")
              ),
              signed: res.signed,
            };
          },
        };
      },
    };
  }, [client]);

  return walletClient;
};
