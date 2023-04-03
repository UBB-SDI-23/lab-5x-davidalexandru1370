import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import { Route } from "@/model/Route";

interface INavigationBar {
  navigationItems: Route[];
}

export const NavigationBar: FC<INavigationBar> = ({ navigationItems }) => {
  const [selectedNavigationItem, setselectedNavigationItem] =
    useState<string>("");

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
          {navigationItems.map((navigationItem: Route, index) => {
            return (
              <Link
                className={`${styles.navigationItem} ${
                  navigationItem.name === selectedNavigationItem
                    ? styles.selectedNavigationItem
                    : ""
                }`}
                onClick={() => {
                  setselectedNavigationItem(navigationItem.name);
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
