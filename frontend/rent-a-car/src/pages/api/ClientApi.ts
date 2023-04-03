import { ClientEndpoints, Methods, baseUrl } from "@/Constants/ApiConstants";
import { Client } from "@/model/Client";
import { createHeader } from "@/utilities/utilities";

export const getAllClients = async () => {
  let url = baseUrl + ClientEndpoints.getAllClients;
  let header = createHeader(Methods.GET);
  await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((data: Client[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
};
