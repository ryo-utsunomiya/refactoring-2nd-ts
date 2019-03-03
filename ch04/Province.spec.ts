import assert = require('assert');
import {describe, it} from 'mocha';
import sampleProvinceData from "./sampleProvinceData";
import Province from './Province';

describe('province', () => {
  let asia;
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  it('shortfall', () => {
    assert.strictEqual(asia.shortfall, 5);
  });
  it('profit', () => {
    assert.strictEqual(asia.profit, 230);
  });
});
