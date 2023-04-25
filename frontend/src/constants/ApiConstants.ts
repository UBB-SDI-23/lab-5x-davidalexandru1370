const PRODUCTION_RentAVehicleApi_URL = "https://104.155.121.9/";
const DEVELOPMENT_RentAVehicleApi_URL = "https://localhost:7037/";

export const baseUrl =
  (process.env.NODE_ENV === "development"
    ? DEVELOPMENT_RentAVehicleApi_URL
    : PRODUCTION_RentAVehicleApi_URL) + "api/";

export const clientController = "client/";
export const vehicleController = "vehicle/";
export const incidentController = "incidents/";
export const rentsController = "vehiclerent/";

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
  deleteVehicle: (vehicleId: string) => string;
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
  deleteRent: (rentId: string) => string;
  getRentsPaginated: (skip: number, take: number) => string;
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
  deleteVehicle: (vehicleId: string) =>
    vehicleController + "delete/" + vehicleId,
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
  deleteRent: (rentId: string) => rentsController + "delete-rent/" + rentId,
  getRentsPaginated: (skip: number, take: number) =>
    rentsController + "get-vehiclerents-paginated" + "/" + skip + "/" + take,
};
