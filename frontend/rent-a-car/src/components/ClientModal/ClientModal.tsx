import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import styles from "./ClientModal.module.css";
import ClearIcon from "@mui/icons-material/Clear";
interface IClientModalProps {
  onSubmitClick: () => void;
  onClose?: () => void;
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
    onClose && onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={style}>
        <ClearIcon sx={clearIconStyle} />
        <TextField label="Name"></TextField>
        <Button
          onClick={() => {
            onSubmitClick();
          }}
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
  position: "absolute",
  top: 0,
  right: 0,
  color: "red",
};
