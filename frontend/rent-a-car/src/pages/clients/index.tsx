import { Client } from "@/model/Client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { getAllClients } from "../api/ClientApi";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { AreYouSureModal } from "@/components/AreYouSureModal/AreYouSureModal";
const inter = Inter({ subsets: ["latin"] });

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAreYouSureModalOpen, setIsAreYouSureModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    getAllClients().then(async (x) => {
      setClients(x);
    });
  }, []);

  return (
    <div>
      <AreYouSureModal
        isOpen={isAreYouSureModalOpen}
        onCancelClick={() => {
          setIsAreYouSureModalOpen(false);
        }}
        onOkClick={() => {
          setIsAreYouSureModalOpen(false);
        }}
      />
      <TableContainer component={Paper}>
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
                        setIsAreYouSureModalOpen(true);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <EditIcon sx={{ cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
