import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Vehicle } from "@/model/Vehicle";
import { getAllVehicles } from "../api/VehicleApi";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getAllVehicles().then((v) => {
      setVehicles(v);
    });
  }, []);

  return (
    <div>
      <Box
        component={Paper}
        sx={{ padding: "32px", textAlign: "right" }}
        display="flex"
        justifyContent="end"
      >
        <Box
          sx={{
            backgroundColor: "blueviolet",
            borderRadius: "10px",
            padding: ".35em",
            cursor: "pointer",
            display: "flex",
          }}
          onClick={() => {}}
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
            {vehicles.map((v) => {
              return (
                <TableRow key={v.id}>
                  <TableCell>{v.brand}</TableCell>
                  <TableCell>{v.horsePower}</TableCell>
                  <TableCell>{v.carPlate}</TableCell>
                  <TableCell>{v.numberOfSeats}</TableCell>
                  <TableCell>{v.engineCapacity}</TableCell>
                  <TableCell>{v.fabricationDate}</TableCell>
                  <TableCell>
                    <ClearIcon
                      sx={{
                        color: "red",
                        cursor: "pointer",
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
