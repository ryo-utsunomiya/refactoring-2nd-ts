interface Performance {
  playID: string;
  audience: number;
}

interface RichPerformance {
  playID: string;
  audience: number;
  play: Play;
  amount: number;
}

interface Invoice {
  customer: string;
  performances: Array<Performance>;
}

interface Play {
  name: string;
  type: string;
}

class StatementData {
  customer: string;
  performances: Array<RichPerformance>;
}

function usd(aNumber: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
}

function renderPlainText(data: StatementData): string {
  const volumeCreditsFor = (aPerformance: RichPerformance): number => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if (aPerformance.play.type === "comedy") {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  };

  const totalVolumeCredits = (): number => {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  };

  const totalAmount = (): number => {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  };

  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}

export function statement(
  invoice: Invoice,
  plays: { [playID: string]: Play }
): string {
  const amountFor = (aPerformance: Performance, play: Play): number => {
    let result = 0;

    switch (play.type) {
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
        throw new Error(`unknown type: ${play.type}`);
    }
    return result;
  };

  const enrichPerformance = (aPerformance: Performance): RichPerformance => {
    const playFor = (aPerformance: Performance) => plays[aPerformance.playID];
    return {
      ...aPerformance,
      play: playFor(aPerformance),
      amount: amountFor(aPerformance, playFor(aPerformance))
    };
  };

  const statementData = new StatementData();
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData);
}
