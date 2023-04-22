import { Route } from "@/model/Route";
import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import styles from "./NavigationBar.module.css";
import { injectStyle } from "react-toastify/dist/inject-style";

interface INavigationBar {
  navigationItems: Route[];
}

export const NavigationBar: FC<INavigationBar> = ({ navigationItems }) => {
  const router = useRouter();
  const [selectedNavigationItem, setselectedNavigationItem] = useState<string>(
    router.pathname.substring(1)
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          ".MuiToolbar-root": {
            display: "flex",
            justifyContent: "end",
          },
        }}
      >
        <Toolbar>
          {navigationItems.map((navigationItem: Route) => {
            return (
              <Link
                className={`${styles.navigationItem} ${
                  navigationItem.routeName.localeCompare(
                    selectedNavigationItem
                  ) === 0
                    ? styles.selectedNavigationItem
                    : ""
                }`}
                onClick={() => {
                  setselectedNavigationItem(navigationItem.routeName);
                }}
                key={navigationItem.name}
                href={`/${navigationItem.routeName}`}
              >
                {navigationItem.name}
              </Link>
            );
          })}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
