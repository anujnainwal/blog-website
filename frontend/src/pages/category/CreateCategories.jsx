import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Box, Paper } from "@mui/material";

const CreateCategories = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 300,
            height: 200,
          },
        }}
      >
        <Paper elevation={3} />
      </Box>
    </React.Fragment>
  );
};

export default CreateCategories;
