import {Invoice, Play, Performance} from "./types";
import {createPerformanceCalculator, PerformanceCalculator} from "./PerformanceCalculator";

class StatementDataPerformance {
  playID: string;
  audience: number;
  play: Play;
  private calculator: PerformanceCalculator;

  constructor(aPerformance: Performance, play: Play) {
    this.playID = aPerformance.playID;
    this.audience = aPerformance.audience;
    this.play = play;
    this.calculator = createPerformanceCalculator(aPerformance, play);
  }

  get amount(): number {
    return this.calculator.amount;
  }

  get volumeCredits(): number {
    return this.calculator.volumeCredits;
  }
}

export class StatementData {
  customer: string;
  performances: Array<StatementDataPerformance>;

  constructor(invoice: Invoice, plays: { [playID: string]: Play }) {
    this.customer = invoice.customer;
    this.performances = invoice.performances.map(
      aPerformance =>
        new StatementDataPerformance(aPerformance, plays[aPerformance.playID])
    );
  }

  get totalAmount() {
    return this.performances.reduce((total, p) => total + p.amount, 0);
  }

  get totalVolumeCredits() {
    return this.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}
