import Province from "./Province";
import {ProducerData} from "./types";

export default class Producer {
  private _province: Province;
  private _cost: number;
  private _name: string;
  private _production: number = 0;

  constructor(aProvince: Province, data: ProducerData) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get name(): string {
    return this._name;
  }

  get cost(): number {
    return this._cost;
  }

  set cost(value: number) {
    this._cost = value;
  }

  get production(): number {
    return this._production;
  }

  set production(value: number) {
    this._province.totalProduction += value - this._production;
    this._production = value;
  }
}
