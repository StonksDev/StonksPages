'use client';

import { ThemeProvider } from 'next-themes';
import { WalletContextProvider } from './WalletContextProvider';
import { Toaster } from './ui/sonner';

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <WalletContextProvider>
                {children}
            </WalletContextProvider>
            <Toaster />
        </ThemeProvider>
    );
}

