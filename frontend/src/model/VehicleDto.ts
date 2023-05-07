import { Owner } from "./Owner";

export interface VehicleDto {
  id?: string;
  brand: string;
  horsePower: number;
  carPlate: string;
  numberOfSeats: number;
  engineCapacity: number;
  fabricationDate: string;
  owner: Owner;
  numberOfIncidents?: number;
}
