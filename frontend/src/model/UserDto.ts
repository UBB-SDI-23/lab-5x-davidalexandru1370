import { GenderEnum } from "@/enums/GenderEnum";
import { MaritalStatusEnum } from "@/enums/MaritalStatusEnum";
import { RolesEnum } from "@/enums/RolesEnum";

export interface UserDto {
  username: string;
  bio: string;
  location: string;
  birthday: string;
  gender: GenderEnum;
  role: RolesEnum;
  maritalStatus: MaritalStatusEnum;
  numberOfItemsPerPage?: number;
  numberOfClients?: number;
  numberOfVehicles?: number;
  numberOfIncidents?: number;
  numberOfRents?: number;
}
