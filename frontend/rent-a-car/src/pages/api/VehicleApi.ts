import { Methods, VehicleEndpoints, baseUrl } from "@/constants/ApiConstants";
import { Vehicle } from "@/model/Vehicle";
import { createHeader } from "@/utilities/utilities";

export const getAllVehicles = async () => {
  let url = baseUrl + VehicleEndpoints.getAllVehicles;
  let header = createHeader(Methods.GET);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((data: Vehicle[]) => {
      return data;
    });

  return data;
};

export const filterVehiclesByEngineCapacity = async (capacity: number) => {
  let url =
    baseUrl +
    VehicleEndpoints.filterVehiclesByEngineCapacity(capacity.toString());
  let header = createHeader(Methods.GET);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((data: Vehicle[]) => {
      return data;
    });

  return data;
};
