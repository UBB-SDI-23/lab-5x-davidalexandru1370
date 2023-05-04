import { GenderEnum } from "@/enums/GenderEnum";
import { MaritalStatusEnum } from "@/enums/MaritalStatusEnum";

export interface UserDto {
  username: string;
  bio: string;
  location: string;
  birthday: string;
  gender: GenderEnum;
  maritalStatus: MaritalStatusEnum;
  numberOfClients?: number;
  numberOfVehicles?: number;
  numberOfIncidents?: number;
  numberOfRents?: number;
}
