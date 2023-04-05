import { Methods } from "@/constants/ApiConstants";

export const createHeader = (method: Methods, entity?: any) => {
  let headerOptions: RequestInit = {
    method: `${method}`,
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  };

  if (entity !== undefined) {
    headerOptions = { ...headerOptions, body: JSON.stringify(entity) };
  }
  return headerOptions;
};
