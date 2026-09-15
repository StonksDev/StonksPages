import { getAssociatedTokenAddress } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

/**
 * Derives an ATA for a connected wallet, including smart-wallet PDAs such as
 * the vault address exposed by SquadsX.
 */
export const getWalletTokenAddress = (
  mint: PublicKey,
  owner: PublicKey,
): Promise<PublicKey> => getAssociatedTokenAddress(mint, owner, true);
