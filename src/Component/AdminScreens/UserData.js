import React, { useState } from "react";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, onValue } from "firebase/database";
import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const UserData = () => {
  const [val, setVal] = useState([]);
  const database = getDatabase(app);
  const gettingDataFromFireBase = () => {
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
    gettingDataFromFireBase();
  }, []);

  let key = Object.keys(val);
  // console.log(key);
  // console.log(val);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "userName", headerName: "User Name", width: 130 },
    { field: "email", headerName: "E-mail", width: 190 },
    { field: "status", headerName: "status", width: 190 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (cellValues) => {
        return <Button variant="contained">Promote</Button>;
      },
    },
    {
      field: "moreInfo",
      headerName: "More Info",
      width: 130,
      renderCell: (cellValues) => {
        return <Button variant="contained">More Info</Button>;
      },
    },
  ];

  const rows = val.map((row, index) => ({
    id: index + 1,
    userName: row.fullName,
    email: row.email,
  }));
 
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h5" style={{ textAlign: "center", marginBottom: 3 }}>
        User Details
      </Typography>
      <Grid container>
        {!rows ? (
          "loading..."
        ) : (
          <Box height={400} width="100%">
            <DataGrid columns={columns} rows={rows} pageSize={5} />
          </Box>
        )}
      </Grid>

    </Box>
  );
};

export default UserData;
