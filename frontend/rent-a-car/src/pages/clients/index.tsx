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
              {Array<keyof Client>().map((key) => {
                return <></>;
              })}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}
