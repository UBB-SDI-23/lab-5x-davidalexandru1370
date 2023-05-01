import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ backgroundColor: "#282828", height: "100vh" }}>
      <NavigationBar
        navigationItems={[
          { name: "Clients", routeName: "clients" },
          { name: "Vehicles", routeName: "vehicles" },
          { name: "Rents", routeName: "rents" },
        ]}
      />
      <ToastContainer />
      <Component {...pageProps} />
    </div>
  );
}
