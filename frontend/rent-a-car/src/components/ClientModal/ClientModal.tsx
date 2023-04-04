import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Client } from "@/model/Client";
interface IClientModalProps {
  onSubmitClick: () => void;
  onClose: () => void;
  client?: Client;
  method: ClientModalMethodsEnum;
  isOpen: boolean;
}

export enum ClientModalMethodsEnum {
  ADD,
  UPDATE,
}

export const ClientModal: FC<IClientModalProps> = ({
  onSubmitClick,
  onClose,
  method,
  isOpen,
}) => {
  const handleOnClose = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={style}>
        <ClearIcon
          sx={clearIconStyle}
          onClick={() => {
            handleOnClose();
          }}
        />
        <TextField label="Name" sx={textFieldStyle}></TextField>
        <TextField label="Card Number" sx={textFieldStyle}></TextField>
        <TextField label="CNP" sx={textFieldStyle}></TextField>
        <TextField label="Birthday" sx={textFieldStyle}></TextField>
        <TextField label="Nationality" sx={textFieldStyle}></TextField>
        <Button
          variant="contained"
          onClick={() => {
            onSubmitClick();
          }}
          sx={button}
        >
          {method === ClientModalMethodsEnum.ADD ? "Add" : "Update"}
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  justifyContent: "space-between",
  top: "50%",
  left: "50%",
  minHeight: "35%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundImage: "linear-gradient(to bottom right, #0097b9, #8769ae)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const clearIconStyle = {
  cursor: "pointer",
  position: "absolute",
  top: 0,
  right: 0,
  color: "red",
};

const button = {
  backgroundColor: "chocolate",
  "&:hover": {
    backgroundColor: "chocolate",
  },
};

const textFieldStyle = {
  border: "2px solid white",
};
