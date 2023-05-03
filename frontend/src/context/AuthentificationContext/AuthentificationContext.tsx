import { FC, ReactNode, createContext, useState } from "react";

interface IAuthentificationContext {}

export const AuthentificationContext = createContext<IAuthentificationContext>(
  {}
);

export const AuthentificationContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false);
  return (
    <AuthentificationContext.Provider value={{}}>
      {children}
    </AuthentificationContext.Provider>
  );
};
