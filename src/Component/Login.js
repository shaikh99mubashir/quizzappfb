import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginWithUser } from "../Component/FirebaseConfig/FirebaseMethod";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Login = () => {
  const [isloding, setLoding] = useState(false);
  const auth = getAuth();

  const [textFeild, setTextFeild] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation()
  const loginBtnClicked = () => {
    setTextFeild("");
    setLoding(true);
    loginWithUser(textFeild)
      .then((success) => {
        if (success.isOwner === true) {
          setLoding(false);
          navigate("/admin", { state: success });
        } else {
          console.log("succes login", success);
          setLoding(false);
          localStorage.setItem('userData',JSON.stringify(success))
          navigate("/users");
        }
        // alert('loginSucessfully')
      })
      .catch((error) => {
        setLoding(false);
        console.log("error", error);
      });
  };

return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          marginTop: 10,
        }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Box sx={{ width: 400 }}>
            <Box sx={{ marginTop: 5 }}>
              <Typography variant="p" sx={{ fontSize: "2.5rem" }}>
                {" "}
                Welcome!{" "}
              </Typography>
            </Box>
            <Box>
              <Typography variant="p" sx={{ color: "grey" }}>
                {" "}
                Login to continue.{" "}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <TextField
                id="standard-basic"
                fullWidth
                label="Email"
                variant="standard"
                onChange={(e) =>
                  setTextFeild((prve) => ({ ...prve, email: e.target.value }))
                }
              />
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <TextField
                id="standard-basic"
                type="password"
                fullWidth
                label="Password"
                variant="standard"
                onChange={(e) =>
                  setTextFeild((prve) => ({
                    ...prve,
                    password: e.target.value,
                  }))
                }
              />
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <Button
                variant="contained"
                color="primary"
                disabled={isloding}
                fullWidth
                onClick={loginBtnClicked}
              >
                {" "}
                {isloding ? (
                  <CircularProgress
                    style={{ color: "black", height: 20, width: 20 }}
                  />
                ) : (
                  "Login"
                )}{" "}
              </Button>
            </Box>
            <Box sx={{ marginTop: 3 }}>
              {/* <Link to='signup' style={{textDecoration:'none'}}>
                    <Button variant="contained" color="primary" fullWidth> Create an Account </Button>
                </Link> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
