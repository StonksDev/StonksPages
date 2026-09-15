import assert from 'node:assert/strict';
import test from 'node:test';

import { getAssociatedTokenAddress } from '@solana/spl-token';
import { PublicKey, SystemProgram } from '@solana/web3.js';

import { getWalletTokenAddress } from './associated-token-address';

test('derives token accounts for off-curve smart-wallet owners', async () => {
  const mint = new PublicKey('stonksUpymwbn1rBBpZmd1u92ydJ2asGw1y7capGMzW');
  const [smartWalletPda] = PublicKey.findProgramAddressSync(
    [Buffer.from('smart-wallet-test')],
    SystemProgram.programId,
  );

  assert.equal(PublicKey.isOnCurve(smartWalletPda.toBytes()), false);
  await assert.rejects(() => getAssociatedTokenAddress(mint, smartWalletPda));

  const address = await getWalletTokenAddress(mint, smartWalletPda);
  const expectedAddress = await getAssociatedTokenAddress(mint, smartWalletPda, true);
  assert.ok(address.equals(expectedAddress));
});
