import { Methods, RentEndpoints, baseUrl } from "@/constants/ApiConstants";
import VehicleRent from "@/model/VehicleRent";
import { createHeader } from "@/utilities/utilities";

export const getRentsPaginated = async (skip: number, take: number) => {
  let url = baseUrl + RentEndpoints.getRentsPaginated(skip, take);
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
