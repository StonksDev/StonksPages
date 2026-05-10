'use client';

import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import dynamic from 'next/dynamic';
import { clusterApiUrl } from '@solana/web3.js';
import { detectNetworkFromRpcUrl, validateNetworkConfiguration } from '@/lib/network-detection';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

// Dynamically import WalletModalProvider to avoid SSR issues
const WalletModalProviderDynamic = dynamic(
    async () => {
        const { WalletModalProvider } = await import('@solana/wallet-adapter-react-ui');
        return WalletModalProvider;
    },
    { ssr: false }
);

interface WalletContextProviderProps {
    children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
    // Get RPC URL from environment
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

    // Automatically detect network from RPC URL
    const network = useMemo(() => {
        const detected = detectNetworkFromRpcUrl(rpcUrl);

        // Validate in development mode
        if (process.env.NODE_ENV === 'development' && rpcUrl) {
            validateNetworkConfiguration(rpcUrl, detected);
        }

        return detected;
    }, [rpcUrl]);

    // Use custom RPC URL from environment variable if available, otherwise use default cluster API URL
    const endpoint = useMemo(() => {
        if (rpcUrl) {
            return rpcUrl;
        }
        return clusterApiUrl(network);
    }, [rpcUrl, network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of the following standards:
             * - Solana Mobile Stack Mobile Wallet Adapter (stonks edition)
             *   (https://github.com/solana-mobile/mobile-wallet-adapter)
             * - Solana Wallet Standard
             *   (https://github.com/solana-labs/wallet-standard)
             *
             * Most modern wallets support the Wallet Standard, so we can use an empty array.
             * If you need to support legacy wallets, you can add specific adapters here.
             */
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProviderDynamic>
                    {children}
                </WalletModalProviderDynamic>
            </WalletProvider>
        </ConnectionProvider>
    );
};

