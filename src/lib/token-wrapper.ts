import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import {
  Program,
  AnchorProvider,
  BN,
  Idl
} from '@coral-xyz/anchor';
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getMint,
  Mint,
} from '@solana/spl-token';

// Import the IDL
import TokenWrapperIDL from '../idl/token_wrapper.json';

// Program constants
export const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_WRAPPER_PROGRAM_ID!);

// Token addresses
export const ORIGINAL_MINT = new PublicKey(process.env.NEXT_PUBLIC_ORIGINAL_TOKEN_ADDRESS!);
export const WRAPPER_MINT = new PublicKey(process.env.NEXT_PUBLIC_WRAPPER_TOKEN_ADDRESS!);
export const CONVERSION_RATIO = 17190; // 1 STNK → 17,190 STONKS

// Cache for token metadata to avoid multiple fetches
const tokenMetadataCache: Map<string, Mint> = new Map();

// Interface for token information including decimals
export interface TokenInfo {
  mint: PublicKey;
  decimals: number;
  supply: bigint;
}

// TypeScript interface for the token wrapper program
export interface TokenWrapperProgram extends Idl {
  address: string;
  metadata: {
    name: string;
    version: string;
    spec: string;
    description: string;
  };
}

// Function to fetch token metadata from blockchain
export const getTokenMetadata = async (
  connection: Connection,
  mint: PublicKey
): Promise<Mint> => {
  const mintStr = mint.toString();

  // Check cache first
  if (tokenMetadataCache.has(mintStr)) {
    return tokenMetadataCache.get(mintStr)!;
  }

  try {
    const mintInfo = await getMint(connection, mint);
    tokenMetadataCache.set(mintStr, mintInfo);
    return mintInfo;
  } catch (error) {
    console.error(`Error fetching mint info for ${mintStr}:`, error);
    throw new Error(`Failed to fetch token metadata for ${mintStr}`);
  }
};

// Function to get token info with decimals
export const getTokenInfo = async (
  connection: Connection,
  mint: PublicKey
): Promise<TokenInfo> => {
  const mintInfo = await getTokenMetadata(connection, mint);

  return {
    mint,
    decimals: mintInfo.decimals,
    supply: mintInfo.supply,
  };
};

// Function to get both token infos
export const getTokenInfos = async (
  connection: Connection
): Promise<{ original: TokenInfo; wrapper: TokenInfo }> => {
  const [originalInfo, wrapperInfo] = await Promise.all([
    getTokenInfo(connection, ORIGINAL_MINT),
    getTokenInfo(connection, WRAPPER_MINT),
  ]);

  return {
    original: originalInfo,
    wrapper: wrapperInfo,
  };
};

// Helper function to convert UI amount to program amount (with decimals)
export const toTokenAmount = (uiAmount: number, decimals: number): BN => {
  return new BN(uiAmount * Math.pow(10, decimals));
};

// Helper function to convert program amount to UI amount (with decimals)
export const fromTokenAmount = (amount: BN | bigint | string, decimals: number): number => {
  const amountStr = typeof amount === 'string' ? amount : amount.toString();
  return parseFloat(amountStr) / Math.pow(10, decimals);
};

// PDAs helper functions
export const getOriginalVaultPDA = (): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("original_vault"),
      ORIGINAL_MINT.toBuffer(),
      WRAPPER_MINT.toBuffer()
    ],
    PROGRAM_ID
  );
};

export const getWrapperVaultPDA = (): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("wrapper_vault"),
      ORIGINAL_MINT.toBuffer(),
      WRAPPER_MINT.toBuffer()
    ],
    PROGRAM_ID
  );
};

export const getVaultAuthorityPDA = (): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault_authority"),
    ORIGINAL_MINT.toBuffer(),
    WRAPPER_MINT.toBuffer()
    ],
    PROGRAM_ID
  );
};

// Add wrapper state PDA helper
export const getWrapperStatePDA = (): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("wrapper_state"),
    ORIGINAL_MINT.toBuffer(),
    WRAPPER_MINT.toBuffer()
    ],
    PROGRAM_ID
  );
};

