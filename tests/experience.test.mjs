import test from 'node:test';
import assert from 'node:assert/strict';
import { compactHeader } from '../public/experience.js';

test('the header shrinks after scrolling and stays stable around the threshold', () => {
  let compact = false;
  const positions = [0, 88, 89, 87, 50, 25, 24, 30, 90, 0];
  const states = positions.map(y => compact = compactHeader(y, compact));
  assert.deepEqual(states, [false, false, true, true, true, true, false, false, true, false]);
});
