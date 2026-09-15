'use client';

import React, { useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/Button';
import { AmountInput } from '@/components/ui/amount-input';
import { Token } from '@/components/ui/token-select';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { useWrapUnwrap } from '@/hooks/useWrapUnwrap';
import {
    ORIGINAL_MINT,
    WRAPPER_MINT,
    CONVERSION_RATIO
} from '@/lib/token-wrapper';
import {
    floorToMultiple,
    formatTokenAmount,
    parseTokenAmount,
} from '@/lib/token-amount';
import { Loader2, ArrowUpDown, AlertTriangle, Wallet } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { StonksConfetti } from '@/components/StonksConfetti';

type SwapDirection = 'wrap' | 'unwrap';

export const SwapForm: React.FC = () => {
    const { publicKey, wallet } = useWallet();
    const { setVisible } = useWalletModal();
    const { data: balances, tokenInfos, isLoading: balancesLoading, refetch: refetchBalances } = useTokenBalance();
    const { wrapUnwrap, isPending } = useWrapUnwrap();

    const [direction, setDirection] = useState<SwapDirection>('wrap');
    const [amountFrom, setAmountFrom] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isSquadsX = wallet?.adapter.name === 'SquadsX';

    const originalTokenInfo = tokenInfos?.original;
    const wrapperTokenInfo = tokenInfos?.wrapper;

    const STNK_TOKEN: Token = {
        symbol: 'STNK',
        name: 'STNK (Original)',
        mint: ORIGINAL_MINT.toString(),
        decimals: originalTokenInfo?.decimals || 9,
    };

    const STONKS_TOKEN: Token = {
        symbol: 'STONKS',
        name: 'STONKS (Wrapped)',
        mint: WRAPPER_MINT.toString(),
        decimals: wrapperTokenInfo?.decimals || 9,
    };

    const isWrapping = direction === 'wrap';
    const fromToken = isWrapping ? STNK_TOKEN : STONKS_TOKEN;
    const toToken = isWrapping ? STONKS_TOKEN : STNK_TOKEN;
    const fromBalance = isWrapping ? balances?.original : balances?.wrapper;
    const maxBalanceBaseUnits = BigInt(fromBalance || '0');
    const conversionRatioBaseUnits = BigInt(CONVERSION_RATIO);
    const maxSpendableBaseUnits = isWrapping
        ? maxBalanceBaseUnits
        : floorToMultiple(maxBalanceBaseUnits, conversionRatioBaseUnits);

    const formatExactNumber = (amount: string, maxDecimals?: number): string => {
        const [wholePart, fractionPart = ''] = amount.split('.');
        const groupedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const visibleFraction = maxDecimals === undefined
            ? fractionPart
            : fractionPart.slice(0, maxDecimals);

        return visibleFraction ? `${groupedWholePart}.${visibleFraction}` : groupedWholePart;
    };

    const calculateToAmount = (fromAmount: string): string => {
        if (!fromAmount) return '0';

        try {
            const fromBaseUnits = parseTokenAmount(fromAmount, fromToken.decimals);
            if (fromBaseUnits === BigInt(0)) return '0';

            const toBaseUnits = isWrapping
                ? fromBaseUnits * conversionRatioBaseUnits
                : fromBaseUnits % conversionRatioBaseUnits === BigInt(0)
                    ? fromBaseUnits / conversionRatioBaseUnits
                    : BigInt(0);

            return formatExactNumber(formatTokenAmount(toBaseUnits, toToken.decimals));
        } catch {
            return '0';
        }
    };

    const amountTo = calculateToAmount(amountFrom);

    const handleSwapDirection = () => {
        setDirection(prev => prev === 'wrap' ? 'unwrap' : 'wrap');
        setAmountFrom('');
    };

    const handleMaxClick = () => {
        if (maxSpendableBaseUnits > BigInt(0)) {
            setAmountFrom(formatTokenAmount(maxSpendableBaseUnits, fromToken.decimals));
        }
    };

    const isValidAmount = (): boolean => {
        if (!amountFrom) return false;

        try {
            const amountBaseUnits = parseTokenAmount(amountFrom, fromToken.decimals);
            if (amountBaseUnits <= BigInt(0) || amountBaseUnits > maxBalanceBaseUnits) return false;
            if (!isWrapping && amountBaseUnits % conversionRatioBaseUnits !== BigInt(0)) return false;
            return true;
        } catch {
            return false;
        }
    };

    const getErrorMessage = (): string | undefined => {
        if (!amountFrom) return undefined;

        try {
            const amountBaseUnits = parseTokenAmount(amountFrom, fromToken.decimals);
            if (amountBaseUnits <= BigInt(0)) return 'Amount must be greater than zero';
            if (amountBaseUnits > maxBalanceBaseUnits) return 'Not Enough Tokens';
            if (!isWrapping && amountBaseUnits % conversionRatioBaseUnits !== BigInt(0)) {
                const increment = formatTokenAmount(conversionRatioBaseUnits, fromToken.decimals);
                return `Amount must be a multiple of ${increment} ${fromToken.symbol}. Use Max for the largest valid amount.`;
            }
            return undefined;
        } catch (error) {
            return error instanceof Error ? error.message : 'Enter a valid token amount';
        }
    };

    const handleSubmit = async () => {
        if (!publicKey) {
            setVisible(true);
            return;
        }
        if (!isValidAmount()) return;
        try {
            await wrapUnwrap({ mode: direction, amount: amountFrom });
            setAmountFrom('');
            if (isWrapping && !isSquadsX) {
                setShowConfetti(true);
                toast.success('STONKS 📈🏆');
            }
            if (!isSquadsX) {
                setTimeout(() => refetchBalances(), 1000);
            }
        } catch {
            toast.error('NOT STONKS 📉💩');
        }
    };

    const formatBalance = (balance: string | undefined, decimals: number): string => {
        if (balance === undefined) return '0';
        return formatExactNumber(formatTokenAmount(balance, decimals), Math.min(decimals, 6));
    };

    return (
        <div className="w-full max-w-full space-y-6">
            {/* Direction Toggle */}
            <div className="flex items-center justify-center gap-4 mb-2">
                <Button
                    onClick={() => setDirection('wrap')}
                    variant={isWrapping ? 'tertiary' : 'ghost'}
                    className={isWrapping ? 'shadow-lg' : ''}
                >
                    WRAP
                </Button>
                <Button
                    onClick={() => setDirection('unwrap')}
                    variant={!isWrapping ? 'tertiary' : 'ghost'}
                    className={!isWrapping ? 'shadow-lg' : ''}
                >
                    UNWRAP
                </Button>
            </div>

            {/* From Token */}
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm px-1">
                    <span className="text-primary/60 uppercase tracking-wide text-xs font-medium">From</span>
                    <button
                        onClick={handleMaxClick}
                        disabled={maxSpendableBaseUnits === BigInt(0)}
                        className="inline-flex items-center gap-2 text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium leading-none"
                    >
                        <span className="leading-none">Max</span>
                        {balancesLoading ? (
                            <span className="animate-pulse leading-none">...</span>
                        ) : (
                            <span className="font-mono leading-none">{formatBalance(fromBalance, fromToken.decimals)}</span>
                        )}
                    </button>
                </div>
                <div className={`bg-white rounded-2xl p-6 border-2 transition-all shadow-sm overflow-hidden ${
                    getErrorMessage() && amountFrom && publicKey
                        ? 'border-red-700/90 hover:border-red-700 active:border-red-700' 
                        : 'border-primary/10 hover:border-primary/20 focus-within:border-primary/20'
                }`}>
                <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 shrink-0">
                            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center shadow-lg ${
                                isWrapping ? 'bg-primary' : 'bg-gradient-button'
                            }`}>
                                <Image
                                    src="/images/logo.webp"
                                    alt={fromToken.symbol}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-primary font-semibold text-sm truncate">{fromToken.symbol}</p>
                                <p className="text-primary/50 text-xs truncate">{fromToken.name}</p>
                            </div>
                        </div>
                        <div className="flex-1 text-right min-w-0 overflow-hidden">
                            <AmountInput
                                value={amountFrom}
                                onChange={setAmountFrom}
                                decimals={fromToken.decimals}
                                placeholder={'0.0'}
                                className="text-right text-xl sm:text-2xl md:text-3xl font-bold bg-transparent p-0 text-primary placeholder:text-primary/20 w-full max-w-full box-border"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Swap Direction Button */}
            <div className="relative flex items-center justify-center -my-2">
                <button
                    onClick={handleSwapDirection}
                    className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-primary/20 hover:border-primary/30 overflow-hidden transition-all duration-300 hover:scale-105 hover:rotate-180 flex items-center justify-center group shadow-sm"
                    aria-label="Swap token direction"
                >
                    <ArrowUpDown className="h-5 w-5 text-primary/60 group-hover:text-primary/80 transition-colors" />
                </button>
                <div className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
            </div>

            {/* To Token */}
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm px-1">
                    <span className="text-primary/60 uppercase tracking-wide text-xs font-medium">To</span>
                    <span className="text-xs text-primary/50 font-medium">
                        {balancesLoading ? (
                            <span className="animate-pulse">...</span>
                        ) : (
                            <span className="font-mono">{formatBalance(isWrapping ? balances?.wrapper : balances?.original, toToken.decimals)}</span>
                        )}
                    </span>
                </div>
                <div className="bg-white rounded-2xl p-6 border-2 border-primary/10 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center shadow-lg ${
                                isWrapping ? 'bg-gradient-button' : 'bg-primary'
                            }`}>
                                <Image
                                    src="/images/logo.webp"
                                    alt={toToken.symbol}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8"
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-primary font-semibold text-sm truncate">{toToken.symbol}</p>
                                <p className="text-primary/50 text-xs truncate">{toToken.name}</p>
                            </div>
                        </div>
                        <div className="flex-1 text-right min-w-0">
                            <p className={`text-2xl md:text-3xl font-bold truncate ${
                                amountTo !== '0' ? 'text-primary' : 'text-primary/50'
                            }`}>
                                {amountTo}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exchange Rate */}
            {/* <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-tertiary" />
                        <span className="text-primary/70 text-sm font-medium">Exchange Rate</span>
                    </div>
                    <div className="text-right">
                        <p className="text-primary font-mono text-sm font-semibold">
                            1 {fromToken.symbol} = {isWrapping ? CONVERSION_RATIO.toLocaleString() : formatNumber(1 / CONVERSION_RATIO, 6)} {toToken.symbol}
                        </p>
                    </div>
                </div>
            </div> */}

            {/* Error Message */}
            {getErrorMessage() && publicKey && (
                <div className="rounded-xl p-4 border border-red-700/60 bg-red-600/5">
                    <div className="flex items-center gap-3 text-red-700">
                        <div className="shrink-0 flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-red-700" />
                        </div>
                        <p className="text-sm">{getErrorMessage()}</p>
                    </div>
                </div>
            )}

            {/* Action Button */}
            <div className="pt-2">
                {publicKey ? (
                    <Button
                        ref={buttonRef}
                        onClick={handleSubmit}
                        disabled={!isValidAmount() || isPending}
                        variant="tertiary"
                        size="large"
                        className="w-full disabled:opacity-50"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <ArrowUpDown className="mr-2 h-5 w-5" />
                                {isWrapping ? 'Wrap STNK → STONKS' : 'Unwrap STONKS → STNK'}
                            </>
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={() => setVisible(true)}
                        variant="rainbow"
                        size="large"
                        className="w-full"
                    >
                        <Wallet className="mr-2 h-5 w-5" />
                        CONNECT WALLET
                    </Button>
                )}
            </div>

            <StonksConfetti
                trigger={showConfetti}
                onComplete={() => setShowConfetti(false)}
                originElement={buttonRef}
            />
        </div>
    );
};
