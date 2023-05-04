import { UserDto } from "@/model/UserDto";
import {
  getUserDataByUsername,
  getUserDataWithStatistcs,
} from "@/pages/api/UserApi";
import {
  Box,
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
const User = () => {
  const router = useRouter();
  //const username = router.query.username;
  const [user, setUser] = useState<UserDto | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { isAuthentificated, userDto, reFetch, skip, take, setSkip, setTake } =
    useContext(AuthentificationContext);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isFetching === false) {
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
          setIsFetching(false);
        }
      });
    } catch (error) {}
  }, [router.isReady]);

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
          <PaginationDropDown
            take={take.toString()}
            handleOnChange={(e) => {
              setTake(e);
            }}
          />
        )}
      </Box>
    </div>
  );
};

export default User;
