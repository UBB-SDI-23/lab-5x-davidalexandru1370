import { Methods, UserEndpoints, baseUrl } from "@/constants/ApiConstants";
import { RolesEnum } from "@/enums/RolesEnum";
import { AuthResult } from "@/model/AuthResult";
import { LoginCredentials } from "@/model/LoginCredentials";
import { RegisterCredentials } from "@/model/RegisterCredentials";
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
    localStorage.removeItem("token");
    localStorage.setItem("token", data.accessToken!);
  }
};

export const register = async (
  userDto: RegisterCredentials
): Promise<string> => {
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
  }

  return data.accessToken!;
};

export const validateAccount = async (token: string) => {
  let url = baseUrl + UserEndpoints.validateAccount(token);
  let header = createHeader(Methods.DELETE);
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
    localStorage.removeItem("token");
    localStorage.setItem("token", data.accessToken!);
  }
};

export const getUserDataByUsername = async (username: string) => {
  let url = baseUrl + UserEndpoints.getUserDataByUsername(username);
  let header = createHeader(Methods.GET);
  let data: UserDto | string = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((result: UserDto | string) => {
      return result;
    });

  return data;
};

export const authorize = async (token: string) => {
  let url = baseUrl + UserEndpoints.authorize;
  let header = createHeader(Methods.POST, token);
  let data: UserDto = await fetch(url, header)
    .then(async (response: Response) => {
      if (response.status === 403) {
        return Promise.reject();
      }
      return await response.json();
    })
    .then((userDto: UserDto) => {
      return userDto;
    });

  return data;
};

export const getUserDataWithStatistcs = async (username: string) => {
  let url = baseUrl + UserEndpoints.getUserDataWithStatistics(username);
  let header = createHeader(Methods.GET);
  let data: UserDto | string = await fetch(url, header)
    .then(async (response: Response) => {
      return await response.json();
    })
    .then((userDto: UserDto | string) => {
      return userDto;
    });

  return data;
};

export const changeUserRole = async (username: string, role: RolesEnum) => {
  let url = baseUrl + UserEndpoints.changeUserRole(username, role);
  let header = createHeader(Methods.PUT);
  await fetch(url, header)
    .then(async (response: Response) => {
      if (response.status >= 400) {
        return await response.json();
      }
      return;
    })
    .then((x: string) => {
      throw new Error(x);
    });
};
