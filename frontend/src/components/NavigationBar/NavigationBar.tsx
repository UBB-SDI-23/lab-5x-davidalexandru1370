import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import { Route } from "@/model/Route";
import { AppBar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import { RolesEnum } from "@/enums/RolesEnum";

interface INavigationBar {
  navigationItems: Route[];
}

export const NavigationBar: FC<INavigationBar> = ({ navigationItems }) => {
  let router = useRouter();
  const [selectedNavigationItem, setselectedNavigationItem] = useState<string>(
    router.pathname.substring(1)
  );

  const colorRoles = new Map<number, string>([
    [RolesEnum.Regular, ""],
    [RolesEnum.Moderator, "orange"],
    [RolesEnum.Admin, "red"],
  ]);

  const { isAuthentificated, userDto, reFetch } = useContext(
    AuthentificationContext
  );
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setselectedNavigationItem(router.pathname.substring(1));
  }, [router.pathname, router.isReady]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  if (
    navigationItems.find(
      (v) => v.routeName.localeCompare(selectedNavigationItem) === 0
    ) === undefined &&
    selectedNavigationItem.localeCompare("user/[username]") !== 0
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
                  <span style={{ color: `${colorRoles.get(userDto!.role)}` }}>
                    Hello &nbsp;{userDto!.username}
                  </span>
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
                onClick={() => {}}
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
