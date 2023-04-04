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
const inter = Inter({ subsets: ["latin"] });

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getAllClients().then(async (x) => {
      setClients(x);
    });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: "1000px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>CNP</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => {
              return (
                <TableRow>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.cardNumber}</TableCell>
                  <TableCell>{client.cnp}</TableCell>
                  <TableCell>{client.birthday.toString()}</TableCell>
                  <TableCell>{client.nationality}</TableCell>
                  <TableCell>
                    <ClearIcon sx={{ color: "red", cursor: "pointer" }} />
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
