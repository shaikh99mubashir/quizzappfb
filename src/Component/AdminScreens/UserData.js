import React, { useState } from "react";
import app from "../FirebaseConfig/Config";
import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  push,
} from "firebase/database";
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
        let entries = Object.entries(value);
        setVal(
          entries.map(([key, value], index) => {
            return {
              ...value,
              uid: key,
              id: index + 1,
            };
          })
        );
      }
    });
  };
  React.useEffect(() => {
    gettingDataFromFireBase();
  }, []);

  // console.log(key);
  console.log(val);
  const promote = (event) => {
    const { uid } = event;
    const reference = ref(database, `users/${uid}`);
    update(reference, { isOwner: !!!event.isOwner });
    setVal((value) => {
      return value.map((item, index) => {
        if (item.uid == event.uid) {
          return {
            ...item,
            isOwner: !!!event.isOwner,
          };
        } else return item;
      });
    });
  };

  console.log("VALUE", val);

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
        return (
          <Button variant="contained" onClick={() => promote(cellValues.row)}>
            {cellValues.row.isOwner ? "Demote" : "Promote"}
          </Button>
        );
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

  // const rows = val.map((row, index) => ({
  //   id: index + 1,
  //   userName: row.fullName,
  //   email: rIUTTow.email,
  // }));

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h5" style={{ textAlign: "center", marginBottom: 3 }}>
        User Details
      </Typography>
      <Grid container>
        <Box height={400} width="100%">
          <DataGrid columns={columns} rows={val} pageSize={5} />
        </Box>
      </Grid>
    </Box>
  );
};

export default UserData;
