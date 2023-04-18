import { Methods, RentEndpoints, baseUrl } from "@/constants/ApiConstants";
import { createHeader } from "@/utilities/utilities";

export const getAllRents = async () => {
  let url = baseUrl + RentEndpoints.getAllRents;
  let header = createHeader(Methods.GET);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((rents: VehicleRent[]) => {
      return rents;
    });

  return data;
};
