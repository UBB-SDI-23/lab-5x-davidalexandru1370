import { UserDto } from "@/model/UserDto";
import { getUserDataByUsername } from "@/pages/api/UserApi";
import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../user.module.css";
import { useRouter } from "next/dist/client/router";
import { GenderEnum } from "@/enums/GenderEnum";
import { MaritalStatusEnum } from "@/enums/MaritalStatusEnum";
const User = () => {
  const router = useRouter();
  //const username = router.query.username;
  const [user, setUser] = useState<UserDto | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isFetching === false) {
      return;
    }
    const username = router.query.username?.toString();
    try {
      getUserDataByUsername(username!.toString()).then((x) => {
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
      <TextField
        disabled
        multiline
        label="Username"
        defaultValue={user!.username}
        autoFocus
      ></TextField>
      <TextField
        disabled
        multiline
        label="Bio"
        defaultValue={user!.bio}
        autoFocus
      ></TextField>
      <TextField
        disabled
        multiline
        label="Birthday"
        defaultValue={user!.birthday}
        autoFocus
      ></TextField>
      <TextField
        disabled
        multiline
        label="Gender"
        defaultValue={GenderEnum[user!.gender]}
        autoFocus
      ></TextField>
      <TextField
        disabled
        multiline
        label="Marital Status"
        defaultValue={MaritalStatusEnum[user!.maritalStatus]}
        autoFocus
      ></TextField>
    </div>
  );
};

export default User;
