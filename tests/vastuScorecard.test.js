import test from 'node:test';
import assert from 'node:assert/strict';
import { VastuScorecard } from '../src/utils/vastuScorecard.js';

test('Vastu Scorecard Tests', async (t) => {
  await t.test('should award 100% score for ideally oriented floorplan', () => {
    const layout = {
      main_entrance: 'east',
      master_bedroom: 'south_west',
      kitchen: 'south_east',
      pooja_room: 'north_east',
      overhead_tank: 'south_west'
    };
    const res = VastuScorecard.evaluateLayout(layout);
    assert.equal(res.compliancePercentage, 100.0);
    assert.equal(res.isVastuCompliant, true);
  });
});
