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
import { getVehiclesByCarPlate } from "@/pages/api/VehicleApi";
import { toast } from "react-toastify";

interface IVehicleRentsModalProps {
  onSubmitClick: (vehicle: VehicleRentDto) => Promise<void>;
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
  const debouncedClientFetchSuggestions = useCallback(
    debounce(async (name: string) => {
      const data = await getClientsByName(name);
      setClients(data);
    }, 500),
    []
  );

  const debouncedVehicleFetchSuggestions = useCallback(
    debounce(async (carPlate: string) => {
      const data = await getVehiclesByCarPlate(carPlate);
      setVehicles(data);
    }, 500),
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
    if (reason === "input") {
      debouncedClientFetchSuggestions(value);
    }
  };

  const handleVehicleAutocompleteInputChange = (
    event: any,
    value: any,
    reason: any
  ) => {
    if (reason === "input") {
      debouncedVehicleFetchSuggestions(value);
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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    vehicleRentDispatch({
      type: VehicleRentActionKind.UPDATE,
      payload: {
        id: vehicleRent === undefined ? "" : vehicleRent.id,
        endDate:
          vehicleRent === undefined ? new Date(0, 0, 0) : vehicleRent.endDate,
        totalCost: vehicleRent === undefined ? 0 : vehicleRent.totalCost,
        startDate:
          vehicleRent === undefined ? new Date(0, 0, 0) : vehicleRent.startDate,
        vehicleId: vehicleRent === undefined ? "" : vehicleRent.vehicle?.id,
        clientId: vehicleRent === undefined ? "" : vehicleRent.client?.id,
      },
    });
  }, [vehicleRent]);

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
        <Autocomplete
          id="Client-id"
          options={clients}
          defaultValue={vehicleRent?.client}
          getOptionLabel={(option: Client) => `${option.name} - ${option.cnp}`}
          renderInput={(params) => (
            <TextField {...params} label="Client" variant="outlined" />
          )}
          filterOptions={(x) => x}
          onInputChange={handleClientAutocompleteInputChange}
          onChange={(event, value) => {
            if (value) {
              vehicleRentDispatch({
                type: VehicleRentActionKind.UPDATE,
                payload: {
                  clientId: value.id,
                },
              });
            }
          }}
        />
        <Autocomplete
          id="Vehicle-id"
          options={vehicles}
          defaultValue={vehicleRent?.vehicle}
          getOptionLabel={(option) => `${option.carPlate}`}
          renderInput={(params) => (
            <TextField {...params} label="Vehicle" variant="outlined" />
          )}
          filterOptions={(x) => x}
          onInputChange={handleVehicleAutocompleteInputChange}
          onChange={(event, value) => {
            if (value) {
              vehicleRentDispatch({
                type: VehicleRentActionKind.UPDATE,
                payload: {
                  vehicleId: value.id,
                },
              });
            }
          }}
        />
        <TextField
          label="Start date"
          size="small"
          defaultValue={vehicleRent?.startDate}
          sx={textFieldStyle}
          onChange={(e) => {
            vehicleRentDispatch({
              type: VehicleRentActionKind.UPDATE,
              payload: {
                startDate: new Date(e.currentTarget.value),
              },
            });
          }}
        ></TextField>
        <TextField
          label="End date"
          size="small"
          defaultValue={vehicleRent?.endDate}
          sx={textFieldStyle}
          onChange={(e) => {
            vehicleRentDispatch({
              type: VehicleRentActionKind.UPDATE,
              payload: {
                endDate: new Date(e.currentTarget.value),
              },
            });
          }}
        ></TextField>
        <TextField
          label="Total cost"
          size="small"
          defaultValue={vehicleRent?.totalCost}
          sx={textFieldStyle}
          onChange={(e) => {
            vehicleRentDispatch({
              type: VehicleRentActionKind.UPDATE,
              payload: {
                totalCost: parseInt(e.currentTarget.value),
              },
            });
          }}
        ></TextField>
        <TextField
          label="Comments"
          size="small"
          defaultValue={vehicleRent?.comments}
          sx={textFieldStyle}
          onChange={(e) => {
            vehicleRentDispatch({
              type: VehicleRentActionKind.UPDATE,
              payload: {
                comments: e.currentTarget.value,
              },
            });
          }}
        ></TextField>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await onSubmitClick(vehicleRentState);
              toast("Updated succesfully", {
                type: "success",
              });
            } catch (error) {
              toast((error as Error).message, {
                type: "error",
              });
            }
          }}
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
