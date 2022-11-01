import React from 'react'
import app from '../FirebaseConfig/Config'
import { getDatabase, ref, onValue } from "firebase/database";
import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const StudentInfo = () => {
    const [val, setVal] = useState([]);
    const database = getDatabase(app);
    const gettingQuizDataFromFireBase = () => {
      const reference = ref(database, `students`);
      onValue(reference, (e) => {
        if (e.exists()) {
          let value = e.val();
          let values = Object.values(value);
          setVal(values);
        }
      });
    };
  
    React.useEffect(() => {
      gettingQuizDataFromFireBase();
    }, []);

    console.log('Student info val', val)

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "firstName", headerName: "First Name", width: 130 },
        { field: "lastName", headerName: "Last Name", width: 190 },
        { field: "rollNo", headerName: "Roll NO", width: 190 },
        { field: "section", headerName: "Section", width: 190 },
        { field: "course", headerName: "Course", width: 190 },
        { field: "contact", headerName: "Contact", width: 190 },
        { field: "cnic", headerName: "CNIC", width: 190 },
        { field: "dob", headerName: "Date of Birth", width: 190 },
        { field: "fatherName", headerName: "Father Name", width: 190 },
        { field: "fatherContact", headerName: "Father Contact", width: 190 },
        { field: "fatherCnic", headerName: "Father Cnic", width: 190 },
        { field: "emergencyContact", headerName: "Emergency Contact", width: 190 },
        { field: "isActive", headerName: "Is Active", width: 190 },
        { field: "isApproved", headerName: "Is Approved", width: 190 },
        { field: "isFeeSubmited", headerName: "Fee Submmited", width: 190 },
        { field: "registrationDate", headerName: "Registeration Date", width: 190 },
        { field: "registrationYear", headerName: "Registration Year", width: 190 },
        {
          field: "action",
          headerName: "Action",
          width: 130,
          renderCell: (cellValues) => {
            return <Button variant="contained">More Info</Button>;
          },
        },
      ];

      const rows = val.map((row, index) => ({
        id: index + 1,
        firstName: row.firstName,
        lastName: row.lastName,
        rollNo: row.rollNo,
        section: row.section,
        course: row.course,
        contact: row.contact,
        cnic: row.cnic,
        dob: row.dob,
        fatherName: row.fatherName,
        fatherContact: row.fatherContact,
        fatherCnic: row.fatherCnic,
        emergencyContact: row.emergencyContact,
        isActive: row.isActive,
        isApproved: row.isApproved,
        isFeeSubmited: row.isFeeSubmited,
        registrationDate: row.registrationDate,
        registrationYear: row.registrationYear,
      }));
  return (
    <div>
      <Box sx={{ padding: 5 }}>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: 3 }}
        >
          Student Infomation
        </Typography>
        <Grid container>
          {!rows ? (
            "loading..."
          ) : (
            <Box height={400} width="100%">
              <DataGrid columns={columns} rows={rows} pageSize={5}  />
            </Box>
          )}
        </Grid>
      </Box>
    </div>
  )
}

export default StudentInfo
