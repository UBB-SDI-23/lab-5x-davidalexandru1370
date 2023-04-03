import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavigationBar
        navigationItems={["Clients", "Vehicles", "Rents", "Incidents"]}
      />
      <Component {...pageProps} />
    </>
  );
}
