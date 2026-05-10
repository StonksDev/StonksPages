import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getUserTokenBalances, getTokenInfos, TokenInfo } from '@/lib/token-wrapper';

export interface TokenBalances {
  original: number;
  wrapper: number;
}

export interface TokenBalanceData {
  balances: TokenBalances;
  tokenInfos: {
    original: TokenInfo;
    wrapper: TokenInfo;
  } | null;
}

export const useTokenBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  
  const [data, setData] = useState<TokenBalanceData>({ 
    balances: { original: 0, wrapper: 0 },
    tokenInfos: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!connection) {
      setData({ 
        balances: { original: 0, wrapper: 0 },
        tokenInfos: null
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch token info first (needed for proper decimal handling)
      const tokenInfos = await getTokenInfos(connection);
      
      let balances = { original: 0, wrapper: 0 };
      
      // Only fetch balances if wallet is connected
      if (publicKey) {
        balances = await getUserTokenBalances(connection, publicKey);
      }
      
      setData({ balances, tokenInfos });
    } catch (err) {
      console.error('Error fetching token data:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setData({ 
        balances: { original: 0, wrapper: 0 },
        tokenInfos: null
      });
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey]);

  // Fetch balances when wallet or connection changes
  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return {
    data: data.balances,
    tokenInfos: data.tokenInfos,
    isLoading,
    error,
    refetch: fetchBalances,
  };
};

// Hook to refresh balances manually
export const useRefreshBalances = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useCallback(async () => {
    if (!connection || !publicKey) return null;
    
    try {
      return await getUserTokenBalances(connection, publicKey);
    } catch (error) {
      console.error('Error refreshing balances:', error);
      return null;
    }
  }, [connection, publicKey]);
};

