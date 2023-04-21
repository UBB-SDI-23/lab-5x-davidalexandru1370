import VehicleRent from "@/model/VehicleRent";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRentsPaginated } from "../api/RentsApi";
import Pagination from "@/components/Pagination/Pagination";
import IPagination from "@/model/Pagination";
import styles from "./rents.module.css";

export default function Rents() {
  const [rents, setRents] = useState<IPagination<VehicleRent>>();
  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  useEffect(() => {
    getRentsPaginated(skip, take).then((r) => {
      setRents(r);
    });
  }, [skip]);

  return (
    <div>
      {rents === undefined ? (
        <Box
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography>Loading data...</Typography>
        </Box>
      ) : (
        <Box
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Car Plate</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rents.elements.map((rent) => {
                return (
                  <TableRow key={rent.id}>
                    <TableCell>{rent.vehicle.carPlate}</TableCell>
                    <TableCell>{rent.client.name}</TableCell>
                    <TableCell>{rent.startDate.toString()}</TableCell>
                    <TableCell>{rent.endDate.toString()}</TableCell>
                    <TableCell>{rent.totalCost}</TableCell>
                    <TableCell>{rent.comments}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box component={Paper}>
            <Pagination
              hasNext={rents.hasNext}
              hasPrevious={rents.hasPrevious}
              onChangePage={(pageNumber) => {
                setSkip(take * (pageNumber - 1));
              }}
              pageNumber={skip / take + 1}
              className={styles.pagination}
            />
          </Box>
        </Box>
      )}
    </div>
  );
}
