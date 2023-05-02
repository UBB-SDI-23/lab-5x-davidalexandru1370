import { Methods, UserEndpoints, baseUrl } from "@/constants/ApiConstants";
import { AuthResult } from "@/model/AuthResult";
import { LoginCredentials } from "@/model/LoginCredentials";
import { UserDto } from "@/model/UserDto";
import { createHeader } from "@/utilities/utilities";

export const login = async (loginCredentials: LoginCredentials) => {
  let url = baseUrl + UserEndpoints.login;
  let header = createHeader(Methods.POST, loginCredentials);
  let data: AuthResult = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((authResult: AuthResult) => {
      return authResult;
    });

  if (data.result === false) {
    throw new Error(data.error!);
  } else {
    localStorage.setItem("token", data.accessToken!);
  }
};

export const register = async (userDto: UserDto) => {
  let url = baseUrl + UserEndpoints.register;
  let header = createHeader(Methods.POST, userDto);
  let data: AuthResult = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((authResult: AuthResult) => {
      return authResult;
    });

  if (data.result === false) {
    throw new Error(data.error!);
  } else {
    localStorage.setItem("token", data.accessToken!);
  }
};
