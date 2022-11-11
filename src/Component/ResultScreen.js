import { Box } from "@mui/system";
import React, { useState } from "react";
import InfoSelect from "../Component/AdminScreens/InfoSelect";
import app from "../Component/FirebaseConfig/Config";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ResultScreen = () => {
  const [resultdata, setResultData] = useState([]);
  const [dropDownItem, setDropDownItem] = useState("");
  const [checkWithRollNo, setCheckWithRollNo] = useState("");
  const [val, setVal] = useState([]);
  const database = getDatabase(app);

  const gettingResultDataFromFireBase = () => {
    const reference = ref(database, `result`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        let filterTrueValues = values.filter((e) => e.showResult == true);
        setResultData(filterTrueValues);
        let course = filterTrueValues.map((e) => e.courseResult);
        let va = new Set(course);
        const vaa = [...va];
        setVal(vaa);
      }
    });
  };
  React.useEffect(() => {
    gettingResultDataFromFireBase();
  }, []);

  const [showResult, setShowResult] = useState([]);
  const [showResultByRollNo, setShowResultByRollNo] = useState([]);

  const searchResult = () => {
    searchByRollNo();
    let result = [];
    resultdata
      .filter((x) => x.courseResult == dropDownItem)
      .map((e) => (result = e.result));
      // .map((e) => result.push({ ...e, id: result.length + 1 }));
    setShowResult(result);
  };

  const searchByRollNo = () => {
    let result = [];
    resultdata.map((x) => {
      if (dropDownItem) {
        if (x.courseResult == dropDownItem) {
          x.result.filter((e, i) => {
            if (e.rollNo == checkWithRollNo) {
              result.push({ ...e, id: result.length + 1 });
            }
          });
        }
      } else {
        x.result.filter((e, i) => {
          if (e.rollNo == checkWithRollNo) {
            result.push({ ...e, id: result.length + 1 });
          }
        });
      }
    });
    setShowResultByRollNo(result);
  };

  const columns = [
    { field: "id", headerName: "S.No.", width: 50 },
    { field: "name", headerName: "Name", width: 190 },
    { field: "rollNo", headerName: "RollNo", width: 190 },
    { field: "marks", headerName: "Marks", width: 190 },
    { field: "result", headerName: "Result", width: 190 },
  ];

  const rows = showResult.map((row, index) => ({
    id: index + 1,
    name: row.name,
    rollNo: row.rollNo,
    marks: row.marks,
    result: row.result,
  }));

  const rollNoColumns = [
    { field: "id", headerName: "S.No.", width: 50 },
    { field: "name", headerName: "Name", width: 190 },
    { field: "rollNo", headerName: "RollNo", width: 190 },
    { field: "marks", headerName: "Marks", width: 190 },
    { field: "result", headerName: "Result", width: 190 },
  ];

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
          <h1>Result</h1>
          <Box
            sx={{
              display: "flex",
              gap: 5,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <InfoSelect
                courseObj={val}
                dropDownItem={setDropDownItem}
                label="Select Courses"
              />
            </Box>

            <TextField
              variant="standard"
              label="Roll No"
              onChange={(e) => setCheckWithRollNo(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Button variant="contained" onClick={searchResult}>
              Submit
            </Button>
            {showResultByRollNo.length > 0 ? (
              <Box
                height={400}
                width="100%"
                sx={{ marginTop: 5, marginBottom: 5 }}
              >
                <DataGrid
                  columns={rollNoColumns}
                  rows={showResultByRollNo}
                  pageSize={5}
                />
              </Box>
            ) : showResult.length > 0 ? (
              <Box
                height={400}
                width="100%"
                sx={{ marginTop: 5, marginBottom: 5 }}
              >
                <DataGrid columns={columns} rows={rows} pageSize={5} />
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultScreen;
