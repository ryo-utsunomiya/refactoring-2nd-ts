import * as fs from "fs";
import { statement } from "./statement";

function readJSONSync(filePath) {
  return JSON.parse(fs.readFileSync(filePath, { encoding: "UTF-8" }));
}

const invoices = readJSONSync("./invoices.json");
const plays = readJSONSync("./plays.json");

invoices.forEach(invoice => {
  console.log(statement(invoice, plays));
});
