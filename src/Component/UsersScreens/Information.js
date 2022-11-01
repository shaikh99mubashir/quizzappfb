import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { getDatabase, ref, push } from "firebase/database";
import app from "../FirebaseConfig/Config";
import BasicDatePicker from "./DatePicket";
import InfoSelect from "./InfoSelect";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";

const Information = () => {
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
  let [course, setCourse] = useState('')
  let [section, setSection] = useState('')
  useEffect(()=>{
    setCheckBox(false)
  },[checkBox])

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    course: "",
    section: "",
    contact: "",
    cnic: "",
    fatherName: "",
    fatherCnic: "",
    fatherContact: "",
    emergencyContact: "",
    dob: "",
    age: "",
    registrationDate: "",
    registrationYear: "",
    isFeeSubmited: false,
    isApproved: false,
    isActive: false,
    rollNo: "0",
  });
  let userAge = dobYear ? year - dobYear : "";
  const setfeildinDatbase = () => {
    stdRollNo = Number(data.rollNo);
    stdRollNo = stdRollNo + 1;
    stdRollNo = stdRollNo.toString();
    setStdRollNo(stdRollNo);
    let roll = `0000${stdRollNo}`;
    const reference = ref(database, `students`);
    data.registrationDate = registrationDateis;
    data.registrationYear = year;
    data.rollNo = roll;
    data.dob = dobis;
    data.age = year - dobYear;
    data.section = section
    data.course = course
    setData(data);
    push(reference, data);
  };
  const [firstNameError, setNameError] = useState(false);
  const [fatherNameError, setFatherError] = useState(false);
  const firstNameRegex = /^[A-Za-z]+$/;
  const fatherNameRegex = /^[A-Za-z]+$/;

  const handelFirstName =(e)=>{
    let firstName = e.target.value;
    if(!firstName.match(firstNameRegex)){
      setNameError(true)
      }
      else{
        setNameError(false)
    }
    setData((prev) => ({
      ...prev,
      firstName: e.target.value,
    }))
  }
  const handelFatherName =(e)=>{
    let fatherName = e.target.value;
    if(!fatherName.match(fatherNameRegex)){
      setFatherError(true)
      }
      else{
        setFatherError(false)
    }
    setData((prev) => ({
      ...prev,
      fatherName: e.target.value,
    }))
  }

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
            <Typography variant="p" sx={{ fontSize: "2.5rem" }}>
              INFORMATION
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={6} xs={12}>
            <Box>
            {firstNameError ? <span style={{color:"red", fontSize:10}}>Invalid</span> : null}
              <TextField
                fullWidth={true}
                required
                type='text'
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
              <InfoSelect  dropDownItem={setCourse} value={course} label='Course'
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
                dropDownItem={setSection} value={section} label='Section'
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
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={8} xs={12}>
            {firstNameError ? <span style={{color:"red", fontSize:10}}>Invalid</span> : null}
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
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={4} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
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

          <Box sx={{ marginTop: 3, display: "flex" }}>
            {/* <Checkbox onClick={setCheckBox(true)}/> */}
            <Typography>
              This Informaition Can NOT Edit once Submit! Kindly Verify Again
            </Typography>
          </Box>
          <Box sx={{ marginTop: 5, display: "grid", placeItems: "center" }}>
            {checkBox? (
              <Button variant="contained" color="primary" fullWidth={true} disabled>
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={setfeildinDatbase}
              >
                Subimit
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Information;
