import { Performance, Play } from "./types";

abstract class PerformanceCalculator {
  performance: Performance;

  constructor(aPerformance: Performance) {
    this.performance = aPerformance;
  }

  abstract get amount(): number;
  abstract get volumeCredits(): number;
}

class TragedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }

  get volumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits(): number {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    result += Math.floor(this.performance.audience / 5);
    return result;
  }
}

export function createPerformanceCalculator(
  aPerformance: Performance,
  aPlay: Play
) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance);
    case "comedy":
      return new ComedyCalculator(aPerformance);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}
