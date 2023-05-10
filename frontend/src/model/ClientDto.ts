import { Owner } from "./Owner";

export interface ClientDto {
  id?: string;
  name: string;
  cardNumber: string;
  cnp: string;
  birthday: string;
  nationality: string;
  owner: Owner;
  numberOfRents?: number;
}
