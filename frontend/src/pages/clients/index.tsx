import { Client } from "@/model/Client";
import {
  Box,
  Button,
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
import { Inter } from "next/font/google";
import { useEffect, useReducer, useState } from "react";
import {
  addClient,
  deleteClientById,
  getClientsPaginated,
  updateClient,
} from "../api/ClientApi";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
import {
  ClientModal,
  ClientModalMethodsEnum,
} from "@/components/ClientModal/ClientModal";
import { ClientDto } from "@/model/ClientDto";

const inter = Inter({ subsets: ["latin"] });

export default function Clients() {
  const [clients, setClients] = useState<Client[]>();
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [clientModalMethod, setClientModalMethod] =
    useState<ClientModalMethodsEnum>(ClientModalMethodsEnum.ADD);
  const [isClientModalOpen, setIsClientModalOpen] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const take = 5;

  useEffect(() => {
    if (isAreYouSureModalOpen === true || isClientModalOpen === true) {
      return;
    }
    getClientsPaginated(skip, take).then((c) => {
      setClients(c);
    });
  }, [isClientModalOpen, isAreYouSureModalOpen, skip]);

  return (
    <div>
      <ClientModal
        onSubmitClick={async (client: ClientDto) => {
          if (clientModalMethod === ClientModalMethodsEnum.ADD) {
            await addClient(client);
          } else {
            await updateClient({
              ...client,
              id: selectedClient!.id,
            });
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
            console.log((error as Error).message);
          }
          setIsAreYouSureModalOpen(false);
        }}
      />
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
      {clients === undefined ? (
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
        <>
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
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => {
                  return (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.cardNumber}</TableCell>
                      <TableCell>{client.cnp}</TableCell>
                      <TableCell>{client.birthday.toString()}</TableCell>
                      <TableCell>{client.nationality}</TableCell>
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
          <Box component={Paper} sx={paginationButtons}>
            <Button
              variant="contained"
              sx={paginationButton}
              disabled={skip === 0}
              onClick={() => {
                if (skip - take >= 0) {
                  setSkip(skip - take);
                }
              }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              disabled={clients.length < take}
              sx={paginationButton}
              onClick={() => {
                setSkip(skip + take);
              }}
            >
              Next
            </Button>
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
