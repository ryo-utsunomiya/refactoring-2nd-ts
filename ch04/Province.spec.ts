import assert = require('assert');
import {describe, it} from 'mocha';
import sampleProvinceData from "./sampleProvinceData";
import Province from './Province';

describe('province', () => {
  it('shortfall', () => {
    const asia = new Province(sampleProvinceData());
    assert.strictEqual(asia.shortfall, 5);
  });
  it('profit', () => {
    const asia = new Province(sampleProvinceData());
    assert.strictEqual(asia.profit, 230);
  });
});
