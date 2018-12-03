import { Invoice, Play, Performance } from "./types";

class StatementDataPerformance {
  playID: string;
  audience: number;
  play: Play;
  amount: number;
  volumeCredits: number;

  constructor(aPerformance: Performance, play: Play) {
    this.playID = aPerformance.playID;
    this.audience = aPerformance.audience;
    this.play = play;
    this.amount = this.computeAmount();
    this.volumeCredits = this.computeVolumeCredits();
  }

  private computeAmount(): number {
    let result = 0;

    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.audience > 30) {
          result += 1000 * (this.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.audience > 20) {
          result += 10000 + 500 * (this.audience - 20);
        }
        result += 300 * this.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.play.type}`);
    }
    return result;
  }

  private computeVolumeCredits(): number {
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
  totalAmount: number;
  totalVolumeCredits: number;

  constructor(invoice: Invoice, plays: { [playID: string]: Play }) {
    this.customer = invoice.customer;
    this.performances = invoice.performances.map(
      aPerformance =>
        new StatementDataPerformance(aPerformance, plays[aPerformance.playID])
    );
    this.totalAmount = this.performances.reduce(
      (total, p) => total + p.amount,
      0
    );
    this.totalVolumeCredits = this.performances.reduce(
      (total, p) => total + p.volumeCredits,
      0
    );
  }
}
