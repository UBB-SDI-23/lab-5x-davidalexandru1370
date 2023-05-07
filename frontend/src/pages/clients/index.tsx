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
import {
  addClient,
  deleteClientById,
  getClientsPaginated,
  updateClient,
} from "../api/ClientApi";
import styles from "./clients.module.css";
import { toast } from "react-toastify";
import { RolesEnum } from "@/enums/RolesEnum";

export default function Clients() {
  const [clients, setClients] = useState<IPagination<Client>>();
  const [numberOfRents, setNumberOfRents] = useState<number[]>([]);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clientModalMethod, setClientModalMethod] =
    useState<ClientModalMethodsEnum>(ClientModalMethodsEnum.ADD);
  const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { skip, take, setSkip, userDto, isAuthentificated } = useContext(
    AuthentificationContext
  );

  useEffect(() => {
    if (isAreYouSureModalOpen === true || isClientModalOpen === true) {
      return;
    }
    getClientsPaginated(skip, take).then((c) => {
      setClients(c);
    });
  }, [isClientModalOpen, isAreYouSureModalOpen, skip, take]);

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
                id: selectedClient!.id,
                ownername: userDto?.username!,
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
            selectedClient && (await deleteClientById(selectedClient.id));
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
          <TableContainer
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
                          <Link href={`/user/${client.ownername}`}>
                            {client.ownername}
                          </Link>
                        }
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {isAuthentificated &&
                          ((userDto?.role === RolesEnum.Regular &&
                            client.ownername === userDto.username) ||
                            ((userDto?.role === RolesEnum.Moderator ||
                              userDto?.role === RolesEnum.Admin) && (
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
                            )))}
                      </TableCell>
                      <TableCell>
                        <EditIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setClientModalMethod(ClientModalMethodsEnum.UPDATE);
                            setSelectedClient(client);
                            setIsClientModalOpen(true);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
