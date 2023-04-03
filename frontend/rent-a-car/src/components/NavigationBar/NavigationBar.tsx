import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import { Route } from "@/model/Route";
import { useRouter } from "next/router";

interface INavigationBar {
  navigationItems: Route[];
}

export const NavigationBar: FC<INavigationBar> = ({ navigationItems }) => {
  const router = useRouter();
  const [selectedNavigationItem, setselectedNavigationItem] = useState<string>(
    router.pathname.substring(1)
  );
  console.log(selectedNavigationItem === "clients");

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
