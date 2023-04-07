import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Vehicle } from "@/model/Vehicle";
import {
  addVehicle,
  deleteVehicleById,
  filterVehiclesByEngineCapacity,
  getAllVehicles,
} from "../api/VehicleApi";
import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
import {
  VehicleModal,
  VehicleModalMethodsEnum,
} from "@/components/VehicleModal/VehicleModal";
import { VehicleDto } from "@/model/VehicleDto";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredCapacity, setFilteredCapacity] = useState<number>(0);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>();

  useEffect(() => {
    if (isAreYouSureModalOpen === true || isVehicleModalOpen === true) {
      return;
    }
    getAllVehicles().then((v) => {
      setVehicles(v);
    });
  }, [isAreYouSureModalOpen, isVehicleModalOpen]);

  return (
    <div>
      <VehicleModal
        isOpen={isVehicleModalOpen}
        method={VehicleModalMethodsEnum.ADD}
        onSubmitClick={async (vehicle: VehicleDto) => {
          await addVehicle(vehicle);
          setIsVehicleModalOpen(false);
        }}
        onClose={() => {
          setIsVehicleModalOpen(false);
        }}
      />
      <AreYouSureModal
        isOpen={isAreYouSureModalOpen}
        onCancelClick={() => {
          setIsAreYouSureModalOpen(false);
        }}
        onOkClick={async () => {
          try {
            await deleteVehicleById(selectedVehicle!.id);
          } catch (error: unknown) {
            console.log((error as Error).message);
          }
        }}
      />
      <Box
        component={Paper}
        sx={{ padding: "32px", textAlign: "right" }}
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <TextField
            label="Engine capacity"
            size="small"
            onChange={(e) => {
              setFilteredCapacity(
                parseInt(
                  e.currentTarget.value.length === 0
                    ? "0"
                    : e.currentTarget.value
                )
              );
            }}
          ></TextField>
          <Button
            variant="contained"
            onClick={async () => {
              let data = await filterVehiclesByEngineCapacity(filteredCapacity);
              setVehicles(data);
            }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            sx={{ marginInline: "100px" }}
            onClick={() => {
              const vehiclesSorted = [...vehicles].sort((v1, v2) =>
                v1.engineCapacity > v2.engineCapacity ? 1 : 0
              );
              setVehicles(vehiclesSorted);
            }}
          >
            Sort by engine capacity
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: "blueviolet",
            borderRadius: "10px",
            padding: ".35em",
            cursor: "pointer",
            display: "flex",
          }}
          onClick={() => {
            setIsVehicleModalOpen(true);
          }}
        >
          <AddIcon />
          <Typography sx={{ marginTop: "3px" }}>Add vehicle</Typography>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ paddingInline: "2rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>Horse Power</TableCell>
              <TableCell>Car Plate</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Engine Capacity</TableCell>
              <TableCell>Fabrication Date</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => {
              return (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.horsePower}</TableCell>
                  <TableCell>{vehicle.carPlate}</TableCell>
                  <TableCell>{vehicle.numberOfSeats}</TableCell>
                  <TableCell>{vehicle.engineCapacity}</TableCell>
                  <TableCell>{vehicle.fabricationDate.toString()}</TableCell>
                  <TableCell>
                    <ClearIcon
                      sx={{
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsAreYouSureModalOpen(true);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <EditIcon sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
