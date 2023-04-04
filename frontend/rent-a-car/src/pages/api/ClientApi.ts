import { ClientEndpoints, Methods, baseUrl } from "@/constants/ApiConstants";
import { Client } from "@/model/Client";
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
  let data = await fetch(url)
    .then(async (response: Response) => {
      return await response.json();
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
};
