import React, { FC, useState } from "react";
import styles from "./AreYouSureModal.module.css";
import { Box, Button, Modal, Typography } from "@mui/material";

interface IAreYouSureModalProps {
  onOkClick: () => void;
  onCancelClick: () => void;
  onClose?: () => void;
  text?: () => void;
  isOpen: boolean;
}

export const AreYouSureModal: FC<IAreYouSureModalProps> = ({
  isOpen,
  onCancelClick,
  onOkClick,
  onClose,
  text,
}) => {
  const handleOnClose = () => {
    onClose && onClose();
  };

  if (isOpen === false) {
    return <></>;
  }

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box sx={style}>
        <Typography>Are you sure you want to continue?</Typography>
        <Button>Yes</Button>
        <Button>Cancel</Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundImage: "linear-gradient(to bottom right, #0097b9, #8769ae)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
