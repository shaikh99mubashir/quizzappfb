import React, { useState } from 'react'
import app from "../FirebaseConfig/Config";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TrainerRegistrationData = () => {
    const [data, setData] = useState([]);
    const database = getDatabase(app);
    const gettingResultDataFromFireBase = () => {
      const reference = ref(database, `trainerRegistration`);
      onValue(reference, (e) => {
        if (e.exists()) {
          let value = e.val();
          let values = Object.values(value);
          let keys = Object.keys(value);
          keys.map((e) => {
            setData(
              values.map((x, i) => {
                return {
                  ...x,
                  uid: e,
                  id: i + 1,
                };
              })
            );
          });
        }
      });
    };
  
    const deleteRow = (event) => {
      let uid = event.uid;
      const refrence = ref(database, `trainerRegistration/${uid}`);
      remove(refrence);
    };
  
    const columns = [
      { field: "id", headerName: "S.No.", width: 50 },
      { field: "firstName", headerName: "First Name", width: 130 },
      { field: "lastName", headerName: "Last Name", width: 190 },
      { field: "cnic", headerName: "CNIC", width: 190 },
      { field: "contactNo", headerName: "Contact No", width: 190 },
      { field: "courses", headerName: "Courses", width: 190 },
      { field: "qualification", headerName: "qualification", width: 190 },
      { field: "othersQualification", headerName: "othersQualification", width: 190 },
      {
        field: "action",
        headerName: "Action",
        width: 130,
        renderCell: (cellValues) => {
          return (
            <Button variant="contained" onClick={() => deleteRow(cellValues.row)}>
              Delete
            </Button>
          );
        },
      },
    ];
  
    React.useEffect(() => {
      gettingResultDataFromFireBase();
    }, []);
  return (
    <Box sx={{margin:3}}>
    <h1>Trainer Registration Data</h1>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Box height={400} width="100%" sx={{ margin: 5 }}>
          <DataGrid columns={columns} rows={data} pageSize={5} />
        </Box>
      </Box>
    </Box>
  )
}

export default TrainerRegistrationData