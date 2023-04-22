import { Client } from "./Client";
import { Vehicle } from "./Vehicle";

export default interface VehicleRent {
  id: string;
  vehicle?: Vehicle;
  client?: Client;
  startDate: string;
  endDate: string;
  totalCost: number;
  comments?: string;
}
