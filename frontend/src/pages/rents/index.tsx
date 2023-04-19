import { Box, Paper } from "@mui/material";
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
      ></Box>
    </div>
  );
}
