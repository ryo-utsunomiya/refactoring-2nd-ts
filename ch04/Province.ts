import {ProducerData, ProvinceData} from "./types";

export default class Province {
  private readonly _name: string;
  private _producers: Array<ProducerData> = [];
  private _totalProduction: number = 0;
  private _demand: number;
  private _price: number;

  constructor(doc: ProvinceData) {
    this._name = doc.name;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach(p => this.addProducer(p));
  }

  addProducer(producer: ProducerData) {
    this._producers.push(producer);
    this._totalProduction += producer.production;
  }

  get name(): string {
    return this._name;
  }

  get producers(): Array<ProducerData> {
    return this._producers;
  }

  get totalProduction(): number {
    return this._totalProduction;
  }

  set totalProduction(value: number) {
    this._totalProduction = value;
  }

  get demand(): number {
    return this._demand;
  }

  set demand(value: number) {
    this._demand = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get shortfall() {
    return this._demand - this.totalProduction;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }

  get profit() {
    return this.demandValue - this.demandCost;
  }
}
