const PRODUCTION_RentAVehicleApi_URL = "https://104.155.121.9/";
const DEVELOPMENT_RentAVehicleApi_URL = "http://localhost:5199/";

export const baseUrl =
  (process.env.NODE_ENV === "development"
    ? DEVELOPMENT_RentAVehicleApi_URL
    : PRODUCTION_RentAVehicleApi_URL) + "/api/";

export const clientController = "client/";
export const vehicleController = "vehicle/";
export const incidentController = "incidents/";

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
}

interface VehicleEndpoint {
  getAllVehicles: string;
  addVehicle: string;
  filterVehiclesByEngineCapacity: (capacity: string) => string;
  deleteVehicle: (vehicleId: string) => string;
  getVehiclesPaginated: (skip: number, take: number) => string;
}

interface IncidentEndpoint {
  getIncidentsByVehicleId: (vehicleId: string) => string;
}

export const ClientEndpoints: ClientEndpoint = {
  getAllClients: clientController + "get-clients",
  addClient: clientController + "add-client",
  deleteClient: clientController + "delete-client",
  updateClient: clientController + "update-client",
  getClientById: clientController + "get-client",
  getClientsPaginated: (skip, take) =>
    clientController + "get-clients-paginated/" + skip + "/" + take,
};

export const VehicleEndpoints: VehicleEndpoint = {
  getAllVehicles: vehicleController + "get-all",
  addVehicle: vehicleController + "add-vehicle",
  filterVehiclesByEngineCapacity: (capacity) =>
    vehicleController + "get-vehicles-filtered/" + capacity,
  deleteVehicle: (vehicleId: string) =>
    vehicleController + "delete/" + vehicleId,
  getVehiclesPaginated: (skip, take) =>
    vehicleController + "get-vehicles-paginated/" + skip + "/" + take,
};

export const IncidentEndpoints: IncidentEndpoint = {
  getIncidentsByVehicleId: (vehicleId) =>
    incidentController + "get-by-vehicleId/" + vehicleId,
};
