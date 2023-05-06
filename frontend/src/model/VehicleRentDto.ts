import { Client } from "./Client";
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
  ownerName: string;
  numberOfTimesRented?: string;
}
