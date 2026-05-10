import { useState, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { buildWrapTransaction, buildUnwrapTransaction, buildInitializeTransaction, checkProgramInitialized } from '@/lib/token-wrapper';
import { toast } from 'sonner';

interface WrapParams {
  amount: number;
}

interface UnwrapParams {
  amount: number;
}

interface WrapUnwrapParams {
  mode: 'wrap' | 'unwrap';
  amount: number;
}

export const useWrapToken = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async ({ amount }: WrapParams): Promise<string> => {
    if (!connection || !publicKey) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const transaction = await buildWrapTransaction(connection, publicKey, amount);
      const signature = await sendTransaction(transaction, connection);
      
      toast.success(`Wrap successful! Signature: ${signature.slice(0, 8)}...`);
      return signature;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Wrap transaction failed');
      setError(error);
      console.error('Wrap failed:', error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey, sendTransaction]);

  return {
    mutate,
    isPending: isLoading,
    error,
  };
};

export const useUnwrapToken = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async ({ amount }: UnwrapParams): Promise<string> => {
    if (!connection || !publicKey) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const transaction = await buildUnwrapTransaction(connection, publicKey, amount);
      const signature = await sendTransaction(transaction, connection);
      
      toast.success(`Unwrap successful! Signature: ${signature.slice(0, 8)}...`);
      return signature;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unwrap transaction failed');
      setError(error);
      console.error('Unwrap failed:', error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey, sendTransaction]);

  return {
    mutate,
    isPending: isLoading,
    error,
  };
};

// Unified hook for both wrap and unwrap operations
export const useWrapUnwrap = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wrapUnwrap = useCallback(async ({ mode, amount }: WrapUnwrapParams): Promise<string> => {
    if (!connection || !publicKey) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const transaction = mode === 'wrap' 
        ? await buildWrapTransaction(connection, publicKey, amount)
        : await buildUnwrapTransaction(connection, publicKey, amount);
      
      const signature = await sendTransaction(transaction, connection);
      
      const actionText = mode === 'wrap' ? 'Wrap' : 'Unwrap';
      toast.success(`${actionText} successful! Signature: ${signature.slice(0, 8)}...`);
      return signature;
    } catch (err) {
      const actionText = mode === 'wrap' ? 'Wrap' : 'Unwrap';
      const error = err instanceof Error ? err : new Error(`${actionText} transaction failed`);
      setError(error);
      console.error(`${actionText} failed:`, error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey, sendTransaction]);

  return {
    wrapUnwrap,
    isPending: isLoading,
    error,
  };
};

// Hook to get the status of ongoing wrap/unwrap operations
export const useWrapUnwrapStatus = () => {
  const wrapMutation = useWrapToken();
  const unwrapMutation = useUnwrapToken();

  return {
    isWrapping: wrapMutation.isPending,
    isUnwrapping: unwrapMutation.isPending,
    isLoading: wrapMutation.isPending || unwrapMutation.isPending,
    wrapError: wrapMutation.error,
    unwrapError: unwrapMutation.error,
    hasError: !!wrapMutation.error || !!unwrapMutation.error,
  };
};

export const useInitializeProgram = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialize = useCallback(async (): Promise<string> => {
    if (!connection || !publicKey) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if already initialized
      const isInitialized = await checkProgramInitialized(connection);
      if (isInitialized) {
        toast.info('Program is already initialized!');
        return '';
      }

      const transaction = await buildInitializeTransaction(connection, publicKey);
      const signature = await sendTransaction(transaction, connection);
      
      toast.success(`Program initialized! Signature: ${signature.slice(0, 8)}...`);
      return signature;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Initialize transaction failed');
      setError(error);
      console.error('Initialize failed:', error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey, sendTransaction]);

  return {
    initialize,
    isPending: isLoading,
    error,
  };
};

