import { ClientEndpoints, Methods, baseUrl } from "@/constants/ApiConstants";
import { Client } from "@/model/Client";
import { ClientDto } from "@/model/ClientDto";
import IPagination from "@/model/Pagination";
import { createHeader } from "@/utilities/utilities";

export const deleteClientById = async (client: Client) => {
  let url = baseUrl + ClientEndpoints.deleteClient;
  let header = createHeader(Methods.DELETE, client);
  let data = await fetch(url, header).catch((error: Error) => {
    throw new Error(error.message);
  });

  return data;
};

export const addClient = async (client: ClientDto) => {
  let url = baseUrl + ClientEndpoints.addClient;
  let header = createHeader(Methods.POST, client);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
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

export const updateClient = async (client: Client) => {
  let url = baseUrl + ClientEndpoints.updateClient;
  let header = createHeader(Methods.PUT, client);
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

export const getClientsPaginated = async (skip: number, take: number) => {
  let url = baseUrl + ClientEndpoints.getClientsPaginated(skip, take);
  let header = createHeader(Methods.GET);
  let data: IPagination<ClientDto> = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((clients: IPagination<ClientDto>) => {
      return clients;
    });

  return data;
};

export const getClientsByName = async (name: string) => {
  let url = baseUrl + ClientEndpoints.getClientsByName(name);
  let header = createHeader(Methods.GET);
  let data: Client[] = await fetch(url, header)
    .then(async (response: Response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    })
    .then((clients: Client[]) => {
      return clients;
    });

  return data;
};
