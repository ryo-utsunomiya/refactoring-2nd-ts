import { statement } from "./statement";
import * as invoices from "./invoices.json";
import * as plays from "./plays.json";

invoices.forEach(invoice => {
  console.log(statement(invoice, plays));
});
