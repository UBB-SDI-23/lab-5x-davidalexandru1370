import { Box, Button, Modal, Typography } from "@mui/material";
import React, { FC } from "react";
import styles from "./ClientModal.module.css";

interface IClientModalProps {
  onSubmitClick: () => void;
  onClose?: () => void;
  text?: string;
  buttonText: clientModalMethodsEnum;
  isOpen: boolean;
}

export enum clientModalMethodsEnum {
  ADD,
  UPDATE,
}

export const ClientModal: FC<IClientModalProps> = ({
  onSubmitClick,
  onClose,
  text,
  buttonText,
  isOpen,
}) => {
  const handleOnClose = () => {
    onClose && onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={style}>
        <Typography sx={{ textAlign: "center" }}>
          {text ?? "Are you sure you want to continue?"}
        </Typography>
        <div></div>
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
