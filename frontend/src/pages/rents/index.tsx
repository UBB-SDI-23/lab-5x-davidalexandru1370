import {
  Box,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export default function Rents() {
  return (
    <div>
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
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Box>
    </div>
  );
}
