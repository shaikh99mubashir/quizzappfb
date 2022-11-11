import React, { useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { DataGrid } from "@mui/x-data-grid";

const Countries = () => {
  const initialData = {
    countryName: "",
    countryCode: "",
    currency: "",
  };

  const [countries, setCountries] = useState(initialData);
  const [country, setCountry] = useState([]);
  const database = getDatabase(app);
  const submitCountryData = () => {
    const refrence = ref(database, `countries`);
    push(refrence, countries);
    setCountries(initialData);
  };

  const gettingCountriesDataFromFireBase = () => {
    const reference = ref(database, `countries`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        let  keys = Object.keys(value);
        keys.map((e)=>{
          setCountry(values.map((x,i)=>{
            return{
              ...x,
              uid:e,
              id: i+1,
            }
          }))
        })
      }
    });
  };
  React.useEffect(() => {
    gettingCountriesDataFromFireBase();
  }, []);

  const deleteRow =(event)=>{
    let uid = event.uid
    const refrence = ref(database, `countries/${uid}`)
    remove(refrence)
  }

  const columns = [
    { field: "id", headerName: "S.No.", width: 50 },
    { field: "countryName", headerName: "Country Name", width: 130 },
    { field: "countryCode", headerName: "Country Code", width: 190 },
    { field: "currency", headerName: "Currency", width: 190 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (cellValues) => {
        return <Button variant="contained" onClick={()=>deleteRow(cellValues.row)}>Delete</Button>;
      },
    },
  ];


  return (
    <Box>
      <Grid container sx={{ display: "grid", placeItems: "center" }}>
        <Grid item md={8} sm={10} xs={12}>
          <Card
            sx={{
              width: { md: "50vw" },
              display: "grid",
              placeItems: "center",
            }}
          >
            <h1>Add Country</h1>

            <Box sx={{ display: "flex", padding: 3, marginBottom: 3, gap: 2 }}>
              <TextField
                fullWidth
                label="Country Name"
                variant="standard"
                value={countries.countryName}
                onChange={(e) =>
                  setCountries((prev) => ({
                    ...prev,
                    countryName: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="Country Code"
                variant="standard"
                value={countries.countryCode}
                onChange={(e) =>
                  setCountries((prev) => ({
                    ...prev,
                    countryCode: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="Currency"
                variant="standard"
                value={countries.currency}
                onChange={(e) =>
                  setCountries((prev) => ({
                    ...prev,
                    currency: e.target.value,
                  }))
                }
              />
            </Box>
            <Button
              variant="contained"
              sx={{ marginBottom: 3 }}
              onClick={submitCountryData}
            >
              Submit
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{display:'grid', placeItems:'center'}}>
      <Box height={400} width="52%" sx={{ margin: 5, }}>
        <DataGrid columns={columns} rows={country} pageSize={5} />
      </Box>
      </Box>
    </Box>
  );
};

export default Countries;
