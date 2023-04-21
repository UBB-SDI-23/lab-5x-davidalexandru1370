import { Methods, RentEndpoints, baseUrl } from "@/constants/ApiConstants";
import IPagination from "@/model/Pagination";
import VehicleRent from "@/model/VehicleRent";
import { createHeader } from "@/utilities/utilities";

export const getRentsPaginated = async (skip: number, take: number) => {
  let url = baseUrl + RentEndpoints.getRentsPaginated(skip, take);
  let header = createHeader(Methods.GET);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((rents: IPagination<VehicleRent>) => {
      return rents;
    });

  return data;
};

export const deleteVehicleRentById = async (rentId: string) => {
  let url = baseUrl + RentEndpoints.deleteRent(rentId);
  let header = createHeader(Methods.DELETE);
  await fetch(url, header);
};
