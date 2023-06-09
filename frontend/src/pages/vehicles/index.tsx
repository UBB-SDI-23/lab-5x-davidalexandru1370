import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
import { IncidentsModal } from "@/components/IncidentsModal/IncidentsModal";
import Pagination from "@/components/Pagination/Pagination";
import {
  VehicleModal,
  VehicleModalMethodsEnum,
} from "@/components/VehicleModal/VehicleModal";
import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import IPagination from "@/model/Pagination";
import { VehicleDto } from "@/model/VehicleDto";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  CircularProgress,
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
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addVehicle,
  deleteVehicleById,
  getVehiclesPaginated,
  updateVehicle,
} from "../api/VehicleApi";
import styles from "./vehicles.module.css";
import { isElementVisibleForUser } from "@/utilities/utilities";
import usePageWidth from "@/hooks/usePageWidth";

export default function Vehicles() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<IPagination<VehicleDto>>();
  const [filteredCapacity, setFilteredCapacity] = useState<number>(0);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [isIncidentModalOpen, setIsIncidentModalOpen] =
    useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDto>();
  const { isAuthentificated, userDto, reFetch, skip, take, setTake, setSkip } =
    useContext(AuthentificationContext);
  const width = usePageWidth();

  useEffect(() => {
    if (isAreYouSureModalOpen === true || isVehicleModalOpen === true) {
      return;
    }
    getVehiclesPaginated(skip, take).then((v) => {
      setVehicles(v);
    });
  }, [isAreYouSureModalOpen, isVehicleModalOpen, skip, take]);

  const handleOnUpdate = (vehicle: VehicleDto) => {
    setSelectedVehicle(vehicle);
    setIsVehicleModalOpen(true);
  };

  const handleOnDelete = (vehicle: VehicleDto) => {
    setSelectedVehicle(vehicle);
    setIsAreYouSureModalOpen(true);
  };

  const handleShowIncidents = (vehicle: VehicleDto) => {
    setSelectedVehicle(vehicle);
    setIsIncidentModalOpen(true);
  };

  return (
    <div>
      <VehicleModal
        isOpen={isVehicleModalOpen}
        method={
          selectedVehicle === undefined
            ? VehicleModalMethodsEnum.ADD
            : VehicleModalMethodsEnum.UPDATE
        }
        vehicle={selectedVehicle}
        onSubmitClick={async (vehicle: VehicleDto) => {
          if (selectedVehicle !== undefined) {
            try {
              const updatedVehicle = await updateVehicle({
                ...vehicle,
                userId: selectedVehicle.owner.userId,
                id: selectedVehicle!.id!,
              });

              const updatedVehicleList =
                vehicles?.elements.map((v) =>
                  v.id === selectedVehicle.id ? updatedVehicle : v
                ) || [];

              setVehicles({
                ...vehicles!,
                elements: updatedVehicleList,
              });
              toast("Updated succesfully", {
                type: "success",
              });
              setIsVehicleModalOpen(false);
            } catch (error) {
              toast((error as Error).message, {
                type: "error",
              });
            }
          } else {
            try {
              const newVehicle = await addVehicle(vehicle);
              setIsVehicleModalOpen(false);
              toast("Added successfully", {
                type: "success",
              });
            } catch (error) {
              toast((error as Error).message, {
                type: "error",
              });
            }
          }
        }}
        onClose={() => {
          setSelectedVehicle(undefined);
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
            await deleteVehicleById({
              brand: selectedVehicle!.brand,
              carPlate: selectedVehicle!.carPlate,
              engineCapacity: selectedVehicle!.engineCapacity,
              fabricationDate: selectedVehicle!.fabricationDate,
              horsePower: selectedVehicle!.horsePower,
              id: selectedVehicle!.id!,
              numberOfSeats: selectedVehicle!.numberOfSeats,
              userId: selectedVehicle!.owner.userId,
            });
            toast("Deleted succesfully!", {
              type: "success",
            });
          } catch (error: unknown) {
            toast((error as Error).message, {
              type: "error",
            });
          } finally {
            setIsAreYouSureModalOpen(false);
          }
        }}
      />
      {selectedVehicle && (
        <IncidentsModal
          isOpen={isIncidentModalOpen}
          vehicle={selectedVehicle}
          onClose={() => {
            setIsIncidentModalOpen(false);
          }}
        />
      )}

      {vehicles === undefined ? (
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
                onClick={() => {
                  setIsVehicleModalOpen(true);
                }}
              >
                <AddIcon />
                <Typography sx={{ marginTop: "3px" }} id="vehicle-modal-button">
                  Add vehicle
                </Typography>
              </Box>
            </Box>
          )}
          {width > 800 ? (
            <>
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
                      <TableCell>Number of incidents</TableCell>
                      <TableCell>Owner name</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicles.elements.map((vehicle) => {
                      return (
                        <TableRow key={vehicle.id}>
                          <TableCell>{vehicle.brand}</TableCell>
                          <TableCell>{vehicle.horsePower}</TableCell>
                          <TableCell>{vehicle.carPlate}</TableCell>
                          <TableCell>{vehicle.numberOfSeats}</TableCell>
                          <TableCell>{vehicle.engineCapacity}</TableCell>
                          <TableCell>{vehicle.fabricationDate}</TableCell>
                          <TableCell>{vehicle.numberOfIncidents}</TableCell>
                          <TableCell>
                            {
                              <Link href={`/user/${vehicle.owner.username}`}>
                                {vehicle.owner.username}
                              </Link>
                            }
                          </TableCell>
                          {isElementVisibleForUser(
                            userDto,
                            isAuthentificated,
                            vehicle.owner.username
                          ) && (
                            <>
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
                                <EditIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setSelectedVehicle(vehicle);
                                    setIsVehicleModalOpen(true);
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <RemoveRedEyeIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setSelectedVehicle(vehicle);
                                    setIsIncidentModalOpen(true);
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
              </TableContainer>
            </>
          ) : (
            <>
              <Box>
                {vehicles.elements.map((vehicle) => {
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
                          <Typography>Brand:</Typography>
                          <Typography>{vehicle.brand}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Horse Power:</Typography>
                          <Typography>{vehicle.horsePower}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Car Plate:</Typography>
                          <Typography>{vehicle.carPlate}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Seats:</Typography>
                          <Typography>{vehicle.numberOfSeats}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Engine Capacity:</Typography>
                          <Typography>{vehicle.engineCapacity}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Fabrication Date:</Typography>
                          <Typography>{vehicle.fabricationDate}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Number of Incidents:</Typography>
                          <Typography>{vehicle.numberOfIncidents}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Owner Name:</Typography>
                          <Link href={`/user/${vehicle.owner.username}`}>
                            {vehicle.owner.username}
                          </Link>
                        </Box>
                      </Box>
                      {isElementVisibleForUser(
                        userDto,
                        isAuthentificated,
                        vehicle.owner.username
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
                              handleOnDelete(vehicle);
                            }}
                          />
                          <EditIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              handleOnUpdate(vehicle);
                            }}
                          />
                          <RemoveRedEyeIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              handleShowIncidents(vehicle);
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
              take={take}
              totalNumberOfElements={vehicles.totalNumberOfElements}
              onChangePage={(pageNumber) => {
                setVehicles(undefined);
                setSkip(take * (pageNumber - 1));
              }}
              pageNumber={Math.ceil(skip / take) + 1}
              className={styles.pagination}
            />
          </Box>
        </>
      )}
    </div>
  );
}

const paginationButtons = {
  paddingBlock: "20px",
  gap: "20px",
  display: "flex",
  justifyContent: "center",
};

const paginationButton = {
  minWidth: "100px",
};

const vehicleRowStyle = {
  display: "flex",
  justifyContent: "space-between",
};
