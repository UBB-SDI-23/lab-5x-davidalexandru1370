import { Box, Button, Paper, TextField } from "@mui/material";
import React from "react";
import styles from "./login.module.css";
import styled from "@emotion/styled";

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
  return (
    <div className={`${styles.content}`}>
      <Box sx={contentStyle}>
        <WhiteBorderTextField
          label="Username"
          sx={{
            label: { color: "royalblue" },
          }}
        ></WhiteBorderTextField>
        <WhiteBorderTextField
          label="Password"
          type="password"
          sx={{ label: { color: "royalblue" } }}
        ></WhiteBorderTextField>
        <MyButton variant="contained">Login</MyButton>
      </Box>
    </div>
  );
};

export default Login;
