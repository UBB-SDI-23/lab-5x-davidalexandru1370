import Incident from "@/model/Incident";
import { VehicleDto } from "@/model/VehicleDto";
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
import { FC, useEffect, useState } from "react";

interface IIncidentsModal {
  onClose: () => void;
  vehicle: VehicleDto;
  isOpen: boolean;
}

export const IncidentsModal: FC<IIncidentsModal> = ({
  onClose,
  vehicle,
  isOpen,
}) => {
  const [incidents, setIncidents] = useState<Incident[]>();

  useEffect(() => {
    if (vehicle === undefined) {
      return;
    }
    vehicle.id &&
      getIncidentsByVehicleId(vehicle.id).then((i) => {
        setIncidents(i);
      });
  }, [vehicle]);

  const handleOnClose = () => {
    onClose();
    setIncidents(undefined);
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose} component={Paper}>
      <>
        {incidents === undefined ? (
          <Box component={Paper} sx={style}>
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
                  <TableBody>
                    {incidents.map((incident) => {
                      return (
                        <TableRow key={incident.id}>
                          <TableCell>{incident.location}</TableCell>
                          <TableCell>{incident.description}</TableCell>
                          <TableCell>{incident.cost}</TableCell>
                          <TableCell>{incident.whenHappend}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </>
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
  height: "400px",
  transform: "translate(-50%, -50%)",
  width: "80%",
  backgroundImage: "linear-gradient(to bottom right, #0097b9, #8769ae)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
