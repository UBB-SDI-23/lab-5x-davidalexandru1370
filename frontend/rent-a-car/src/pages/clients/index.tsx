import { Client } from "@/model/Client";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Clients() {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>CNP</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Nationality</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}
