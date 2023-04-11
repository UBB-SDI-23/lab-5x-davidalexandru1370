import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  withStyles,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ClientDto } from "@/model/ClientDto";
import { Client } from "@/model/Client";
interface IClientModalProps {
  onSubmitClick: (client: ClientDto) => Promise<void>;
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
  client,
  method,
  isOpen,
}) => {
  const handleOnClose = () => {
    onClose();
    setName("");
    setCardNumber("");
    setCNP("");
    setBirthday("");
    setNationality("");
    setError("");
  };
  const [name, setName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cnp, setCNP] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (client !== undefined) {
      setName(client.name);
      setCardNumber(client.cardNumber);
      setCNP(client.cnp);
      setBirthday(client.birthday);
      setNationality(client.nationality);
    }
  }, [client]);

  const checkIfCardNumberFormatIsCorrect = (cardNumber: string): boolean => {
    console.log(cardNumber);
    const regex = /[0-9]-[0-9]-[0-9]-[0-9]/;
    const result = regex.test(cardNumber);
    console.log(result);
    return result;
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
        <TextField
          label="Name"
          sx={textFieldStyle}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          defaultValue={client?.name ?? ""}
        ></TextField>
        <TextField
          label="Card Number"
          sx={textFieldStyle}
          defaultValue={client?.cardNumber ?? ""}
          onChange={(e) => {
            setCardNumber(e.currentTarget.value);
          }}
        ></TextField>
        <TextField
          label="CNP"
          sx={textFieldStyle}
          defaultValue={client?.cnp ?? ""}
          onChange={(e) => {
            setCNP(e.currentTarget.value);
          }}
        ></TextField>
        <TextField
          label="Birthday"
          sx={textFieldStyle}
          defaultValue={client?.birthday ?? ""}
          onChange={(e) => {
            setBirthday(e.currentTarget.value);
          }}
        ></TextField>
        <TextField
          label="Nationality"
          sx={textFieldStyle}
          defaultValue={client?.nationality ?? ""}
          onChange={(e) => {
            setNationality(e.currentTarget.value);
          }}
        ></TextField>
        <p style={{ color: "red", minHeight: "20px" }}>{error}</p>
        <Button
          variant="contained"
          disabled={
            name.length === 0 ||
            cardNumber.length === 0 ||
            cnp.length === 0 ||
            birthday.length === 0 ||
            nationality.length === 0 ||
            checkIfCardNumberFormatIsCorrect(cardNumber) === true
          }
          onClick={async () => {
            try {
              await onSubmitClick({
                name: name,
                cardNumber: cardNumber,
                cnp: cnp,
                birthday: birthday,
                nationality: nationality,
              });
            } catch (e) {
              setError((e as Error).message);
            }
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
