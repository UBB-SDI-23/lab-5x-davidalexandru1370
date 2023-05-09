import { Owner } from "./Owner";

export interface Vehicle {
  id: string;
  brand: string;
  horsePower: number;
  carPlate: string;
  numberOfSeats: number;
  owner: Owner;
  engineCapacity: number;
  fabricationDate: string;
}
