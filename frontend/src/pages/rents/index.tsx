import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
import Pagination from "@/components/Pagination/Pagination";
import PaginationDropDown from "@/components/PaginationDropDown/PaginationDropDown";
import {
  VehicleModalMethodsEnum,
  VehicleRentsModal,
} from "@/components/VehicleRentsModal/VehicleRentsModal";
import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import IPagination from "@/model/Pagination";
import VehicleRentDto from "@/model/VehicleRentDto";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
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
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  addVehicleRent,
  deleteVehicleRentById,
  getRentsPaginated,
  updateVehicleRent,
} from "../api/RentsApi";
import styles from "./rents.module.css";
import Link from "next/link";
export default function Rents() {
  const router = useRouter();
  const [rents, setRents] = useState<IPagination<VehicleRentDto>>();
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);
  const [isVehicleRentsModalOpen, setIsVehicleRentsModalOpen] =
    useState<boolean>(false);
  const [selectedVehicleRent, setSelectedVehicleRent] =
    useState<VehicleRentDto>();
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const { isAuthentificated, userDto, reFetch, skip, take, setSkip, setTake } =
    useContext(AuthentificationContext);
  useEffect(() => {
    if (rents !== undefined) {
      return;
    }
    getRentsPaginated(skip, take).then((r) => {
      setRents(r);
    });
  }, [skip]);

  useEffect(() => {
    getRentsPaginated(skip, take).then((r) => {
      setRents(r);
    });
  }, [take]);

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
            try {
              const updatedRent = await updateVehicleRent({
                ...vehicleRent,
                id: selectedVehicleRent!.id,
              });

              const rentsWithUpdatedRent =
                rents?.elements.map((r) =>
                  r.id === updatedRent.id ? updatedRent : r
                ) || [];
              setRents({ ...rents!, elements: rentsWithUpdatedRent });
              toast("Updated succesfully", {
                type: "success",
              });
            } catch (error: unknown) {
              toast((error as Error).message, {
                type: "error",
              });
            }
          } else {
            try {
              await addVehicleRent(vehicleRent);
              toast("Added succesfully", {
                type: "success",
              });
              setRents(undefined);
            } catch (error) {
              toast((error as Error).message, {
                type: "error",
              });
            }
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
            sx={{ padding: "32px 32px 0px 32px", textAlign: "right" }}
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
              onClick={() => {
                setSelectedVehicleRent(undefined);
                setIsVehicleRentsModalOpen(true);
              }}
            >
              <AddIcon />
              <Typography>Add rent</Typography>
            </Box>
          </Box>
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
                  <TableCell>Rented times</TableCell>
                  <TableCell>Owner name</TableCell>
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
                      <TableCell>{rent.numberOfTimesRented}</TableCell>
                      <TableCell>
                        {
                          <Link
                            href={`/user/${rent.ownerName}`}
                            onClick={() => {
                              router.reload();
                            }}
                          >
                            {rent.ownerName}
                          </Link>
                        }
                      </TableCell>
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
                totalNumberOfElements={rents.totalNumberOfElements}
                take={take}
                onChangePage={(pageNumber) => {
                  setRents(undefined);
                  setSkip(take * (pageNumber - 1));
                }}
                pageNumber={Math.ceil(skip / take) + 1}
                className={styles.pagination}
              />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
