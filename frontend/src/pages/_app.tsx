import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavigationBar
        navigationItems={[
          { name: "Clients", routeName: "clients" },
          { name: "Vehicles", routeName: "vehicles" },
          { name: "Rents", routeName: "rents" },
          { name: "Incidents", routeName: "incidents" },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
