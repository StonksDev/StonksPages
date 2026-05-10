import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

/**
 * Detects the Solana network from an RPC URL
 * @param rpcUrl - The RPC endpoint URL
 * @returns The detected WalletAdapterNetwork
 */
export function detectNetworkFromRpcUrl(rpcUrl: string | undefined): WalletAdapterNetwork {
  if (!rpcUrl) {
    return WalletAdapterNetwork.Mainnet;
  }

  const urlLower = rpcUrl.toLowerCase();

  // Check for devnet
  if (urlLower.includes('devnet')) {
    return WalletAdapterNetwork.Devnet;
  }

  // Check for testnet
  if (urlLower.includes('testnet')) {
    return WalletAdapterNetwork.Testnet;
  }

  // Check for localhost (local validator, treat as devnet)
  if (urlLower.includes('localhost') || urlLower.includes('127.0.0.1')) {
    return WalletAdapterNetwork.Devnet;
  }

  // Default to mainnet for custom RPCs or unknown URLs (conservative choice)
  return WalletAdapterNetwork.Mainnet;
}

/**
 * Validates network configuration and logs warnings in development mode
 * @param rpcUrl - The RPC endpoint URL
 * @param network - The detected network
 */
export function validateNetworkConfiguration(
  rpcUrl: string,
  network: WalletAdapterNetwork
): void {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const networkName = getNetworkDisplayName(network);

  // Log network detection info
  console.log(`[Network Detection] Using ${networkName} network`);
  console.log(`[Network Detection] RPC URL: ${rpcUrl}`);

  // Warn for non-mainnet usage
  if (network !== WalletAdapterNetwork.Mainnet) {
    console.warn(
      `⚠️  [Network Detection] You are connected to ${networkName}. ` +
      `Ensure your program IDs and token addresses match this network.`
    );
  }

  // Log current program ID for reference
  const programId = process.env.NEXT_PUBLIC_PROGRAM_ID;
  if (programId) {
    console.log(`[Network Detection] Token Wrapper Program ID: ${programId}`);
  }
}

/**
 * Converts WalletAdapterNetwork enum to human-readable name
 * @param network - The network enum value
 * @returns Human-readable network name
 */
export function getNetworkDisplayName(network: WalletAdapterNetwork): string {
  switch (network) {
    case WalletAdapterNetwork.Mainnet:
      return 'Mainnet';
    case WalletAdapterNetwork.Devnet:
      return 'Devnet';
    case WalletAdapterNetwork.Testnet:
      return 'Testnet';
    default:
      return 'Unknown';
  }
}
