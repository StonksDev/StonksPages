const U64_MAX = BigInt('18446744073709551615');
const TEN = BigInt(10);
const ZERO = BigInt(0);

const assertDecimals = (decimals: number): void => {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error('Token decimals must be a non-negative integer');
  }
};

/**
 * Parses a human-readable token amount into exact base units.
 *
 * Token amounts must never pass through a JavaScript number because u64 token
 * balances routinely exceed Number.MAX_SAFE_INTEGER once decimals are applied.
 */
export const parseTokenAmount = (uiAmount: string, decimals: number): bigint => {
  assertDecimals(decimals);

  const normalized = uiAmount.trim();
  if (!/^\d+(?:\.\d*)?$/.test(normalized)) {
    throw new Error('Enter a valid token amount');
  }

  const [wholePart, fractionPart = ''] = normalized.split('.');
  if (fractionPart.length > decimals) {
    throw new Error(`Amount supports up to ${decimals} decimal places`);
  }

  const scale = TEN ** BigInt(decimals);
  const paddedFraction = fractionPart.padEnd(decimals, '0');
  const baseUnits = BigInt(wholePart) * scale + BigInt(paddedFraction || '0');

  if (baseUnits > U64_MAX) {
    throw new Error('Amount exceeds the maximum token amount');
  }

  return baseUnits;
};

/** Formats exact base units as a human-readable token amount. */
export const formatTokenAmount = (
  amount: bigint | string,
  decimals: number,
): string => {
  assertDecimals(decimals);

  const baseUnits = typeof amount === 'string' ? BigInt(amount) : amount;
  if (baseUnits < ZERO) {
    throw new Error('Token amount cannot be negative');
  }

  if (decimals === 0) {
    return baseUnits.toString();
  }

  const digits = baseUnits.toString().padStart(decimals + 1, '0');
  const wholePart = digits.slice(0, -decimals);
  const fractionPart = digits.slice(-decimals).replace(/0+$/, '');

  return fractionPart ? `${wholePart}.${fractionPart}` : wholePart;
};

export const floorToMultiple = (amount: bigint, multiple: bigint): bigint => {
  if (multiple <= ZERO) {
    throw new Error('Multiple must be greater than zero');
  }

  return amount - (amount % multiple);
};
