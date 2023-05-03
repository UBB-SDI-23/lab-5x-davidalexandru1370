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
    credentials: "omit",
  };

  if (entity !== undefined) {
    headerOptions = { ...headerOptions, body: JSON.stringify(entity) };
  }
  return headerOptions;
};

export const convertStringToDate = (date: string) => {
  // const dates = date.split("-");
  // return new Date(
  //   parseInt(dates[0]),
  //   parseInt(dates[1]) - 1,
  //   parseInt(dates[2]) + 1
  // );
  return new Date(date);
};

export const DOTS = "...";

export function computeAge(birthday: Date) {
  const today: number = Date.now();

  const differenceInMs: number = today - birthday.getTime();

  const differenceInYears: number =
    differenceInMs / (1000 * 60 * 60 * 24 * 365);

  const roundedDifference: number = Math.round(differenceInYears);

  return roundedDifference;
}
