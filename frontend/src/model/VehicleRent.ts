import { Client } from "./Client";
import { Owner } from "./Owner";
import { UserDto } from "./UserDto";
import { Vehicle } from "./Vehicle";

export default interface VehicleRent {
  id: string;
  vehicle?: Vehicle;
  client?: Client;
  startDate: string;
  endDate: string;
  totalCost: number;
  comments?: string;
  owner: Owner;
}
