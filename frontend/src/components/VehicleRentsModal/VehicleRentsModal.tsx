import { Client } from "@/model/Client";
import { Vehicle } from "@/model/Vehicle";
import VehicleRent from "@/model/VehicleRent";
import VehicleRentDto from "@/model/VehicleRentDto";
import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import { getClientsByName } from "@/pages/api/ClientApi";
import { getVehiclesByCarPlate } from "@/pages/api/VehicleApi";
//@ts-ignore
import { debounce } from "lodash";
import DatePicker from "../DatePicker/DatePicker";

interface IVehicleRentsModalProps {
  onSubmitClick: (vehicle: VehicleRentDto) => Promise<void>;
  onClose: () => void;
  vehicleRent?: VehicleRentDto;
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
    value: string,
    reason: any
  ) => {
    if (reason === "input" && value.length > 0) {
      debouncedClientFetchSuggestions(value);
    }
  };

  const handleVehicleAutocompleteInputChange = (
    event: any,
    value: string,
    reason: any
  ) => {
    if (reason === "input" && value.length > 0) {
      debouncedVehicleFetchSuggestions(value);
    }
  };

  const [vehicleRentState, vehicleRentDispatch] = useReducer(
    handleChangeVehicleRentState,
    {
      endDate: "",
      totalCost: 0,
      startDate: "",
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
        endDate: vehicleRent === undefined ? "" : vehicleRent.endDate,
        totalCost: vehicleRent === undefined ? 0 : vehicleRent.totalCost,
        startDate: vehicleRent === undefined ? "" : vehicleRent.startDate,
        vehicleId: vehicleRent === undefined ? "" : vehicleRent.vehicle?.id,
        clientId: vehicleRent === undefined ? "" : vehicleRent.client?.id,
        owner:
          vehicleRent === undefined
            ? { userId: "", username: "" }
            : vehicleRent.owner,
      },
    });
  }, [vehicleRent]);

  const handleOnClose = () => {
    vehicleRentDispatch({
      type: VehicleRentActionKind.UPDATE,
      payload: {
        endDate: "",
        totalCost: 0,
        startDate: "",
        vehicleId: "",
        clientId: "",
      },
    });
    onClose();
  };

  const validateTotalCost = (): boolean => {
    return vehicleRentState.totalCost > 0;
  };

  const validateDifferenceBetweenStartTimeAndEndTime = (): boolean => {
    return vehicleRentState.startDate <= vehicleRentState.endDate;
  };

  const checkIfAllInputFieldsAreValid = (): boolean => {
    return (
      validateTotalCost() && validateDifferenceBetweenStartTimeAndEndTime()
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
        <Autocomplete
          id="Client-id"
          options={clients}
          sx={textFieldStyle}
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
          sx={textFieldStyle}
          getOptionLabel={(option) => `${option.carPlate}`}
          renderInput={(params) => (
            <TextField {...params} label="Vehicle" variant="outlined" />
          )}
          filterOptions={(x) => x}
          onInputChange={handleVehicleAutocompleteInputChange}
          onChange={(event, value) => {
            vehicleRentDispatch({
              type: VehicleRentActionKind.UPDATE,
              payload: {
                vehicleId: value?.id || "",
              },
            });
          }}
        />
        <DatePicker
          label="Start date"
          defaultValue={new Date(vehicleRent?.startDate || "")}
          sx={textFieldStyle}
          onChange={() => {
            try {
              //@ts-ignore
              const date: string = (e.$d as Date).toISOString().split("T")[0];
              vehicleRentDispatch({
                type: VehicleRentActionKind.UPDATE,
                payload: {
                  startDate: date,
                },
              });
            } catch (error) {}
          }}
        />
        <DatePicker
          label="End date"
          defaultValue={new Date(vehicleRent?.endDate || "")}
          sx={textFieldStyle}
          onChange={(e) => {
            try {
              //@ts-ignore
              const date: string = (e.$d as Date).toISOString().split("T")[0];
              vehicleRentDispatch({
                type: VehicleRentActionKind.UPDATE,
                payload: {
                  endDate: date,
                },
              });
            } catch (error) {}
          }}
        />
        <TextField
          label="Total cost"
          size="small"
          type="number"
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
            } catch (error) {}
          }}
          sx={button}
          disabled={
            vehicleRentState.vehicleId === "" ||
            vehicleRentState.clientId === "" ||
            vehicleRentState.endDate === "" ||
            vehicleRentState.startDate === "" ||
            vehicleRentState.totalCost === 0 ||
            checkIfAllInputFieldsAreValid() === false
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
