import React, { useEffect } from "react";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const QuizData = () => {
  const [val, setVal] = useState([]);
  const database = getDatabase(app);
  const gettingQuizDataFromFireBase = () => {
    const reference = ref(database, `quizQuestions`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        setVal(values);
      }
    });
  };
  // console.log("quiz val", val);

  useEffect(() => {
    gettingQuizDataFromFireBase();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "categoty", headerName: "Category", width: 130 },
    { field: "question", headerName: "Question", width: 190 },
    { field: "option1", headerName: "Option 1", width: 190 },
    { field: "option2", headerName: "Option 2", width: 190 },
    { field: "option3", headerName: "Option 3", width: 190 },
    { field: "option4", headerName: "Option 4", width: 190 },
    { field: "correctAnswer", headerName: "Correct Answer", width: 190 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (cellValues) => {
        return <Button variant="contained">Delete</Button>;
      },
    },
  ];

  const rows = val.map((row, index) => ({
    id: index + 1,
    categoty: row.category,
    question: row.quizQuestion,
    option1: row.option1,
    option2: row.option2,
    option3: row.option3,
    option4: row.option4,
    correctAnswer: row.correctOption,
  }));

  return (
    <div>
      <Box sx={{ padding: 5 }}>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: 3 }}
        >
          Questions
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
  );
};

export default QuizData;
