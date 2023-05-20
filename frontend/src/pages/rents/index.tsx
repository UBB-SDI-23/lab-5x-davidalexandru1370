import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
import Pagination from "@/components/Pagination/Pagination";
import {
  VehicleModalMethodsEnum,
  VehicleRentsModal,
} from "@/components/VehicleRentsModal/VehicleRentsModal";
import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import usePageWidth from "@/hooks/usePageWidth";
import IPagination from "@/model/Pagination";
import VehicleRentDto from "@/model/VehicleRentDto";
import { isElementVisibleForUser } from "@/utilities/utilities";
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
import Link from "next/link";
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
  const width = usePageWidth();

  const handleOnUpdate = (rent: VehicleRentDto) => {
    setSelectedVehicleRent(rent);
    setIsVehicleRentsModalOpen(true);
  };

  const handleOnDelete = (rent: VehicleRentDto) => {
    setSelectedVehicleRent(rent);
    setIsAreYouSureModalOpen(true);
  };

  useEffect(() => {
    if (rents !== undefined) {
      return;
    }
    getRentsPaginated(skip, take).then((r) => {
      setRents(r);
    });
  }, [skip, rents]);

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
          await deleteVehicleRentById({
            endDate: selectedVehicleRent!.endDate,
            id: selectedVehicleRent!.id!,
            startDate: selectedVehicleRent!.startDate,
            totalCost: selectedVehicleRent!.totalCost,
            userId: selectedVehicleRent!.owner!.userId!,
          });
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
                id: selectedVehicleRent!.id!,
                userId: vehicleRent.owner.userId,
              });

              const rentsWithUpdatedRent =
                rents?.elements.map((r) =>
                  r.id === updatedRent.id ? { ...r, ...updatedRent } : r
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
          {isElementVisibleForUser(userDto, isAuthentificated) && (
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
          )}
          <Box
            component={Paper}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "2rem",
            }}
          >
            {width > 800 ? (
              <>
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
                            <Link href={`/user/${rent.owner.username}`}>
                              {rent.owner.username}
                            </Link>
                          </TableCell>
                          {isElementVisibleForUser(
                            userDto,
                            isAuthentificated,
                            rent.owner.username
                          ) && (
                            <>
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
                            </>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            ) : (
              <>
                <Box sx={{ width: "100%" }}>
                  {rents.elements.map((rent) => {
                    return (
                      <Box>
                        <Box
                          sx={{
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            gap: "20px",
                            borderTop: "1px solid white",
                          }}
                        >
                          <Box sx={vehicleRowStyle}>
                            <Typography>Car Plate:</Typography>
                            <Typography>{rent.vehicle?.carPlate}</Typography>
                          </Box>
                          <Box sx={vehicleRowStyle}>
                            <Typography>Client Name:</Typography>
                            <Typography>{rent.client?.name}</Typography>
                          </Box>
                          <Box sx={vehicleRowStyle}>
                            <Typography>Start Date:</Typography>
                            <Typography>{rent.startDate.toString()}</Typography>
                          </Box>
                          <Box sx={vehicleRowStyle}>
                            <Typography>End Date:</Typography>
                            <Typography>{rent.endDate.toString()}</Typography>
                          </Box>
                          <Box sx={vehicleRowStyle}>
                            <Typography>Total Cost:</Typography>
                            <Typography>{rent.totalCost}</Typography>
                          </Box>
                          <Box sx={vehicleRowStyle}>
                            <Typography>Rented times:</Typography>
                            <Typography>{rent.numberOfTimesRented}</Typography>
                          </Box>
                          <Box sx={vehicleRowStyle}>
                            <Typography>Owner name:</Typography>
                            <Link href={`/user/${rent.owner.username}`}>
                              {rent.owner.username}
                            </Link>
                          </Box>
                        </Box>
                        {isElementVisibleForUser(
                          userDto,
                          isAuthentificated,
                          rent.owner.username
                        ) && (
                          <Box
                            sx={{
                              backgroundColor: "white",
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "0.5em",
                            }}
                          >
                            <ClearIcon
                              sx={{
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleOnDelete(rent);
                              }}
                            />
                            <EditIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                handleOnUpdate(rent);
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                  <Box sx={{ borderTop: "1px solid white" }} />
                </Box>
              </>
            )}
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

const vehicleRowStyle = {
  display: "flex",
  justifyContent: "space-between",
};
