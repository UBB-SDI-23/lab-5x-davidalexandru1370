import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import { Route } from "@/model/Route";
import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";

interface INavigationBar {
  navigationItems: Route[];
}

export const NavigationBar: FC<INavigationBar> = ({ navigationItems }) => {
  let router = useRouter();
  const [selectedNavigationItem, setselectedNavigationItem] = useState<string>(
    router.pathname.substring(1)
  );

  const { isAuthentificated, userDto, reFetch } = useContext(
    AuthentificationContext
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (
    navigationItems.find(
      (v) => v.routeName.localeCompare(selectedNavigationItem) === 0
    ) === undefined
  ) {
    return <></>;
  }

  const handleOnMenuClose = () => {
    setAnchorEl(null);
  };

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
          {isAuthentificated === true ? (
            <>
              <div style={{ cursor: "pointer" }}>
                <Button
                  id="account-menu-button"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                >
                  Hello {userDto!.username}
                </Button>
                <Menu
                  id="account-menu"
                  open={open}
                  anchorEl={anchorEl}
                  MenuListProps={{ "aria-labelledby": "account-menu-button" }}
                  onClose={handleOnMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      router.push(`/user/${userDto?.username}`);
                      //router.reload();
                    }}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      router.reload();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Link
                className={`${styles.navigationItem}`}
                href={"/login"}
                onClick={() => {
                  //router.reload();
                }}
              >
                Sign in
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
