import { ClientEndpoints, Methods, baseUrl } from "@/constants/ApiConstants";
import { Client } from "@/model/Client";
import { ClientDto } from "@/model/ClientDto";
import { createHeader } from "@/utilities/utilities";

export const getAllClients = async () => {
  let url = baseUrl + ClientEndpoints.getAllClients;
  let header = createHeader(Methods.GET);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((data: Client[]) => {
      return data;
    });

  return data;
};

export const deleteClientById = async (clientId: string) => {
  let url = baseUrl + ClientEndpoints.deleteClient + "/" + clientId;
  let header = createHeader(Methods.DELETE);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });

  return data;
};

export const addClient = async (client: ClientDto) => {
  let url = baseUrl + ClientEndpoints.addClient;
  let header = createHeader(Methods.POST, JSON.stringify(client));
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((c: Client) => {
      return c;
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });

  return data;
};
