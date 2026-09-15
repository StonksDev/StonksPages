import assert from 'node:assert/strict';
import test from 'node:test';

import {
  floorToMultiple,
  formatTokenAmount,
  parseTokenAmount,
} from './token-amount';

test('parses amounts above Number.MAX_SAFE_INTEGER without losing precision', () => {
  assert.equal(
    parseTokenAmount('14001227.025982572', 9),
    BigInt('14001227025982572'),
  );
});

test('parses a leading-decimal amount accepted by the input field', () => {
  assert.equal(parseTokenAmount('.5', 9), BigInt('500000000'));
});

test('formats base units without converting through a number', () => {
  assert.equal(
    formatTokenAmount('14001227025973830', 9),
    '14001227.02597383',
  );
});

test('floors an unwrap amount to the conversion ratio', () => {
  const amount = BigInt('14001227025982572');
  const ratio = BigInt(17190);

  assert.equal(floorToMultiple(amount, ratio), BigInt('14001227025973830'));
  assert.equal(floorToMultiple(amount, ratio) % ratio, BigInt(0));
});

test('rejects precision beyond the mint decimals', () => {
  assert.throws(
    () => parseTokenAmount('1.0000000001', 9),
    /up to 9 decimal places/,
  );
});

test('rejects amounts that do not fit in a u64', () => {
  assert.throws(
    () => parseTokenAmount('18446744073709551616', 0),
    /maximum token amount/,
  );
});
