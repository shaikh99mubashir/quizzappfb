import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InfoSelect from "./InfoSelect";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
const CreateResult = () => {
  const [val, setVal] = useState([]);
  const database = getDatabase(app);
  const gettingCourseDataFromFireBase = () => {
    const reference = ref(database, `courses`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        let course = values.map((e, i) => e.courseName);
        let va = new Set(course);
        const vaa = { ...[...va] };
        setVal(vaa);
      }
    });
  };
  console.log(val);
  React.useEffect(() => {
    gettingCourseDataFromFireBase();
  }, []);

  const [resultData, setResultData] = useState([
    {
      name: "mubashir",
      rollNo: 5151,
      marks: 89,
      result: "pass",
    },
    {
      name: "shehbaz",
      rollNo: 5152,
      marks: 89,
      result: "pass",
    },
    {
      name: "zian",
      rollNo: 5153,
      marks: 89,
      result: "pass",
    },
    {
      name: "Moiz",
      rollNo: 5154,
      marks: 89,
      result: "pass",
    },
    {
      name: "suk",
      rollNo: 5155,
      marks: 89,
      result: "pass",
    },
    {
      name: "bilal",
      rollNo: 5156,
      marks: 89,
      result: "pass",
    },
    {
      name: "saleem",
      rollNo: 5157,
      marks: 89,
      result: "pass",
    },
  ]);

  const [createResult, setCreateResult] = useState({
    showResult: false,
    courseResult: "",
    result: resultData,
  });

  const submitResult =()=>{
    const refrence = ref(database, `result`)
    push(refrence, createResult)
  }
  return (
    <Box>
      <Grid
        container
        sx={{
          display: "grid",
          width: "100%",
          border: "1px solid eee",
          placeItems: "center",
        }}
      >
        <Grid
          item
          md={8}
          sm={10}
          xs={12}
          sx={{
            width: "100%",
            border: "1px solid eee",
            boxShadow: "1px 5px #eeeeee",
            padding: 3,
            borderRadius: 5,
          }}
        >
          <h1>Create Result</h1>
          <Box sx={{ display: "flex", gap: 5 }}>
            <Box>
              <FormGroup>
                <FormControlLabel
                  label="Show Result"
                  control={
                    <Switch
                      onChange={(e) => {
                        setCreateResult({
                          ...createResult,
                          showResult: e.target.checked,
                        });
                      }}
                    />
                  }
                />
              </FormGroup>
            </Box>
            <Box sx={{ width: "60%" }}>
              <InfoSelect
                courseObj={val}
                label='Select Courses'
                dropDownItem={(value) => {
                  setCreateResult({
                    ...createResult,
                    courseResult: value,
                  });
                }}
              />
            </Box>
          </Box>
          <Box sx={{display:'grid',placeItems:'center' ,alignItems:'center', marginTop:5}}>
          {createResult.courseResult ?
          <Button variant="contained" onClick={submitResult}>Submit Result</Button>
          : ''}
          </Box>
        </Grid>
      </Grid>
      <table style={{ width: "100%", marginTop: 10 }}>
        <tr>
          <th>Name</th>
          <th>RollNO</th>
          <th>Marks</th>
          <th>Result</th>
        </tr>
        {resultData.map((e, i) => {
          console.log("e", e);
          return (
            <>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <Typography key={i}>{e.name}</Typography>
                </td>
                <td>
                  <Typography>{e.rollNo}</Typography>
                </td>
                <td>
                  <Typography>{e.marks}</Typography>
                </td>
                <td>
                  <Typography>{e.result}</Typography>
                </td>
              </tr>
            </>
          );
        })}
      </table>
    </Box>
  );
};

export default CreateResult;
