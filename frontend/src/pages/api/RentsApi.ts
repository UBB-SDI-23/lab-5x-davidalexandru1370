import { Methods, RentEndpoints, baseUrl } from "@/constants/ApiConstants";
import IPagination from "@/model/Pagination";
import VehicleRent from "@/model/VehicleRent";
import VehicleRentDto from "@/model/VehicleRentDto";
import { createHeader } from "@/utilities/utilities";
import { METHODS } from "http";

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

export const updateVehicleRent = async (vehicleRent: VehicleRent) => {
  let url = baseUrl + RentEndpoints.updateRent;
  let header = createHeader(Methods.PUT, vehicleRent);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    })
    .then((updatedVehicleRent: VehicleRent) => {
      return updatedVehicleRent;
    });

  return data;
};

export const addVehicleRent = async (vehicleRentDto: VehicleRentDto) => {
  let url = baseUrl + RentEndpoints.addRent;
  let header = createHeader(Methods.POST, vehicleRentDto);
  await fetch(url, header).then(async (response: Response) => {
    if (response.status >= 400) {
      throw new Error(response.statusText);
    }
  });
};
