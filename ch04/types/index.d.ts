export interface ProvinceData {
  name: string;
  producers: Array<ProducerData>;
  demand: number;
  price: number;
}

export interface ProducerData {
  name: string;
  cost: number;
  production: number;
}
