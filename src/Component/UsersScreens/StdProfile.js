import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";

const StdProfile = () => {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", height:'100%' }}>
      <Grid Container>
        <Grid sx={{padding:1}} md={3} item>
            <Paper sx={{width:'100%', padding:2, textAlign:'center'}}>
                <Box>

                </Box>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StdProfile;
