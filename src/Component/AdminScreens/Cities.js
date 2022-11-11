import React, { useState } from "react";
import app from "../FirebaseConfig/Config";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import InfoSelect from "../AdminScreens/InfoSelect";
import { DataGrid } from "@mui/x-data-grid";

const Cities = () => {
  const initialData = {
    cityName: "",
    cityCode: "",
  };

  const [cities, setCities] = useState(initialData);
  const [city, setCity] = useState([]);
  const [dropDownItem, setDropDownItem] = useState("");
  const database = getDatabase(app);

  const submitCityData = () => {
    cities.countryName = dropDownItem;
    const refrence = ref(database, `cities`);
    push(refrence, cities);
    setCities(initialData);
    setDropDownItem("");
  };

  const [val, setVal] = useState([]);

  const gettingCountriesDataFromFireBase = () => {
    const reference = ref(database, `countries`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        let country = values.map((e, i) => {
          return e.countryName;
        });
        let va = new Set(country);
        setVal([...va]);
      }
    });
  };
  console.log("val", val);
  React.useEffect(() => {
    gettingCountriesDataFromFireBase();
  }, []);

  const gettingCitiesDataFromFireBase = () => {
    const reference = ref(database, `cities`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        let keys = Object.keys(value)

        keys.map((x,i)=>{
          setCity(values.map((e,i)=>{
            return{ ...e,
                    uid: x,
                  id: i+1}
          }))
        })
        console.log('keys',keys)
      }
    });
  };

  React.useEffect(() => {
    gettingCitiesDataFromFireBase();
  }, []);
  
  const deleteRow = (event) =>{
      let uid = event.uid
      console.log('uid',uid)
      console.log('event',event)
    const reference = ref(database, `city/${uid}`)
    remove(reference)
  }
  const columns = [
    { field: "id", headerName: "S.No.", width: 50 },
    { field: "countryName", headerName: "Country Name", width: 130 },
    { field: "cityName", headerName: "City Name", width: 130 },
    { field: "cityCode", headerName: "City Code", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (cellValues) => {
        return <Button variant="contained" onClick={()=>deleteRow(cellValues.row)}>Delete</Button>;
      },
    },
  ];

  console.log('citiesValue',cities)

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
            <h1>Add Cities</h1>

            <Box sx={{ display: "flex", padding: 3, marginBottom: 3, gap: 2 }}>
              <Box sx={{ width: "100%" }}>
                <InfoSelect
                  courseObj={val}
                  label="Select Courses"
                  dropDownItem={setDropDownItem}
                  value={dropDownItem}
                />
              </Box>
              <TextField
                fullWidth
                label="City Name"
                variant="standard"
                value={cities.cityName}
                onChange={(e) =>
                  setCities((prev) => ({
                    ...prev,
                    cityName: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="City Code"
                variant="standard"
                value={cities.cityCode}
                onChange={(e) =>
                  setCities((prev) => ({
                    ...prev,
                    cityCode: e.target.value,
                  }))
                }
              />
            </Box>
            <Button
              variant="contained"
              sx={{ marginBottom: 3 }}
              onClick={submitCityData}
            >
              Submit
            </Button>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{display:'grid', placeItems:'center'}}>
      <Box height={400} width="52%" sx={{ margin: 5, }}>
        <DataGrid columns={columns} rows={city} pageSize={5} />
      </Box>
      </Box>

    </Box>
  );
};

export default Cities;
