import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
import {
  ClientModal,
  ClientModalMethodsEnum,
} from "@/components/ClientModal/ClientModal";
import Pagination from "@/components/Pagination/Pagination";
import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import { Client } from "@/model/Client";
import { ClientDto } from "@/model/ClientDto";
import IPagination from "@/model/Pagination";
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
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addClient,
  deleteClientById,
  getClientsPaginated,
  updateClient,
} from "../api/ClientApi";
import styles from "./clients.module.css";
import usePageWidth from "@/hooks/usePageWidth";

export default function Clients() {
  const [clients, setClients] = useState<IPagination<ClientDto>>();
  const [numberOfRents, setNumberOfRents] = useState<number[]>([]);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<ClientDto>();
  const [clientModalMethod, setClientModalMethod] =
    useState<ClientModalMethodsEnum>(ClientModalMethodsEnum.ADD);
  const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { skip, take, setSkip, userDto, isAuthentificated } = useContext(
    AuthentificationContext
  );
  const width = usePageWidth();

  useEffect(() => {
    if (isAreYouSureModalOpen === true || isClientModalOpen === true) {
      return;
    }
    getClientsPaginated(skip, take).then((c) => {
      setClients(c);
    });
  }, [isClientModalOpen, isAreYouSureModalOpen, skip, take]);

  const handleOnUpdate = (client: ClientDto) => {
    setClientModalMethod(ClientModalMethodsEnum.UPDATE);
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  const handleOnDelete = (client: ClientDto) => {
    setSelectedClient(client);
    setIsAreYouSureModalOpen(true);
  };

  return (
    <div>
      <ClientModal
        onSubmitClick={async (client: ClientDto) => {
          if (clientModalMethod === ClientModalMethodsEnum.ADD) {
            await addClient(client);
          } else {
            userDto &&
              (await updateClient({
                ...client,
                id: selectedClient!.id!,
                userId: selectedClient!.owner.userId,
              }));
          }
          setSelectedClient(undefined);
          setIsClientModalOpen(false);
        }}
        isOpen={isClientModalOpen}
        onClose={() => {
          setIsClientModalOpen(false);
        }}
        client={selectedClient}
        method={clientModalMethod}
      />
      <AreYouSureModal
        isOpen={isAreYouSureModalOpen}
        onCancelClick={() => {
          setIsAreYouSureModalOpen(false);
        }}
        onOkClick={async () => {
          try {
            selectedClient &&
              (await deleteClientById({
                birthday: selectedClient.birthday,
                cardNumber: selectedClient.cardNumber,
                cnp: selectedClient.cnp,
                name: selectedClient.name,
                nationality: selectedClient.nationality,
                userId: selectedClient.owner.userId,
                id: selectedClient.id,
              }));
          } catch (error: unknown) {
            toast((error as Error).message, {
              type: "error",
            });
          }
          setIsAreYouSureModalOpen(false);
        }}
      />

      {clients === undefined ? (
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
          {isElementVisibleForUser(
            userDto,
            isAuthentificated,
            userDto?.username
          ) && (
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
                  setSelectedClient(undefined);
                  setClientModalMethod(ClientModalMethodsEnum.ADD);
                  setIsClientModalOpen(true);
                }}
              >
                <AddIcon />
                <Typography sx={{ marginTop: "3px" }}>Add client</Typography>
              </Box>
            </Box>
          )}
          {width > 800 ? (
            <>
              <TableContainer
                key={width}
                component={Paper}
                sx={{ paddingInline: "2rem", minHeight: "60vh" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Card Number</TableCell>
                      <TableCell>CNP</TableCell>
                      <TableCell>Birthday</TableCell>
                      <TableCell>Nationality</TableCell>
                      <TableCell>Owner name</TableCell>
                      <TableCell>Number of rents</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.elements.map((client, index) => {
                      return (
                        <TableRow key={client.id}>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.cardNumber}</TableCell>
                          <TableCell>{client.cnp}</TableCell>
                          <TableCell>{client.birthday.toString()}</TableCell>
                          <TableCell>{client.nationality}</TableCell>
                          <TableCell>
                            {
                              <Link href={`/user/${client.owner.username}`}>
                                {client.owner.username}
                              </Link>
                            }
                          </TableCell>
                          <TableCell>{client.numberOfRents}</TableCell>
                          {isElementVisibleForUser(
                            userDto,
                            isAuthentificated,
                            client.owner.username
                          ) && (
                            <>
                              <TableCell>
                                <ClearIcon
                                  sx={{
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setSelectedClient(client);
                                    setIsAreYouSureModalOpen(true);
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <EditIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setClientModalMethod(
                                      ClientModalMethodsEnum.UPDATE
                                    );
                                    setSelectedClient(client);
                                    setIsClientModalOpen(true);
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
              <Box sx={{ width: "100%" }}>
                {clients.elements.map((client) => {
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
                          <Typography>Name</Typography>
                          <Typography>{client.name}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Card number</Typography>
                          <Typography>{client.cardNumber}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>CNP</Typography>
                          <Typography>{client.cnp}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Birthday</Typography>
                          <Typography>{client.birthday.toString()}</Typography>
                        </Box>
                        <Box sx={vehicleRowStyle}>
                          <Typography>Nationality</Typography>
                          <Typography>{client.nationality}</Typography>
                        </Box>

                        <Box sx={vehicleRowStyle}>
                          <Typography>Owner name:</Typography>
                          <Link href={`/user/${client.owner.username}`}>
                            {client.owner.username}
                          </Link>
                        </Box>
                      </Box>
                      {isElementVisibleForUser(
                        userDto,
                        isAuthentificated,
                        client.owner.username
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
                              handleOnDelete(client);
                            }}
                          />
                          <EditIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              handleOnUpdate(client);
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
              totalNumberOfElements={clients.totalNumberOfElements}
              onChangePage={(pageNumber) => {
                setClients(undefined);
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
