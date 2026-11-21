import test from 'node:test';
import assert from 'node:assert/strict';
import { RoadWidthPermissibleFSI } from '../src/utils/roadWidthPermissibleFSI.js';

test('Permissible FSI Tests', async (t) => {
  await t.test('should allow 3.0 FSI on 24m wide metro transit corridor', () => {
    const res = RoadWidthPermissibleFSI.getPermissibleFSI(24, true);
    assert.equal(res.permissibleFSI, 3.0);
  });
});
