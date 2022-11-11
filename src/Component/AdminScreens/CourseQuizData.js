import React, { useEffect, useState } from "react";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, onValue } from "firebase/database";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

const CourseQuizData = () => {
  const [val, setVal] = useState([]);
  const [gridRows, setGridRows] = useState([]);
  const database = getDatabase(app);
  const gettingQuizDataFromFireBase = () => {
    const reference = ref(database, `CourseQuizData`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        setVal(values);
      }
    });
  };
  console.log(val);
  useEffect(() => {
    gettingQuizDataFromFireBase();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "quizCategory", headerName: "Category", width: 130 },
    { field: "quizName", headerName: "Quiz Name", width: 190 },
    { field: "quizQuestions", headerName: "Quiz Questions", width: 190 },
    { field: "quizoption", headerName: "Options", width: 190 },
    { field: "correctAnswer", headerName: "correct Answer", width: 190 },
    { field: "quizDuration", headerName: "Quiz Duration", width: 190 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (cellValues) => {
        return <Button variant="contained">Delete</Button>;
      },
    },
  ];

  const mapTheRow = () => {
    let allRow = [];
    val.map((row, index) => {
      row.map((e, i) => {
        allRow.push({
          ...e,
          id: allRow.length + 1,
          quizoption: e.quizoption.map((e, i) => e.txt),
          correctAnswer: e.quizoption
            .filter((e, i) => e.correctAnswer === true)
            .map((val, ind) => val.txt),
        });
      });
    });
    setGridRows(allRow);
  };
  console.log('val',val)
  useEffect(() => {
    mapTheRow();
  }, [val]);
  return (
    <div>
      <Box height={400} width="100%">
        <DataGrid columns={columns} rows={gridRows} pageSize={5} />
      </Box>
    </div>
  );
};

export default CourseQuizData;
