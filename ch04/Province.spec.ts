import assert = require('assert');
import {describe, it} from 'mocha';
import sampleProvinceData from "./sampleProvinceData";
import Province from './Province';

describe('province', () => {
  let asia: Province;
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  it('shortfall', () => {
    assert.strictEqual(asia.shortfall, 5);
  });
  it('profit', () => {
    assert.strictEqual(asia.profit, 230);
  });
  it('change production', () => {
    asia.producers[0].production = 20;
    assert.strictEqual(asia.shortfall, -6);
    assert.strictEqual(asia.profit, 292);
  });
  it('zero demand', () => {
    asia.demand = 0;
    assert.strictEqual(asia.shortfall, -25);
    assert.strictEqual(asia.profit, 0);
  });
  it('negative demand', () => {
    asia.demand = -1;
    assert.strictEqual(asia.shortfall, -26);
    assert.strictEqual(asia.profit, -10);
  });
});

describe('no producers', () => {
  let noProducers: Province;
  beforeEach(() => {
    noProducers = new Province({
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    });
  });
  it('shortfall', () => {
    assert.strictEqual(noProducers.shortfall, 30);
  });
  it('profit', () => {
    assert.strictEqual(noProducers.profit, 0);
  });
});
