import { RolesEnum } from "@/enums/RolesEnum";

const PRODUCTION_RentAVehicleApi_URL = "https://mpp-docker.crabdance.com/";
const DEVELOPMENT_RentAVehicleApi_URL = "http://localhost:5000/";

export const baseUrl =
  (process.env.NODE_ENV === "development"
    ? DEVELOPMENT_RentAVehicleApi_URL
    : PRODUCTION_RentAVehicleApi_URL) + "api/";

export const clientController = "client/";
export const vehicleController = "vehicle/";
export const incidentController = "incidents/";
export const rentsController = "vehiclerent/";
export const userController = "user/";

export enum Methods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
}

interface ClientEndpoint {
  getAllClients: string;
  addClient: string;
  deleteClient: string;
  updateClient: string;
  getClientById: string;
  getClientsPaginated: (skip: number, take: number) => string;
  getClientsByName: (name: string) => string;
}

interface VehicleEndpoint {
  getAllVehicles: string;
  addVehicle: string;
  updateVehicle: string;
  filterVehiclesByEngineCapacity: (capacity: string) => string;
  deleteVehicle: string;
  getVehiclesPaginated: (skip: number, take: number) => string;
  getVehiclesByCarPlate: (name: string) => string;
}

interface IncidentEndpoint {
  getIncidentsByVehicleId: (vehicleId: string) => string;
}

interface RentsEndpoint {
  getAllRents: string;
  addRent: string;
  updateRent: string;
  deleteRent: string;
  getNumberOfRentedVehiclesByClientId: (clientId: string) => string;
  getRentsPaginated: (skip: number, take: number) => string;
}

interface UserEndpoint {
  login: string;
  register: string;
  validateAccount: (token: string) => string;
  getUserDataByUsername: (username: string) => string;
  authorize: string;
  getUserDataWithStatistics: (username: string) => string;
  changeUserRole: (username: string, role: RolesEnum) => string;
  runDataGenerationScripts: string;
  changeNumberOfItemsPerPage: (value: number) => string;
}

export const ClientEndpoints: ClientEndpoint = {
  getAllClients: clientController + "get-clients",
  addClient: clientController + "add-client",
  deleteClient: clientController + "delete-client",
  updateClient: clientController + "update-client",
  getClientById: clientController + "get-client",
  getClientsPaginated: (skip, take) =>
    clientController + "get-clients-paginated/" + skip + "/" + take,
  getClientsByName: (name: string) =>
    clientController + "get-clients-by-name/" + name,
};

export const VehicleEndpoints: VehicleEndpoint = {
  getAllVehicles: vehicleController + "get-all",
  addVehicle: vehicleController + "add-vehicle",
  updateVehicle: vehicleController + "update",
  filterVehiclesByEngineCapacity: (capacity) =>
    vehicleController + "get-vehicles-filtered/" + capacity,
  deleteVehicle: vehicleController + "delete",
  getVehiclesPaginated: (skip, take) =>
    vehicleController + "get-vehicles-paginated/" + skip + "/" + take,
  getVehiclesByCarPlate: (name: string) =>
    vehicleController + "get-vehicles-by-carPlate/" + name,
};

export const IncidentEndpoints: IncidentEndpoint = {
  getIncidentsByVehicleId: (vehicleId) =>
    incidentController + "get-by-vehicleId/" + vehicleId,
};

export const RentEndpoints: RentsEndpoint = {
  getAllRents: rentsController + "get-all",
  addRent: rentsController + "add-rent",
  updateRent: rentsController + "update-vehicleRent",
  deleteRent: rentsController + "delete-rent/",
  getRentsPaginated: (skip: number, take: number) =>
    rentsController + "get-vehiclerents-paginated" + "/" + skip + "/" + take,
  getNumberOfRentedVehiclesByClientId: (clientId) =>
    rentsController + "get-rents-by-clientId/" + clientId,
};

export const UserEndpoints: UserEndpoint = {
  login: userController + "login",
  register: userController + "register",
  validateAccount: (token: string) =>
    userController + "validate-account/" + token,
  getUserDataByUsername: (username: string): string => {
    return userController + "get-user/" + username;
  },
  authorize: userController + "authorize",
  getUserDataWithStatistics: (username: string) => {
    return userController + "get-user-with-statistics/" + username;
  },
  changeUserRole: (username: string, role: RolesEnum) => {
    return userController + "change-user-role/" + username + "/" + role;
  },
  runDataGenerationScripts: "run-data-generation-scripts",
  changeNumberOfItemsPerPage: (value: number) => {
    return userController + "change-number-of-items-per-page/" + value;
  },
};
