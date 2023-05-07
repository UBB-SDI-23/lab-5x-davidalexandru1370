import { Client } from "./Client";
import { Owner } from "./Owner";
import { Vehicle } from "./Vehicle";

export default interface VehicleRentDto {
  id?: string;
  vehicleId: string;
  clientId: string;
  vehicle?: Vehicle;
  client?: Client;
  startDate: string;
  endDate: string;
  totalCost: number;
  comments?: string;
  owner: Owner;
  numberOfTimesRented?: string;
}
