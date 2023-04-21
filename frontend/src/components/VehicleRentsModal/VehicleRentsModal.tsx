import { Client } from "@/model/Client";
import { Vehicle } from "@/model/Vehicle";
import { VehicleDto } from "@/model/VehicleDto";
import VehicleRent from "@/model/VehicleRent";
import VehicleRentDto from "@/model/VehicleRentDto";
import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
//@ts-ignore
import { debounce } from "lodash";
import { getClientsByName } from "@/pages/api/ClientApi";

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
  payload: Partial<VehicleRentDto>;
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

export const VehicleRentsModal: FC<IVehicleRentsModalProps> = ({
  onSubmitClick,
  onClose,
  vehicleRent,
  method,
  isOpen,
}) => {
  const handleDebouncedClientFetchSuggestions = async (name: string) => {
    const data = await getClientsByName(name);
    console.log(data);
    setClients(data);
  };

  const debouncedClientFetchSuggestions = useCallback(
    debounce(handleDebouncedClientFetchSuggestions, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedClientFetchSuggestions.cancel();
    };
  }, [debouncedClientFetchSuggestions]);

  const handleClientAutocompleteInputChange = (
    event: any,
    value: any,
    reason: any
  ) => {
    console.log("input", value, reason);
    if (reason === "input") {
      debouncedClientFetchSuggestions(value);
    }
  };

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
  const [clients, setClients] = useState<Client[]>([]);

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
          label="Car plate"
          size="small"
          sx={textFieldStyle}
          onChange={async (e) => {}}
        ></TextField>
        <Autocomplete
          id="Client-id"
          options={clients}
          getOptionLabel={(option) => `${option.name} - ${option.cnp}`}
          renderInput={(params) => (
            <TextField {...params} label="Client" variant="outlined" />
          )}
          filterOptions={(x) => x}
          onInputChange={handleClientAutocompleteInputChange}
          onChange={(event, value) => {
            if (value) {
              console.log(value);
              vehicleRentDispatch({
                type: VehicleRentActionKind.UPDATE,
                payload: {
                  clientId: value.id,
                },
              });
            }
          }}
        />
        <TextField
          label="Start date"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="End date"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <TextField
          label="Total cost"
          size="small"
          sx={textFieldStyle}
          onChange={(e) => {}}
        ></TextField>
        <Button
          variant="contained"
          onClick={() => {}}
          sx={button}
          disabled={
            vehicleRentState.vehicleId === "" ||
            vehicleRentState.clientId === "" ||
            vehicleRentState.endDate === new Date(0, 0, 0) ||
            vehicleRentState.startDate === new Date(0, 0, 0) ||
            vehicleRentState.totalCost.toString() === ""
          }
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
