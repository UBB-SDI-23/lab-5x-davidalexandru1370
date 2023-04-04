import React, { FC, useState } from "react";
import styles from "./AreYouSureModal.module.css";
import { Box, Modal, Typography } from "@mui/material";

interface IAreYouSureModal {}

export const AreYouSureModal: FC<IAreYouSureModal> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleOnOpen = () => {
    setIsOpen(true);
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      <Box>
        <Typography>Are you sure you want to continue?</Typography>
      </Box>
    </Modal>
  );
};
