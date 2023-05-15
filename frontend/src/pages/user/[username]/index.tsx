import { UserDto } from "@/model/UserDto";
import {
  changeNumberOfItemsPerPage,
  changeUserRole,
  getUserDataByUsername,
  getUserDataWithStatistcs,
  refreshData,
} from "@/pages/api/UserApi";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../user.module.css";
import { useRouter } from "next/dist/client/router";
import { GenderEnum } from "@/enums/GenderEnum";
import { MaritalStatusEnum } from "@/enums/MaritalStatusEnum";
import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import PaginationDropDown from "@/components/PaginationDropDown/PaginationDropDown";
import { RolesEnum } from "@/enums/RolesEnum";
import EnumDropDown from "@/components/EnumDropDown/EnumDropDown";
const User = () => {
  const router = useRouter();
  //const username = router.query.username;
  const [user, setUser] = useState<UserDto | undefined>(undefined);
  const [role, setRole] = useState<RolesEnum>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { isAuthentificated, userDto, reFetch, skip, take, setSkip, setTake } =
    useContext(AuthentificationContext);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const username = router.query.username?.toString();

    try {
      getUserDataWithStatistcs(username!.toString()).then((x) => {
        if (typeof x === "string") {
          toast(x, {
            type: "error",
          });
          router.push("/login");
        } else {
          setUser(x);
          setRole(x.role);
          setIsFetching(false);
        }
      });
    } catch (error) {}
  }, [router.isReady, router.query]);

  if (isFetching === true) {
    return (
      <Box
        sx={{
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography>Loading user data...</Typography>
      </Box>
    );
  }

  return (
    <div className={styles.content}>
      <Box>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Username"
          defaultValue={user!.username}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Bio"
          defaultValue={user!.bio}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Birthday"
          defaultValue={user!.birthday}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Gender"
          defaultValue={GenderEnum[user!.gender]}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Marital Status"
          defaultValue={MaritalStatusEnum[user!.maritalStatus]}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Clients added"
          defaultValue={user!.numberOfClients}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Vehicles added"
          defaultValue={user!.numberOfVehicles}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Incidents added"
          defaultValue={user!.numberOfIncidents}
          autoFocus
        ></TextField>
        <TextField
          sx={{ padding: "20px" }}
          disabled
          multiline
          label="Rents added"
          defaultValue={user!.numberOfRents}
          autoFocus
        ></TextField>
        {isAuthentificated === true && userDto !== null && (
          <>
            {userDto?.role === RolesEnum.Admin && user !== undefined && (
              <>
                <EnumDropDown
                  dataEnum={RolesEnum}
                  label={"Role"}
                  defaultValue={user!.role.toString()}
                  style={{ width: "200px" }}
                  onChange={(value) => {
                    setRole(value);
                  }}
                ></EnumDropDown>
                <PaginationDropDown
                  take={take.toString()}
                  handleOnChange={async (e) => {
                    await changeNumberOfItemsPerPage(e);
                    setTake(e);
                  }}
                />
                <Button
                  variant="contained"
                  onClick={async () => {
                    await refreshData();
                  }}
                >
                  Bulk delete and update
                </Button>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    disabled={user.role === role}
                    onClick={async () => {
                      try {
                        await changeUserRole(user!.username, role!);
                        toast("Role changed succesfully!", {
                          type: "success",
                        });
                        setUser({ ...user, role: role! });
                      } catch (error) {
                        toast((error as Error).message, {
                          type: "error",
                        });
                      }
                    }}
                  >
                    Update profile
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default User;
