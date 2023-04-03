export const baseUrl = "http://localhost:5199/";

export const clientController = "api/client/";

export enum Methods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
}

interface ClientEndpoint {
  getAll: string;
  addClient: string;
  deleteClient: string;
  updateClient: string;
  getClientById: string;
}

export const ClientEndpoints: ClientEndpoint = {
  getAll: clientController + "get-all",
  addClient: "",
  deleteClient: "",
  updateClient: "",
  getClientById: "",
};
