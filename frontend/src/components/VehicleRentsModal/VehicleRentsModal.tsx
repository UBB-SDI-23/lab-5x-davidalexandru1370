import { Vehicle } from "@/model/Vehicle";
import { VehicleDto } from "@/model/VehicleDto";
import VehicleRent from "@/model/VehicleRent";
import VehicleRentDto from "@/model/VehicleRentDto";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Modal, TextField } from "@mui/material";
import { FC, useReducer, useState } from "react";

interface IVehicleRentsModalProps {
  onSubmitClick: (vehicle: VehicleDto) => Promise<void>;
  onClose: () => void;
  vehicleRent?: VehicleRent;
  method: VehicleModalMethodsEnum;
  isOpen: boolean;
}

export enum VehicleModalMethodsEnum {
  ADD,
  UPDATE,
}

interface VehicleRentState extends VehicleRentDto {}

interface VehicleRentAction {
  type: VehicleRentActionKind;
  payload: VehicleRentDto;
}

enum VehicleRentActionKind {
  UPDATE = "UPDATE",
}

function handleChangeVehicleRentState(
  state: VehicleRentState,
  action: VehicleRentAction
) {
  const { type, payload } = action;

  switch (type) {
    case VehicleRentActionKind.UPDATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export const VehicleModal: FC<IVehicleRentsModalProps> = ({
  onSubmitClick,
  onClose,
  vehicleRent,
  method,
  isOpen,
}) => {
  const [vehicleRentState, vehicleRentDispatch] = useReducer(
    handleChangeVehicleRentState,
    {
      id: "",
      endDate: new Date(0, 0, 0),
      totalCost: 0,
      startDate: new Date(0, 0, 0),
      vehicleId: "",
      clientId: "",
    } as VehicleRentState
  );

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
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Horse power"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Car plate"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Seats"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Engine capacity"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Fabrication date"
          size="small"
          sx={textFieldStyle}
        ></TextField>
        <Button variant="contained" onClick={() => {}} sx={button}>
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
