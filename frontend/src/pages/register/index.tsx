import React, { useReducer } from "react";
import styles from "./register.module.css";
import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import DatePicker from "../../components/DatePicker/DatePicker";
import EnumDropDown from "@/components/EnumDropDown/EnumDropDown";
import { GenderEnum } from "@/enums/GenderEnum";
import { MaritalStatusEnum } from "@/enums/MaritalStatusEnum";
import { UserDto } from "@/model/UserDto";
import { register } from "../api/UserApi";
import { toast } from "react-toastify";

enum RegisterActionKind {
  UPDATE,
}

interface RegisterAction {
  type: RegisterActionKind;
  payload: Partial<UserDto>;
}

function handleRegisterDispatch(state: UserDto, action: RegisterAction) {
  const { type, payload } = action;
  switch (type) {
    case RegisterActionKind.UPDATE:
      return {
        ...state,
        ...payload,
      };
  }
}

const Register = () => {
  const [userState, userDispatch] = useReducer(handleRegisterDispatch, {
    bio: "",
    birthday: "",
    gender: GenderEnum.Man,
    location: "",
    maritalStatus: MaritalStatusEnum.NeverMarried,
    password: "",
    username: "",
  } as UserDto);
  return (
    <div className={`${styles.content}`}>
      <Box sx={contentStyle}>
        <WhiteBorderTextField
          label="Username"
          sx={{
            label: { color: "royalblue" },
          }}
          onChange={(e) => {
            userDispatch({
              type: RegisterActionKind.UPDATE,
              payload: {
                username: e.target.value,
              },
            });
          }}
        ></WhiteBorderTextField>
        <WhiteBorderTextField
          label="Password"
          type="password"
          sx={{ label: { color: "royalblue" } }}
          onChange={(e) => {
            userDispatch({
              type: RegisterActionKind.UPDATE,
              payload: {
                password: e.target.value,
              },
            });
          }}
        ></WhiteBorderTextField>
        <WhiteBorderTextField
          label="Bio"
          multiline
          sx={{
            label: { color: "royalblue" },
          }}
          onChange={(e) => {
            userDispatch({
              type: RegisterActionKind.UPDATE,
              payload: {
                bio: e.target.value,
              },
            });
          }}
        ></WhiteBorderTextField>
        <WhiteBorderTextField
          label="Location"
          sx={{
            label: { color: "royalblue" },
          }}
          onChange={(e) => {
            userDispatch({
              type: RegisterActionKind.UPDATE,
              payload: {
                location: e.target.value,
              },
            });
          }}
        ></WhiteBorderTextField>
        <DatePicker
          label="Birthday"
          onChange={(e) => {
            try {
              //@ts-ignore
              const date: string = (e.$d as Date).toISOString().split("T")[0];
              userDispatch({
                type: RegisterActionKind.UPDATE,
                payload: {
                  birthday: date,
                },
              });
            } catch (error) {}
          }}
        />
        <EnumDropDown
          dataEnum={GenderEnum}
          style={{ width: "285px" }}
          label="Select gender"
          onChange={(e) => {
            userDispatch({
              type: RegisterActionKind.UPDATE,
              payload: {
                gender: e === "" ? 0 : parseInt(e),
              },
            });
          }}
        />
        <EnumDropDown
          dataEnum={MaritalStatusEnum}
          style={{ width: "285px" }}
          label="Select marital status"
          onChange={(e) => {
            userDispatch({
              type: RegisterActionKind.UPDATE,
              payload: {
                maritalStatus: e === "" ? 0 : parseInt(e),
              },
            });
          }}
        />
        <MyButton
          variant="contained"
          onClick={async () => {
            try {
              await register(userState);
            } catch (error) {
              toast((error as Error).message, {
                type: "error",
              });
            }
          }}
        >
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
  width: 280px;
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
    width: 280px;
  }
`;
export default Register;
