import React, { useState } from "react";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { Box } from "@mui/system";
import { Button, Card, Grid, TextField } from "@mui/material";
import InfoSelect from "./InfoSelect";
import MultipleSelect from "./MultipleSelect";
import BasicDatePicker from "./BasicDatePicker";
const FormControl = () => {
  const [courseValue, setCourseValue] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [cityDataValues, setCityDataValues] = useState([]);
  const [countryValue, setCountryValue] = useState([]);
  const [cityData, setCityData] = useState("");
  const [dropDownItem, setDropDownItem] = useState("");
  const database = getDatabase(app);

  const initialData = {
    selectCourse: "",
    isFormOpen: "",
    selectCountry: "",
    selectedCities: [],
    admissionStartDate: "",
    admissionEndDate: "",
  };
  const [formControl, setFormControl] = useState(initialData);

  const gettingCourseDataFromFireBase = () => {
    const reference = ref(database, `courses`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);

        let course = values.map((e, i) => e.courseName);
        let va = new Set(course);
        const vaa = [...va];
        setCourseValue(vaa);
      }
    });
  };

  const gettingCitiesDataFromFireBase = () => {
    const reference = ref(database, `cities`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();

        let values = Object.values(value);
        setCityDataValues(values);
        let country = values.map((e, i) => e.countryName);
        let va = new Set(country);
        const vaa = [...va];
        setCountryValue(vaa);

        let keys = Object.keys(value);
        keys.map((e) => {
          setCountryData(
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

  React.useEffect(() => {
    gettingCourseDataFromFireBase();
    gettingCitiesDataFromFireBase();
  }, []);

  React.useEffect(() => {
    setCityData(
      cityDataValues.filter((e, i) => {
        return e.countryName == dropDownItem;
      }).map((e)=>(e.cityName))
    );
  }, [dropDownItem]);

  const submitFormControlData = () => {
    alert("Data Send SucessFully");
    formControl.selectCountry = dropDownItem;
    const refrence = ref(database, `formControl`);
    push(refrence, formControl);
    setFormControl(initialData);
    setDropDownItem("");
  };

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
            <h1>Form Control</h1>

            <Box sx={{ display: "flex", padding: 3, gap: 2, width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <InfoSelect
                  value={formControl.selectCourse}
                  courseObj={courseValue}
                  label="Select Courses"
                  dropDownItem={(e) =>
                    setFormControl((prev) => ({
                      ...prev,
                      selectCourse: e,
                    }))
                  }
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <InfoSelect
                  value={formControl.isFormOpen}
                  label="Is Form Open"
                  dropDownItem={(e) =>
                    setFormControl((prev) => ({
                      ...prev,
                      isFormOpen: e,
                    }))
                  }
                  dataSource={[
                    {
                      id: "open",
                      fullName: "Open",
                    },
                    {
                      id: "closed",
                      fullName: "closed",
                    },
                  ]}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: 3,
                marginBottom: 3,
                gap: 2,
                width: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <InfoSelect
                  value={formControl.selectCountry}
                  courseObj={countryValue}
                  dropDownItem={setDropDownItem}
                  label="open In Countries"
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <MultipleSelect
                  ddValues={cityData}
                  label="Cities"
                  variant="standard"
                  onChange={(e) =>
                    setFormControl((prev) => ({
                      ...prev,
                      selectedCities: e,
                    }))
                  }
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
              <Box sx={{ width: "100%" }}>
                <BasicDatePicker
                  label="Start Date"
                  onChange={(e) =>
                    setFormControl((prev) => ({
                      ...prev,
                      admissionStartDate: e,
                    }))
                  }
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <BasicDatePicker
                  label="End Date"
                  onChange={(e) =>
                    setFormControl((prev) => ({
                      ...prev,
                      admissionEndDate: e,
                    }))
                  }
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{ marginBottom: 3 }}
              onClick={submitFormControlData}
            >
              Submit
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormControl;
