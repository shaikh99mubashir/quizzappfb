import React, { useState } from "react";
import InfoSelect from "./AdminScreens/InfoSelect";
import { signUpUser } from "../Component/FirebaseConfig/FirebaseMethod";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { getDatabase, ref, push } from "firebase/database";
import app from "../Component/FirebaseConfig/Config";
import BasicDatePicker from "../Component/UsersScreens/DatePicket";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Regisration = () => {
  let days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let database = getDatabase(app);
  let date = new Date();
  let dates = date.getDate();
  let day = date.getDay();
  let registeredDay = days[day];
  let month = date.getMonth(months);
  let registeredMonth = months[month];
  let year = date.getFullYear();
  let registrationDateis = `${registeredDay}/${dates}/${registeredMonth}`;
  let [dobis, setDobis] = useState("");
  let [dobYear, setDobYear] = useState("");
  let [stdRollNo, setStdRollNo] = useState(0);
  let [checkBox, setCheckBox] = useState(false);
  let [course, setCourse] = useState("");
  let [section, setSection] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setCheckBox(false);
  }, [checkBox]);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    course: "",
    section: "",
    contact: "",
    cnic: "",
    email: "",
    password: "",
    dob: "",
    age: "",
    fatherName: "",
    fatherCnic: "",
    fatherContact: "",
    emergencyContact: "",
    registrationDate: "",
    registrationYear: "",
    isFeeSubmited: false,
    isApproved: false,
    isActive: false,
    rollNo: "0",
    isOwner:'',
  });
  let userAge = dobYear ? year - dobYear : "";
  const setfeildinDatbase = () => {
    stdRollNo = Number(data.rollNo);
    stdRollNo = stdRollNo + 1;
    stdRollNo = stdRollNo.toString();
    setStdRollNo(stdRollNo);
    let roll = `0000${stdRollNo}`;
    data.registrationDate = registrationDateis;
    data.registrationYear = year;
    data.rollNo = roll;
    data.dob = dobis;
    data.age = year - dobYear;
    data.section = section
    data.course = course
    setData(data);
    let value = Object.values(data)
    let count = 0
    value.forEach((e,i)=>{
      if(e === ""){
        count = count+1
      }
    })
    if(count){
      alert('inComplete Feilds')
    }
    else{
      signUpUser(data)
      .then((success)=>{
      alert(success)
      console.log('success==>',success)
      setData('')
      navigate('/')
    })
    .catch((error)=>{
        console.log('error==>',error)
    })  
    }
    
  };
  const [firstNameError, setNameError] = useState(false);
  const [fatherNameError, setFatherError] = useState(false);
  const firstNameRegex = /^[A-Za-z]+$/;
  const fatherNameRegex = /^[A-Za-z]+$/;

  const handelFirstName = (e) => {
    let firstName = e.target.value;
    if (!firstName.match(firstNameRegex)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setData((prev) => ({
      ...prev,
      firstName: e.target.value,
    }));
  };
  const handelFatherName = (e) => {
    let fatherName = e.target.value;
    if (!fatherName.match(fatherNameRegex)) {
      setFatherError(true);
    } else {
      setFatherError(false);
    }
    setData((prev) => ({
      ...prev,
      fatherName: e.target.value,
    }));
  };

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Grid
          item
          md={6}
          sm={8}
          xs={12}
          sx={{
            border: "1px solid #eeeeee",
            margin: 2,
            padding: 5,
            boxShadow: "1px 5px #eeeeee",
            borderRadius: 5,
          }}
        >
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <Typography variant="p" sx={{ fontSize:{ md:"2.5rem", sm:'2.3rem', xs:'1.5erm' }}}>
              Registration
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={8} xs={12}>
              <Box>
                {firstNameError ? (
                  <span style={{ color: "red", fontSize: 10 }}>Invalid</span>
                ) : null}
                <TextField
                  fullWidth={true}
                  required
                  type="text"
                  onChange={handelFirstName}
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                />
              </Box>
            </Grid>
            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                id="standard-basic"
                label="Last Name"
                variant="standard"
              />
            </Grid>
            {/* Course */}
            <Grid item md={4} sm={8} xs={12}>
              <InfoSelect
                dropDownItem={setCourse}
                value={course}
                label="Course"
                variant="standard"
                dataSource={[
                  {
                    id: "wm",
                    fullName: "Web Mobile",
                  },
                  {
                    id: "mw",
                    fullName: "Mobile Web",
                  },
                ]}
              />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={8} xs={12}>
              {/* section */}
              <InfoSelect
                variant="standard"
                dropDownItem={setSection}
                value={section}
                label="Section"
                dataSource={[
                  {
                    id: "am",
                    fullName: "AM",
                  },
                  {
                    id: "bm",
                    fullName: "BM",
                  },
                ]}
              />
            </Grid>
            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                type='number'
                required
                onChange={(e) =>
                  setData((prev) => ({ ...prev, contact: e.target.value }))
                }
                id="standard-basic"
                label="Contact"
                variant="standard"
              />
            </Grid>
            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullwidth={true}
                required
                onChange={(e) =>
                  setData((prev) => ({ ...prev, cnic: e.target.value }))
                }
                id="standard-basic"
                type='number'
                label="Cnic"
                variant="standard"
              />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={8} xs={12}>
              <BasicDatePicker setDobis={setDobis} setDobYear={setDobYear} />
            </Grid>

            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                disabled
                id="standard-basic"
                value={userAge}
                label={userAge ? "Age" : "Age"}
                variant="standard"
              />
            </Grid>

            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                type='number'
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    emergencyContact: e.target.value,
                  }))
                }
                id="standard-basic"
                label="Emergency Contact"
                variant="standard"
              />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                id="standard-basic"
                label="Email"
                variant="standard"
              />
            </Grid>

            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth
                type='password'
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                id="standard-basic"
                label="Password"
                variant="standard"
              />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={8} xs={12}>
              {firstNameError ? (
                <span style={{ color: "red", fontSize: 10 }}>Invalid</span>
              ) : null}
              <TextField
                fullWidth={true}
                required
                onChange={handelFatherName}
                id="standard-basic"
                label="Father Name"
                variant="standard"
              />
            </Grid>
            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                type='number'
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    fatherCnic: e.target.value,
                  }))
                }
                id="standard-basic"
                label="Father CNIC"
                variant="standard"
              />
            </Grid>
            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                type='number'
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    fatherContact: e.target.value,
                  }))
                }
                id="standard-basic"
                label="Father Contact"
                variant="standard"
              />
            </Grid>
          </Box>
          

        
          <Box sx={{ marginTop: 5, display: "grid", placeItems: "center" }}>
            
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={setfeildinDatbase}
              >
                Subimit
              </Button>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Regisration;
