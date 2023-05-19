import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./login.module.css";
import styled from "@emotion/styled";
import { login } from "../api/UserApi";
import { LoginCredentials } from "@/model/LoginCredentials";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";

const contentStyle = {
  padding: "2rem",
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderColor: "white",
  height: "50%",
};

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }

  & .MuiInputBase-input {
    color: white;
  }
`;

const MyButton = styled(Button)`
  &.MuiButtonBase-root {
    width: 150px;
  }
`;

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  const { reFetch } = useContext(AuthentificationContext);
  return (
    <div className={`${styles.content}`}>
      <Box sx={contentStyle}>
        <WhiteBorderTextField
          label="Username"
          id="username-input"
          sx={{
            label: { color: "royalblue" },
          }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></WhiteBorderTextField>
        <WhiteBorderTextField
          label="Password"
          id="password-input"
          type="password"
          sx={{ label: { color: "royalblue" } }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></WhiteBorderTextField>
        <MyButton
          disabled={username === "" || password === ""}
          variant="contained"
          onClick={async () => {
            try {
              const loginCrendetials: LoginCredentials = {
                username: username,
                password: password,
              };
              await login(loginCrendetials);
              router.push("/clients", undefined, {
                shallow: false,
              });
              reFetch();
            } catch (error) {
              toast((error as Error).message, {
                type: "error",
              });
            }
          }}
        >
          Login
        </MyButton>
      </Box>
    </div>
  );
};

export default Login;
