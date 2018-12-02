interface Performance {
  playID: string;
  audience: number;
}

interface Invoice {
  customer: string;
  performances: Array<Performance>;
}

interface Play {
  name: string;
  type: string;
}

function usd(aNumber: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(aNumber / 100);
}

export function statement(
  invoice: Invoice,
  plays: { [playID: string]: Play }
): string {
  let result = `Statement for ${invoice.customer}\n`;

  const playFor = (aPerformance: Performance): Play =>
    plays[aPerformance.playID];

  const amountFor = (aPerformance: Performance): number => {
    let result = 0;

    switch (playFor(aPerformance).type) {
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
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  };

  const volumeCreditsFor = (aPerformance: Performance): number => {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if (playFor(aPerformance).type === "comedy") {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  };

  const totalVolumeCredits = (): number => {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  };

  const computeTotalAmount = (): number => {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  };

  for (let perf of invoice.performances) {
    // print line for this order
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(computeTotalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}
