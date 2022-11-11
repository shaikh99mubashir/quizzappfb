import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, TextField } from "@mui/material";
import MultiSelect from "../Component/AdminScreens/MultipleSelect";
import app from "../Component/FirebaseConfig/Config";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const TrainerRegistration = () => {
  const [othersQualification, setOthersQualification] = useState("");
  const initialData = {
    firstName: "",
    lastName: "",
    cnic: "",
    contactNo: "",
    qualification: "",
    othersQualification: [],
    courses: "",
  };
  const [trainerRegistration, setTrainerRegistration] = useState(initialData);
  console.log("Trainer Registration", trainerRegistration);
  const [courseData, setCourseData] = useState('')

  const addMoreQualification = () => {
    setTrainerRegistration({
      ...trainerRegistration,
      othersQualification: [
        ...trainerRegistration.othersQualification,
        othersQualification,
      ],
    });
    setOthersQualification('')

  };

  const handleDelete = (event) => {
    setTrainerRegistration({
      ...trainerRegistration,
      othersQualification: trainerRegistration.othersQualification.filter(
        (e, i) => e !== event
      ),
    });
  };
  const database = getDatabase(app);
  const gettingFormControlDataFromFireBase = () => {
    const reference = ref(database, `formControl`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        console.log('values', values)
        let courseVal = values.filter((e,i)=> (e.isFormOpen === 'open'))
        .map((x,i)=> (x.selectCourse))
        let sortedItem = new Set(courseVal);
        setCourseData([...sortedItem]);
      }
    });
  };

  const submitTrainerData = () =>{
    alert("Data Send SucessFully");
    const refrence = ref(database, `trainerRegistration`);
    push(refrence, trainerRegistration);
    setTrainerRegistration(initialData);
  }
  
  useEffect(()=>{
    gettingFormControlDataFromFireBase()
  },[])
  return (
    <Box>
      <Grid
        container
        sx={{
          display: "grid",
          width: "100%",
          border: "1px solid eee",
          placeItems: "center",
          marginTop: 3,
        }}
      >
        <Grid
          item
          md={6}
          sm={8}
          xs={12}
          sx={{
            width: "100%",
            border: "1px solid eee",
            boxShadow: "1px 5px #eeeeee",
            padding: 3,
            borderRadius: 5,
          }}
        >
          <h1>Trainer Registration</h1>
          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              required
              value={trainerRegistration.firstName}
              sx={{ width: "50%" }}
              label="First Name"
              variant="standard"
              onChange={(e) =>
                setTrainerRegistration({
                  ...trainerRegistration,
                  firstName: e.target.value,
                })
              }
            />
            <TextField
              required
              value={trainerRegistration.lastName}
              sx={{ width: "50%" }}
              label="Last Name"
              variant="standard"
              onChange={(e) =>
                setTrainerRegistration({
                  ...trainerRegistration,
                  lastName: e.target.value,
                })
              }
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
            <TextField
              required
              value={trainerRegistration.cnic}
              sx={{ width: "50%" }}
              label="CNIC"
              type="number"
              variant="standard"
              onChange={(e) =>
                setTrainerRegistration({
                  ...trainerRegistration,
                  cnic: e.target.value,
                })
              }
            />
            <TextField
              required
              value={trainerRegistration.contactNo}
              sx={{ width: "50%" }}
              label="Contact"
              type="number"
              variant="standard"
              onChange={(e) =>
                setTrainerRegistration({
                  ...trainerRegistration,
                  contactNo: e.target.value,
                })
              }
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
            <TextField
              required
              value={trainerRegistration.qualification}
              sx={{ width: "100%" }}
              label="Qualification"
              variant="standard"
              onChange={(e) =>
                setTrainerRegistration({
                  ...trainerRegistration,
                  qualification: e.target.value,
                })
              }
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3, marginTop: 3 }}>
            <TextField
              sx={{ width: "70%" }}
              label="Other Qualification"
              variant="standard"
              value={othersQualification}
              onChange={(e) => setOthersQualification(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ width: "20%" }}
              onClick={addMoreQualification}
            >
              ADD
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={12} sm={8} xs={12} sx={{ display: "flex", gap: 2 }}>
              {trainerRegistration.othersQualification.length
                ? trainerRegistration.othersQualification.map((e, i) => (
                    <Chip
                      label={e}
                      key={i}
                      variant="outlined"
                      onDelete={() => handleDelete(e)}
                    />
                  ))
                : ""}
            </Grid>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <MultiSelect label="course" ddValues={courseData} 
             onChange={(e) =>
                setTrainerRegistration({
                  ...trainerRegistration,
                  courses: e,
                })
              }
              
            />
          </Box>
          <Box sx={{ marginTop: 3, display: "grid", placeItems: "center" }}>
            <Button variant="contained" sx={{ width: "20%" }} onClick={submitTrainerData}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrainerRegistration;
