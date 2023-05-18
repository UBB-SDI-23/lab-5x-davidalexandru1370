import React, { useReducer, useState } from "react";
import styles from "./register.module.css";
import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import DatePicker from "../../components/DatePicker/DatePicker";
import EnumDropDown from "@/components/EnumDropDown/EnumDropDown";
import { GenderEnum } from "@/enums/GenderEnum";
import { MaritalStatusEnum } from "@/enums/MaritalStatusEnum";
import { RegisterCredentials } from "@/model/RegisterCredentials";
import { register, validateAccount } from "../api/UserApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { computeAge, convertStringToDate } from "@/utilities/utilities";

enum RegisterActionKind {
  UPDATE,
}

interface RegisterAction {
  type: RegisterActionKind;
  payload: Partial<RegisterCredentials>;
}

function handleRegisterDispatch(
  state: RegisterCredentials,
  action: RegisterAction
) {
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
  const { push, reload } = useRouter();
  const [userState, userDispatch] = useReducer(handleRegisterDispatch, {
    bio: "",
    birthday: "",
    gender: GenderEnum.Man,
    location: "",
    maritalStatus: MaritalStatusEnum.NeverMarried,
    password: "",
    username: "",
  } as RegisterCredentials);
  const [token, setToken] = useState<string>("");
  const checkIfAllInputFieldsAreValid = (): boolean => {
    const passwordMinimumLength: number = 5;
    const bioMinimumLength: number = 5;
    const locationMinimumLength: number = 4;

    const minimumAge: number = 14;
    console.log(computeAge(convertStringToDate(userState.birthday)));
    return !(
      userState.bio.length < bioMinimumLength ||
      userState.birthday === "" ||
      userState.location.length < locationMinimumLength ||
      userState.password.length < passwordMinimumLength ||
      userState.username === "" ||
      computeAge(convertStringToDate(userState.birthday)) < minimumAge
    );
  };

  return (
    <div className={`${styles.content}`}>
      <Box sx={contentStyle}>
        <WhiteBorderTextField
          id="username-input"
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
          id="password-input"
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
          id="bio-input"
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
          id="location-input"
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
          id="birthday-input"
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
            } catch (error) {
              userDispatch({
                type: RegisterActionKind.UPDATE,
                payload: {
                  birthday: "",
                },
              });
            }
          }}
        />
        <Typography>You must be at least 14 years old!</Typography>
        <EnumDropDown
          dataEnum={GenderEnum}
          style={{ width: "285px" }}
          label="Select gender"
          onChange={(e) => {
            userDispatch({
              type: RegisterActionKind.UPDATE,
              payload: {
                gender: e,
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
                maritalStatus: e,
              },
            });
          }}
        />
        <MyButton
          variant="contained"
          id="register-button"
          onClick={async () => {
            try {
              const token = await register(userState);
              if (typeof token === "string") {
                setToken(token);
              }
            } catch (error) {
              toast((error as Error).message, {
                type: "error",
              });
            }
          }}
          disabled={!checkIfAllInputFieldsAreValid()}
        >
          Register
        </MyButton>
        {token !== "" && (
          <span
            className={styles.activeAccountText}
            onClick={async () => {
              try {
                await validateAccount(token);
                push("/clients", undefined, {
                  shallow: false,
                });
                reload();
              } catch (error) {
                toast((error as Error).message, {
                  type: "error",
                });
              }
            }}
          >
            Press here to activate your account
          </span>
        )}
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
