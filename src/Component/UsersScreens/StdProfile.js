import {
  Box,
  Button,
  Card,
  container,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import dummyImg from "../Images/dummyImg.webp";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { useState } from "react";
const StdProfile = () => {
  const [val, setVal] = useState('')
  const database = getDatabase(app);
  const gettingCountriesDataFromFireBase = () => {
    const reference = ref(database, `users`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        console.log(values)
        setVal(values)
      }
    });
  };
  console.log('val', val)
  React.useEffect(() => {
    gettingCountriesDataFromFireBase();
  }, []);

  return (
    <Box>
      <Grid container sx={{ display: "grid", placeItems: "center" }}>
        <Grid item md={8} sm={10} xs={12}>
          <Card
            sx={{
              width: { md: "60vw", sx: "60vw", xs: "100vw" },
              display: "grid",
              placeItems: "center",
              // height: "100vh",
            }}
          >
            <Box sx={{ display: "grid", placeItems: "center" }}>
              <Stack>
                <Avatar
                  alt="Remy Sharp"
                  src={dummyImg}
                  sx={{
                    width: { md: 200, sx: 170, xs: 140 },
                    height: { md: 200, sx: 170, xs: 140 },
                  }}
                />
              </Stack>
              <Button
                sx={{
                  color: "grey",
                  border: "0.01rem solid grey",
                  marginTop: 2,
                  width: { md: 170, sx: 170, xs: 130 },
                  height: { md: 30, sx: 30, xs: 20 },
                  fontSize: { md: 12, sx: 8, xs: 10 },
                }}
              >
                Edit Profile Image
              </Button>
            </Box>
            <h1 style={{ color: "grey" }}>Personal Information</h1>

            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", sx: "row", xs: "column" },
                gap: 2,
                marginTop: 2,
                marginBottom: 2,
                width:'100%',
                paddingLeft:6,
                paddingRight:6
              }}
            >
              <TextField
                fullWidth={true}
                value={val.firstName}
                id="standard-basic"
                label="First Name"
                variant="standard"
              />

              <TextField
                fullWidth={true}
                id="standard-basic"
                label="Last Name"
                variant="standard"
              />
              <TextField
                fullWidth={true}
                id="standard-basic"
                label="Age"
                variant="standard"
              />
            </Box>
            
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StdProfile;
