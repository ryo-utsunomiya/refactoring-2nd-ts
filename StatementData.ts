import { Invoice, Play, Performance } from "./types";
import PerformanceCalculator from "./PerformanceCalculator";

class StatementDataPerformance {
  playID: string;
  audience: number;
  play: Play;
  readonly amount: number;

  constructor(aPerformance: Performance, play: Play) {
    this.playID = aPerformance.playID;
    this.audience = aPerformance.audience;
    this.play = play;
    this.amount = new PerformanceCalculator(aPerformance, play).amount;
  }

  get volumeCredits(): number {
    let result = 0;
    result += Math.max(this.audience - 30, 0);
    if (this.play.type === "comedy") {
      result += Math.floor(this.audience / 5);
    }
    return result;
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