// Helper function to create program instance
export const createTokenWrapperProgram = (
  connection: Connection,
  publicKey?: PublicKey
): Program<TokenWrapperProgram> => {
  const provider = new AnchorProvider(
    connection,
    {
      publicKey: publicKey || PublicKey.default,
      signTransaction: async () => { throw new Error("Wallet not connected"); },
      signAllTransactions: async () => { throw new Error("Wallet not connected"); },
    },
    { preflightCommitment: "processed" }
  );

  return new Program(TokenWrapperIDL as TokenWrapperProgram, provider);
};

// Transaction builder for wrap operation
export const buildWrapTransaction = async (
  connection: Connection,
  userPublicKey: PublicKey,
  amount: number
): Promise<Transaction> => {
  const transaction = new Transaction();

  // Get token metadata to determine decimals
  const originalTokenInfo = await getTokenInfo(connection, ORIGINAL_MINT);

  // Convert amount to BN using actual decimals
  const amountBN = toTokenAmount(amount, originalTokenInfo.decimals);

  // Get user token accounts
  const userOriginalAccount = await getAssociatedTokenAddress(
    ORIGINAL_MINT,
    userPublicKey
  );

  const userWrapperAccount = await getAssociatedTokenAddress(
    WRAPPER_MINT,
    userPublicKey
  );

  // Check if original account exists, create if not
  const originalAccountInfo = await connection.getAccountInfo(userOriginalAccount);
  if (!originalAccountInfo) {
    const createOriginalAccountIx = createAssociatedTokenAccountInstruction(
      userPublicKey, // payer
      userOriginalAccount,
      userPublicKey, // owner
      ORIGINAL_MINT
    );
    transaction.add(createOriginalAccountIx);
  }

  // Check if wrapper account exists, create if not
  const wrapperAccountInfo = await connection.getAccountInfo(userWrapperAccount);
  if (!wrapperAccountInfo) {
    const createWrapperAccountIx = createAssociatedTokenAccountInstruction(
      userPublicKey, // payer
      userWrapperAccount,
      userPublicKey, // owner
      WRAPPER_MINT
    );
    transaction.add(createWrapperAccountIx);
  }

  // Get PDAs
  const [originalVault] = getOriginalVaultPDA();
  const [wrapperVault] = getWrapperVaultPDA();
  const [vaultAuthority] = getVaultAuthorityPDA();
  const [wrapperState] = getWrapperStatePDA();

  // Create wrap instruction
  const program = createTokenWrapperProgram(connection, userPublicKey);

  const wrapIx = await program.methods
    .wrap(amountBN)
    .accounts({
      user: userPublicKey,
      originalMint: ORIGINAL_MINT,
      wrapperMint: WRAPPER_MINT,
      userOriginalAccount,
      userWrapperAccount,
      originalVault,
      wrapperVault,
      vaultAuthority,
      wrapperState,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();

  transaction.add(wrapIx);

  return transaction;
};

// Transaction builder for unwrap operation  
export const buildUnwrapTransaction = async (
  connection: Connection,
  userPublicKey: PublicKey,
  wrapperAmount: number
): Promise<Transaction> => {
  const transaction = new Transaction();

  // Get token metadata to determine decimals
  const wrapperTokenInfo = await getTokenInfo(connection, WRAPPER_MINT);

  // Convert amount to BN using actual decimals
  const wrapperAmountBN = toTokenAmount(wrapperAmount, wrapperTokenInfo.decimals);

  // Get user token accounts
  const userOriginalAccount = await getAssociatedTokenAddress(
    ORIGINAL_MINT,
    userPublicKey
  );

  const userWrapperAccount = await getAssociatedTokenAddress(
    WRAPPER_MINT,
    userPublicKey
  );

  // Check if original account exists, create if not
  const originalAccountInfo = await connection.getAccountInfo(userOriginalAccount);
  if (!originalAccountInfo) {
    const createOriginalAccountIx = createAssociatedTokenAccountInstruction(
      userPublicKey, // payer
      userOriginalAccount,
      userPublicKey, // owner
      ORIGINAL_MINT
    );
    transaction.add(createOriginalAccountIx);
  }

  // Get PDAs
  const [originalVault] = getOriginalVaultPDA();
  const [wrapperVault] = getWrapperVaultPDA();
  const [vaultAuthority] = getVaultAuthorityPDA();
  const [wrapperState] = getWrapperStatePDA();

  // Create unwrap instruction
  const program = createTokenWrapperProgram(connection, userPublicKey);

  const unwrapIx = await program.methods
    .unwrap(wrapperAmountBN)
    .accounts({
      user: userPublicKey,
      originalMint: ORIGINAL_MINT,
      wrapperMint: WRAPPER_MINT,
      userOriginalAccount,
      userWrapperAccount,
      originalVault,
      wrapperVault,
      vaultAuthority,
      wrapperState,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();

  transaction.add(unwrapIx);

  return transaction;
};

// Helper function to get token balance
export const getTokenBalance = async (
  connection: Connection,
  userPublicKey: PublicKey,
  mint: PublicKey
): Promise<number> => {
  try {
    const tokenAccount = await getAssociatedTokenAddress(mint, userPublicKey);
    const accountInfo = await connection.getAccountInfo(tokenAccount);

    if (!accountInfo) {
      return 0;
    }

    const balance = await connection.getTokenAccountBalance(tokenAccount);
    return parseFloat(balance.value.amount) / Math.pow(10, balance.value.decimals);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return 0;
  }
};

// Helper to get both token balances
export const getUserTokenBalances = async (
  connection: Connection,
  userPublicKey: PublicKey
) => {
  const [originalBalance, wrapperBalance] = await Promise.all([
    getTokenBalance(connection, userPublicKey, ORIGINAL_MINT),
    getTokenBalance(connection, userPublicKey, WRAPPER_MINT),
  ]);

  return {
    original: originalBalance,
    wrapper: wrapperBalance,
  };
};

// Transaction builder for initialize operation
export const buildInitializeTransaction = async (
  connection: Connection,
  authorityPublicKey: PublicKey
): Promise<Transaction> => {
  const transaction = new Transaction();

  // Get PDAs
  const [originalVault] = getOriginalVaultPDA();
  const [wrapperVault] = getWrapperVaultPDA();
  const [vaultAuthority] = getVaultAuthorityPDA();
  const [wrapperState] = getWrapperStatePDA();

  // Create initialize instruction
  const program = createTokenWrapperProgram(connection, authorityPublicKey);

  const initializeIx = await program.methods
    .initialize()
    .accounts({
      authority: authorityPublicKey,
      originalMint: ORIGINAL_MINT,
      wrapperMint: WRAPPER_MINT,
      originalVault,
      wrapperVault,
      vaultAuthority,
      wrapperState,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .instruction();

  transaction.add(initializeIx);

  return transaction;
};

// Check if program is initialized
export const checkProgramInitialized = async (
  connection: Connection
): Promise<boolean> => {
  try {
    const [originalVault] = getOriginalVaultPDA();
    const accountInfo = await connection.getAccountInfo(originalVault);
    return accountInfo !== null;
  } catch {
    return false;
  }
};

// Helper function to transfer wrapper tokens to the program vault
export const buildTransferToVaultTransaction = async (
  connection: Connection,
  ownerPublicKey: PublicKey,
  amount: number
): Promise<Transaction> => {
  const transaction = new Transaction();

  // Get token metadata to determine decimals
  const wrapperTokenInfo = await getTokenInfo(connection, WRAPPER_MINT);

  // Convert amount to BN using actual decimals
  const amountBN = toTokenAmount(amount, wrapperTokenInfo.decimals);

  // Get owner's wrapper token account
  const ownerWrapperAccount = await getAssociatedTokenAddress(
    WRAPPER_MINT,
    ownerPublicKey
  );

  // Get wrapper vault PDA
  const [wrapperVault] = getWrapperVaultPDA();

  // Create transfer instruction
  const transferIx = createTransferInstruction(
    ownerWrapperAccount,    // source
    wrapperVault,          // destination  
    ownerPublicKey,        // owner
    BigInt(amountBN.toString())  // amount
  );

  transaction.add(transferIx);

  return transaction;
};

