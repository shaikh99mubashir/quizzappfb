import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { signUpUser } from "../Component/FirebaseConfig/FirebaseMethod";
import { Box } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
// import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate()
  const [isloding, setLoding] = useState(false)
    const [fullName, setfullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isOwner, setOwner] = useState(false);
    const [isAdmin, setadmin] = useState(false);

    const signUpButtonClicked=()=>{
      setfullName('') 
      setEmail('')
      setLoding(true)
      signUpUser({email, password, fullName, isOwner,isAdmin})
      .then((success)=>{
      setLoding(false)
      // alert(success)
      navigate('/');
      console.log('success==>',success)
    })
    .catch((error)=>{
      setLoding(false)
        console.log('error==>',error)
    })
   }


  return (
    <Box>
      <Grid container sx={{ display: "grid", placeItems: "center", marginTop:10}}>
        <Grid item md={4} sm={6} xs={12}>
          <Box sx={{ width: 400 }}>
            <Box sx={{ marginTop: 5 }}>
              <Typography variant="p" sx={{ fontSize: "2.5rem" }}>
                Welcome!
              </Typography>
              <Box sx={{ marginTop: 5 }}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Full Name"
                  variant="standard"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", marginTop: 5 }}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ marginTop: 1 }}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box sx={{ marginTop: 3 }}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  label="Password"
                  variant="standard"
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box sx={{ marginTop: 5 }}>
                <Button variant="contained" color="primary" disabled={isloding} fullWidth onClick={()=>signUpButtonClicked()}>
                {isloding?  <CircularProgress style={{color:'black',height:20,width:20}} /> : 'SignIn'} 
                </Button>
              </Box>
              <Box sx={{ marginTop: 2 }}>
              <Link to='/' style={{textDecoration:'none'}}>
                <Button variant="contained" color="primary" fullWidth>
                  Already have account?
                </Button>
              </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
