import { IncidentEndpoints, Methods, baseUrl } from "@/constants/ApiConstants";
import Incident from "@/model/Incident";
import { createHeader } from "@/utilities/utilities";

export const getIncidentsByVehicleId = async (vehicleId: string) => {
  let url = baseUrl + IncidentEndpoints.getIncidentsByVehicleId(vehicleId);
  let header = createHeader(Methods.GET);
  let data = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((data: Incident[]) => {
      return data;
    });

  return data;
};
