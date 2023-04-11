import Incident from "@/model/Incident";
import { getIncidentsByVehicleId } from "@/pages/api/IncidentApi";
import {
  Box,
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";

interface IIncidentsModal {
  onClose: () => void;
  vehicleId: string;
  isOpen: boolean;
}

export const IncidentsModal: FC<IIncidentsModal> = ({
  onClose,
  vehicleId,
  isOpen,
}) => {
  const [incidents, setIncidents] = useState<Incident[]>();

  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      abortController.abort();
      getIncidentsByVehicleId(vehicleId).then((i) => {
        setIncidents(i);
      });
    };
  }, []);

  return (
    <Modal open={isOpen} onClose={onClose}>
      {incidents === undefined ? (
        <Box
          component={Paper}
          sx={{
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography>Loading data...</Typography>
        </Box>
      ) : (
        <>
          <Box sx={style}>
            <TableContainer
              component={Paper}
              sx={{ paddingInline: "2rem", minHeight: "60vh" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>When happend</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{}</TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
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
