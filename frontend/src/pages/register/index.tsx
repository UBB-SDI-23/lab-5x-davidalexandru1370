import React from "react";
import styles from "./register.module.css";
import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
const Register = () => {
  return (
    <div className={`${styles.content}`}>
      <Box sx={contentStyle}>
        <WhiteBorderTextField
          label="Username"
          sx={{
            label: { color: "royalblue" },
          }}
          onChange={() => {}}
        ></WhiteBorderTextField>
        <WhiteBorderTextField
          label="Password"
          type="password"
          sx={{ label: { color: "royalblue" } }}
          onChange={() => {}}
        ></WhiteBorderTextField>
        <WhiteBorderTextField
          label="Bio"
          multiline
          sx={{
            label: { color: "royalblue" },
          }}
          onChange={() => {}}
        ></WhiteBorderTextField>
        <MyButton variant="contained" onClick={async () => {}}>
          Register
        </MyButton>
      </Box>
    </div>
  );
};

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
export default Register;
