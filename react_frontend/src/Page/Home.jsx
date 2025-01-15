import React, { useState } from "react";
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import TaskList from "./Task/TaskList";

const Home = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Grid container spacing={2}>
          {/* Sidebar - 1 Column */}
          <Grid item xs={12} sm={2}>
            <Sidebar setMode={setMode} mode={mode} />
          </Grid>

          {/* TaskList - 3 Columns */}
          <Grid item xs={12} sm={7}>
            <Box sx={{ marginTop: 2 }}>
              <TaskList />
            </Box>
          </Grid>

          {/* Rightbar - 1 Column */}
          <Grid item xs={12} sm={3}>
            <Rightbar />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Home;