import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";

interface INavigationBar {
  navigationItems: string[];
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
          {navigationItems.map((navigationItem: string, index) => {
            return (
              <Link
                className={`${styles.navigationItem} ${
                  navigationItem === selectedNavigationItem
                    ? styles.selectedNavigationItem
                    : ""
                }`}
                onClick={() => {
                  setselectedNavigationItem(navigationItem);
                }}
                key={navigationItem}
              >
                {navigationItem}
              </Link>
            );
          })}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
