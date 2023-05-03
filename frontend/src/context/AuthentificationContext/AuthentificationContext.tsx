import { UserDto } from "@/model/UserDto";
import { authorize } from "@/pages/api/UserApi";
import { FC, createContext, useEffect, useState } from "react";

interface IAuthentificationContext {
  isAuthentificated: boolean;
  userDto?: UserDto;
  reFetch: () => void;
}

export const AuthentificationContext = createContext<IAuthentificationContext>({
  isAuthentificated: false,
  userDto: undefined,
  reFetch: () => {},
});

export const AuthentificationContextProvider: FC<{ children: any }> = ({
  children,
}) => {
  const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDto | undefined>();
  const [rerender, forceRerender] = useState<number>(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      authorize(token).then((x) => {
        setUser(x);
        setIsAuthentificated(true);
      });
    }
  }, [rerender]);

  return (
    <AuthentificationContext.Provider
      value={{
        isAuthentificated: isAuthentificated,
        userDto: user,
        reFetch: () => {
          forceRerender(rerender + 1);
        },
      }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};
