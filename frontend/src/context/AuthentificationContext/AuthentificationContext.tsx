import { UserDto } from "@/model/UserDto";
import { authorize, changeNumberOfItemsPerPage } from "@/pages/api/UserApi";
import { FC, createContext, useEffect, useState } from "react";

interface IAuthentificationContext {
  isAuthentificated: boolean;
  userDto?: UserDto;
  reFetch: () => void;
  take: number;
  skip: number;
  setTake: (value: number) => void;
  setSkip: (value: number) => void;
}

export const AuthentificationContext = createContext<IAuthentificationContext>({
  isAuthentificated: false,
  userDto: undefined,
  reFetch: () => {},
  skip: 0,
  take: 12,
  setTake: (value) => {},
  setSkip: (value) => {},
});

export const AuthentificationContextProvider: FC<{ children: any }> = ({
  children,
}) => {
  const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDto | undefined>();
  const [rerender, forceRerender] = useState<number>(0);
  const [take, setTake] = useState<number>(12);
  const [skip, setSkip] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      authorize(localStorage.getItem("token")!).then((x) => {
        setUser(x);
        setIsAuthentificated(true);
        console.log(x.numberOfItemsPerPage!);
        setTake(x.numberOfItemsPerPage!);
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
        skip: skip,
        take: take,
        setSkip: (value) => {
          setSkip(value);
        },
        setTake: async (value) => {
          setTake(value);
          await changeNumberOfItemsPerPage(value);
        },
      }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};
