import { UserDto } from "@/model/UserDto";
import { authorize } from "@/pages/api/UserApi";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

interface IAuthentificationContext {}

export const AuthentificationContext = createContext<IAuthentificationContext>(
  {}
);

export const AuthentificationContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDto>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      authorize(token).then((x) => {
        setUser(user);
        setIsAuthentificated(true);
      });
    }
  }, []);

  return (
    <AuthentificationContext.Provider value={{}}>
      {children}
    </AuthentificationContext.Provider>
  );
};
