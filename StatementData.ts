import { Invoice, Play, Performance } from "./types";

function amountFor(aPerformance: StatementDataPerformance): number {
  let result = 0;

  switch (aPerformance.play.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`unknown type: ${aPerformance.play.type}`);
  }
  return result;
}

function volumeCreditsFor(aPerformance: StatementDataPerformance): number {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if (aPerformance.play.type === "comedy") {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result;
}

function totalAmount(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

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
    this.amount = amountFor(this);
    this.volumeCredits = volumeCreditsFor(this);
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
    this.totalAmount = totalAmount(this);
    this.totalVolumeCredits = totalVolumeCredits(this);
  }
}
