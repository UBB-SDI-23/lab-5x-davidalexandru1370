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
import React, { useEffect, useRef, useState } from "react";
import {
  deleteVehicleRentById,
  getRentsPaginated,
  updateVehicleRent,
} from "../api/RentsApi";
import Pagination from "@/components/Pagination/Pagination";
import IPagination from "@/model/Pagination";
import styles from "./rents.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
import {
  VehicleModalMethodsEnum,
  VehicleRentsModal,
} from "@/components/VehicleRentsModal/VehicleRentsModal";
import { toast } from "react-toastify";
export default function Rents() {
  const [rents, setRents] = useState<IPagination<VehicleRent>>();
  const [skip, setSkip] = useState<number>(0);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);
  const [isVehicleRentsModalOpen, setIsVehicleRentsModalOpen] =
    useState<boolean>(false);
  const [selectedVehicleRent, setSelectedVehicleRent] = useState<VehicleRent>();
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const take = 10;

  useEffect(() => {
    if (rents !== undefined) {
      return;
    }
    getRentsPaginated(skip, take).then((r) => {
      setRents(r);
    });
  }, [skip, rents]);

  return (
    <div ref={parentContainerRef}>
      <AreYouSureModal
        isOpen={isAreYouSureModalOpen}
        onClose={() => {
          setIsAreYouSureModalOpen(false);
        }}
        onCancelClick={() => {
          setIsAreYouSureModalOpen(false);
        }}
        onOkClick={async () => {
          await deleteVehicleRentById(selectedVehicleRent!.id);
          setRents(undefined);
          setIsAreYouSureModalOpen(false);
        }}
      />
      <VehicleRentsModal
        isOpen={isVehicleRentsModalOpen}
        method={
          selectedVehicleRent === undefined
            ? VehicleModalMethodsEnum.ADD
            : VehicleModalMethodsEnum.UPDATE
        }
        onClose={() => {
          setIsVehicleRentsModalOpen(false);
          setSelectedVehicleRent(undefined);
        }}
        vehicleRent={selectedVehicleRent}
        onSubmitClick={async (vehicleRent) => {
          if (selectedVehicleRent !== undefined) {
            const updatedRent = await updateVehicleRent({
              ...vehicleRent,
              id: selectedVehicleRent!.id,
            });

            const rentsWithUpdatedRent =
              rents?.elements.map((r) =>
                r.id === updatedRent.id ? updatedRent : r
              ) || [];
            setRents({ ...rents!, elements: rentsWithUpdatedRent! });
            //setRents({ ...rents!, elements: rentsListWithUpdatedRent });
          }
        }}
      />
      {rents === undefined ? (
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
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rents.elements.map((rent) => {
                  return (
                    <TableRow key={rent.id}>
                      <TableCell>{rent.vehicle?.carPlate}</TableCell>
                      <TableCell>{rent.client?.name}</TableCell>
                      <TableCell>{rent.startDate.toString()}</TableCell>
                      <TableCell>{rent.endDate.toString()}</TableCell>
                      <TableCell>{rent.totalCost}</TableCell>
                      <TableCell>
                        <ClearIcon
                          sx={{
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedVehicleRent(rent);
                            setIsAreYouSureModalOpen(true);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <EditIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedVehicleRent(rent);
                            setIsVehicleRentsModalOpen(true);
                          }}
                        />
                      </TableCell>
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
                  setRents(undefined);
                  setSkip(take * (pageNumber - 1));
                }}
                pageNumber={skip / take + 1}
                className={styles.pagination}
              />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
