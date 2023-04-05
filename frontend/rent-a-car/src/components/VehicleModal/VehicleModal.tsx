import { Vehicle } from "@/model/Vehicle";
import { VehicleDto } from "@/model/VehicleDto";
import { Box, Button, Modal, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

interface IVehicleModalProps {
  onSubmitClick: (vehicle: VehicleDto) => Promise<void>;
  onClose: () => void;
  vehicle?: Vehicle;
  method: VehicleModalMethodsEnum;
  isOpen: boolean;
}

export enum VehicleModalMethodsEnum {
  ADD,
  UPDATE,
}

export const VehicleModal: FC<IVehicleModalProps> = ({
  onSubmitClick,
  onClose,
  vehicle,
  method,
  isOpen,
}) => {
  const [brand, setBrand] = useState<string>("");
  const [horsePower, setHorsePower] = useState<number>(0);
  const [carPlate, setCarPlate] = useState<string>("");
  const [numberOfSeats, setNumberOfSeats] = useState<number>(0);
  const [engineCapacity, setEngineCapacity] = useState<number>(0);
  const [fabricationDate, setFabricationDate] = useState<Date>();

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
        <TextField
          label="Brand"
          sx={textFieldStyle}
          onChange={(e) => {
            setBrand(e.currentTarget.value);
          }}
        ></TextField>
        <TextField
          label="Horse power"
          sx={textFieldStyle}
          onChange={(e) => {
            setHorsePower(parseInt(e.currentTarget.value));
          }}
        ></TextField>
        <TextField
          label="Car plate"
          sx={textFieldStyle}
          onChange={(e) => {
            setCarPlate(e.currentTarget.value);
          }}
        ></TextField>
        <TextField
          label="Seats"
          sx={textFieldStyle}
          onChange={(e) => {
            setNumberOfSeats(parseInt(e.currentTarget.value));
          }}
        ></TextField>
        <TextField
          label="Engine capacity"
          sx={textFieldStyle}
          onChange={(e) => {
            setEngineCapacity(parseInt(e.currentTarget.value));
          }}
        ></TextField>
        <TextField
          label="Fabrication date"
          sx={textFieldStyle}
          onChange={(e) => {
            const dates = e.currentTarget.value.split("-");
            setFabricationDate(
              new Date(
                parseInt(dates[0]),
                parseInt(dates[1]),
                parseInt(dates[2])
              )
            );
          }}
        ></TextField>
        <Button
          variant="contained"
          onClick={() => {
            onSubmitClick({
              brand: brand,
              carPlate: carPlate,
              engineCapacity: engineCapacity,
              fabricationDate: fabricationDate!,
              horsePower: horsePower,
              numberOfSeats: numberOfSeats,
            });
          }}
          sx={button}
        >
          {method === VehicleModalMethodsEnum.ADD ? "Add" : "Update"}
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
