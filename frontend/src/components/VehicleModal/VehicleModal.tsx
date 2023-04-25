import { Vehicle } from "@/model/Vehicle";
import { VehicleDto } from "@/model/VehicleDto";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Modal, TextField } from "@mui/material";
import { FC, useState } from "react";
import DatePicker from "../DatePicker/DatePicker";

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
  const [fabricationDate, setFabricationDate] = useState<string>("");

  const handleOnClose = () => {
    onClose();
  };

  const checkIfCarPlateIsCorrect = (carPlate: string): boolean => {
    const pattern: RegExp = new RegExp(
      "[A-Z]{2}([0-9][1-9]|[1-9][0-9])[A-Z]{3}"
    );

    return pattern.test(carPlate);
  };

  const checkIfAllInputFieldsAreCorrect = (): boolean => {
    return (
      brand === "" ||
      fabricationDate === "" ||
      numberOfSeats < 0 ||
      engineCapacity < 0 ||
      carPlate === "" ||
      checkIfCarPlateIsCorrect(carPlate) === false
    );
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
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {
            setBrand(e.currentTarget.value);
          }}
        ></TextField>
        <TextField
          label="Horse power"
          size="small"
          type="numeric"
          sx={textFieldStyle}
          onChange={(e) => {
            setHorsePower(parseInt(e.currentTarget.value));
          }}
        ></TextField>
        <TextField
          label="Car plate"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {
            setCarPlate(e.currentTarget.value);
          }}
        ></TextField>
        <TextField
          label="Seats"
          size="small"
          type="numeric"
          sx={textFieldStyle}
          onChange={(e) => {
            setNumberOfSeats(parseInt(e.currentTarget.value));
          }}
        ></TextField>
        <TextField
          label="Engine capacity"
          size="small"
          type="numeric"
          sx={textFieldStyle}
          onChange={(e) => {
            setEngineCapacity(parseInt(e.currentTarget.value));
          }}
        ></TextField>
        <DatePicker
          label="Fabrication Date"
          onChange={(e: any) => {
            const date: string = (e.$d as Date).toISOString().split("T")[0];
            setFabricationDate(date);
          }}
        />
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
          disabled={checkIfAllInputFieldsAreCorrect()}
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
