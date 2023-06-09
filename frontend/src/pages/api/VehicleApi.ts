import { Methods, VehicleEndpoints, baseUrl } from "@/constants/ApiConstants";
import IPagination from "@/model/Pagination";
import { Vehicle } from "@/model/Vehicle";
import { VehicleDto } from "@/model/VehicleDto";
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
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });

  return data;
};

export const deleteVehicleById = async (vehicle: Vehicle) => {
  let url = baseUrl + VehicleEndpoints.deleteVehicle;
  let header = createHeader(Methods.DELETE, vehicle);
  let data = await fetch(url, header).then(async (response: Response) => {
    if (response.status >= 400) {
      return response.text().then((x) => {
        throw new Error(x);
      });
    }
  });

  return data;
};

export const addVehicle = async (vehicle: VehicleDto) => {
  let url: string = baseUrl + VehicleEndpoints.addVehicle;
  let header = createHeader(Methods.POST, vehicle);
  let data: Vehicle = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((v) => {
      return v;
    });

  return data;
};

export const getVehiclesPaginated = async (skip: number, take: number) => {
  let url: string = baseUrl + VehicleEndpoints.getVehiclesPaginated(skip, take);
  let header = createHeader(Methods.GET);
  let data: IPagination<VehicleDto> = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((v) => {
      return v;
    });

  return data;
};

export const getVehiclesByCarPlate = async (carPlate: string) => {
  let url: string = baseUrl + VehicleEndpoints.getVehiclesByCarPlate(carPlate);
  let header = createHeader(Methods.GET);
  let data: Vehicle[] = await fetch(url, header)
    .then(async (response: Response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    })
    .then((vehicles: Vehicle[]) => {
      return vehicles;
    });

  return data;
};

export const updateVehicle = async (vehicle: Vehicle) => {
  let url: string = baseUrl + VehicleEndpoints.updateVehicle;
  let header = createHeader(Methods.PUT, vehicle);
  let data: VehicleDto = await fetch(url, header)
    .then(async (response: Response) => {
      if (response.status >= 400) {
        return response.json().then((e) => {
          throw new Error(e.errors.errors);
        });
      }
      return await response.json();
    })
    .then((v: VehicleDto) => {
      return v;
    });

  return data;
};
