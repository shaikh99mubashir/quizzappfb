import {
  Box,
  Button,
  Card,
  container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import dummyImg from "../Images/dummyImg.webp";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const StdProfile = (props) => {
  const { userData } = props;
  console.log("success", userData);

  const [val, setVal] = useState("");
  const database = getDatabase(app);
  const gettingCountriesDataFromFireBase = () => {
    const reference = ref(database, `users`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        setVal(values);
      }
    });
  };
  React.useEffect(() => {
    gettingCountriesDataFromFireBase();
  }, []);

  console.log("val", val);

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
            <Typography
              sx={{
                color: "grey",
                fontSize: { md: 45, sx: 35, xs: 25 },
                marginTop: 2,
              }}
            >
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography
              sx={{
                color: "grey",
                fontSize: { md: 20, sx: 15, xs: 11 },
                marginTop: "0.02rem",
              }}
            >
              {userData.email}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent:'center',
                flexDirection: { md: "row", sx: "row", xs: "column" },
                gap: 2,
                marginTop: 2,
                marginBottom: 2,
                width: "100%",
                paddingLeft: 6,
                paddingRight: 6,
              }}
            >
            <>
            <Box width='100%' sx={{display:'flex', justifyContent:'center'}}>
              <Box>
                <Typography sx={{ marginBottom:3, fontSize:25}}>Personal Info</Typography>
                <Box sx={{ display: "flex", gap: 1, width:'20vw', }}>
                  <Typography sx={{ fontSize: 22 }}>CNIC: </Typography>
                  <Typography sx={{ fontSize: 22 }}>
                    {" "}
                    {userData.cnic}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1,width:'20vw'  }}>
                  <Typography sx={{ fontSize: 22 }}>Contact : </Typography>
                  <Typography sx={{ fontSize: 22 }}>
                    {" "}
                    {userData.contact}
                  </Typography>
                </Box>
              </Box>
              </Box>
            <Box width='100%' sx={{display:'flex', justifyContent:'center'}}>
              <Box>
              <Typography sx={{ marginBottom:3, fontSize:25}}>Courses Info</Typography>
                <Box sx={{ display: "flex", gap: 2, width:'30vw', }}>
                  <Typography sx={{ fontSize: 22 }}>Course: </Typography>
                  <Typography sx={{ fontSize: 22 }}>
                    {" "}
                    {userData.course}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1,width:'30vw',   }}>
                  <Typography sx={{ fontSize: 22 }}>Roll NO : </Typography>
                  <Typography sx={{ fontSize: 22 }}>
                    {" "}
                    {userData.rollNo}
                  </Typography>
                </Box>
              </Box>
              </Box>
            </>
              
              {/* <Typography sx={{ fontSize: 22 }}></Typography>
              <Typography sx={{ fontSize: 22 }}>{userData.course}</Typography> */}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StdProfile;
