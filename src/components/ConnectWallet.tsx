'use client';

import dynamic from 'next/dynamic';
import Button from './Button';

const WalletMultiButtonDynamic = dynamic(
    async () => {
        const { WalletMultiButton } = await import('@solana/wallet-adapter-react-ui');
        return WalletMultiButton;
    },
    {
        ssr: false,
        loading: () => (
            <Button variant="rainbow" className="bg-gradient-button">
                Connect Wallet
            </Button>
        )
    }
);

export const ConnectWallet = () => {
    return (
        <WalletMultiButtonDynamic className="bg-gradient-button" />
    );
};

