import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import app from "../FirebaseConfig/Config";
import InfoSelect from "./InfoSelect";

const AddQuiz = () => {
  const [addQuestionClicked, setAddQuestionClicked] = useState(false);
  const [category, setCategory] = useState("");
  const [quizData, setQuizData] = useState({
    quizQuestion: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
    category: "",
  });

  let database = getDatabase(app);
  const setQuizfeildinDatbase = () => {
    if (quizData.option1.length > 0 && quizData.option2.length > 0) {
      if (quizData.correctOption.length) {
        if (
          quizData.option1 === quizData.correctOption ||
          quizData.option2 === quizData.correctOption ||
          quizData.option3 === quizData.correctOption ||
          quizData.option4 === quizData.correctOption
        ) {
          if (quizData.quizQuestion.length > 0) {
            if (category.length > 0) {
              setAddQuestionClicked(false);
              const reference = ref(database, `quizQuestions`);
              quizData.category = category;
              push(reference, quizData);
              quizData.quizQuestion = "";
              quizData.option1 = "";
              quizData.option2 = "";
              quizData.option3 = "";
              quizData.option4 = "";
              quizData.correctOption = "";
            } else {
              alert("Select Category");
            }
          } else {
            alert("you removed quiz question");
          }
        } else {
          alert("option and correct option doesnot match");
        }
      } else {
        alert("enter correct option");
      }
    } else {
      alert("enter option 1 and option 2");
    }
  };

  const check = () => {
    if (quizData.quizQuestion.length) {
      setAddQuestionClicked(true);
    }
  };
  return (
    <Box>
      <Grid container sx={{ display: "grid", placeItems: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: 5 }}>
          Create Quiz Questions
        </Typography>
        <Grid item md={6} sm={8} xs={12}>
          <InfoSelect
            dropDownItem={setCategory}
            value={category}
            label="Category"
            variant="standard"
            dataSource={[
              {
                id: "wm",
                fullName: "Web Mobile",
              },
              {
                id: "mw",
                fullName: "Mobile Web",
              },
            ]}
          />

          <TextField
            variant="standard"
            value={quizData.quizQuestion}
            label="Enter Quiz Question"
            fullWidth={true}
            sx={{ width: "50vw" }}
            onChange={(e) =>
              setQuizData((prev) => ({ ...prev, quizQuestion: e.target.value }))
            }
          />
          {quizData.quizQuestion.length ? (
            <Button
              onClick={check}
              variant="contained"
              sx={{ marginTop: 1, marginLeft: 1 }}
            >
              Add Quiz
            </Button>
          ) : (
            <Button
              disabled
              variant="contained"
              sx={{ marginTop: 1, marginLeft: 1 }}
            >
              Add Quiz
            </Button>
          )}

          <Box>
            {addQuestionClicked ? (
              <Box style={{ display: "block", marginTop: 40 }}>
                <Typography>Enter Quiz Option</Typography>
                <TextField
                  fullWidth={true}
                  variant="standard"
                  label="Option 1"
                  sx={{ marginTop: 3 }}
                  onChange={(e) =>
                    setQuizData((prev) => ({
                      ...prev,
                      option1: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="standard"
                  label="Option 2"
                  fullWidth={true}
                  sx={{ marginTop: 3 }}
                  onChange={(e) =>
                    setQuizData((prev) => ({
                      ...prev,
                      option2: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="standard"
                  label="Option 3"
                  fullWidth={true}
                  sx={{ marginTop: 3 }}
                  onChange={(e) =>
                    setQuizData((prev) => ({
                      ...prev,
                      option3: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="standard"
                  label="Option 4"
                  fullWidth={true}
                  sx={{ marginTop: 3 }}
                  onChange={(e) =>
                    setQuizData((prev) => ({
                      ...prev,
                      option4: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="standard"
                  fullWidth={true}
                  label="Correct Option"
                  sx={{ marginTop: 3 }}
                  onChange={(e) =>
                    setQuizData((prev) => ({
                      ...prev,
                      correctOption: e.target.value,
                    }))
                  }
                />

                <Button
                  variant="contained"
                  sx={{ width: "100%", marginTop: 5, marginBottom: 10 }}
                  onClick={setQuizfeildinDatbase}
                >
                  Submit Quiz Question
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography sx={{ marginTop: 5, color: "lightGrey" }}>
                  Add Question to Display Option Feild
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddQuiz;
