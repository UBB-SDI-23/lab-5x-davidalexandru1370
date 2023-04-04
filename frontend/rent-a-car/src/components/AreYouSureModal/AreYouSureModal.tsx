import React, { FC, useState } from "react";
import styles from "./AreYouSureModal.module.css";
import { Box, Button, Modal, Typography } from "@mui/material";

interface IAreYouSureModalProps {
  onOkClick: () => void;
  onCancelClick: () => void;
  onClose?: () => void;
  text?: string;
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
        <Typography sx={{ textAlign: "center" }}>
          {text ?? "Are you sure you want to continue?"}
        </Typography>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            sx={successButtonStyle}
            onClick={() => {
              onOkClick();
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={cancelButtonStyle}
            onClick={() => {
              onCancelClick();
            }}
          >
            Cancel
          </Button>
        </div>
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

const buttonStyle = {
  width: "120px",
};

const successButtonStyle = {
  ...buttonStyle,
  backgroundColor: "limegreen",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "red",
};
