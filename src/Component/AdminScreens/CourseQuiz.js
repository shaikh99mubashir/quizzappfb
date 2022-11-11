import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import InfoSelect from "./InfoSelect";
import Snackbar from "@mui/material/Snackbar";

const CourseQuiz = () => {
  const [createQuizQuestion, setCreateQuizQuestion] = useState(false);
  const [isQuestionDisable, setIsQuestionDisable] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [optionArr, setOptionArr] = useState([]);
  const [option, setOption] = useState("");
  const [disable, setDisable] = useState(false);

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
        const vaa = ([...va]);
        setVal(vaa);
      }
    });
  };

  React.useEffect(() => {
    gettingCourseDataFromFireBase();
  }, []);

  let initialData = {
    quizName: "",
    quizCategory: "",
    quizDuration: "",
    quizQuestions: "",
    quizoption: [],
  };

  const [pushInitialData, setPushInitialData] = useState([]);
  const [courseQuizData, setCourseQuizData] = useState(initialData);

  const submitCourseQuizData = () => {
    const refrence = ref(database, `CourseQuizData`);
    push(refrence, pushInitialData);
    setCourseQuizData(initialData);
    setPushInitialData([]);
    setOptionArr([]);
    setAddQuestion(false);
    setCreateQuizQuestion(false);
    setDisable(false);
  };

  const submitQuizQuestion = () => {
    setIsQuestionDisable(false);
    setPushInitialData([
      ...pushInitialData,
      { ...courseQuizData, quizoption: optionArr },
    ]);
    setOptionArr([]);
    courseQuizData.quizQuestions = "";
    setCourseQuizData(courseQuizData);
  };

  const letCheckTheFields = (data) => {
    let fieldsAreEmpty = "";
    Object.entries(data).map(([key, value], index) => {
      if (!value.length > 0) {
        fieldsAreEmpty += fieldsAreEmpty.length > 0 ? `, ${key}` : key;
      }
    });
    if (fieldsAreEmpty.length > 0) {
      return {
        success: false,
        message: `enter this fields ${fieldsAreEmpty}`,
      };
    } else {
      return {
        success: true,
      };
    }
  };
  const createQuizQuestionCkicked = () => {
    let data = { ...courseQuizData };
    delete data.quizoption;
    delete data.quizQuestions;
    let done = letCheckTheFields(data);
    if (done.success) {
      setCreateQuizQuestion(true);
      setDisable(true);
    } else {
      alert(done.message);
    }
  };

  const addQuestionClicked = () => {
    if (courseQuizData.quizQuestions) {
      setAddQuestion(true);
      setIsQuestionDisable(true);
      setOptionArr([{ txt: "", correctAnswer: false }]);
    } else {
      alert("enter Quiz Question");
    }
  };

  let addOption = () => {
    setOptionArr([...optionArr, { txt: option, correctAnswer: false }]);
  };

  let checkBoxData = (index) => {
    setOptionArr(
      optionArr.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            correctAnswer: !e.correctAnswer,
          };
        } else {
          return e;
        }
      })
    );
  };

  const handleQuestionDelete = (index) => {
    setPushInitialData(pushInitialData.filter((val, ind) => index !== ind));
  };
  const handelOptionDel = (index) => {
    setOptionArr(optionArr.filter((val, ind) => index !== ind));
  };
  return (
    <Box>
      <Grid container sx={{ display: "grid", placeItems: "center" }}>
        <Grid
          item
          md={8}
          sm={10}
          xs={12}
          sx={{
            width: "100%",
            border: "1px solid grey",
            boxShadow: "1px 5px #eeeeee",
            margin: 5,
            padding: 3,
            borderRadius: 5,
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 5 }}>
            courses Quiz
          </Typography>

          <Box
            sx={{
              gap: 2,
              marginTop: 2,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: { md: "row", sm: "row", xs: "column" },
            }}
          >
            <Box sx={{ width: { md: "30%", sm: "30%", xs: "100%" } }}>
              <TextField
                fullWidth
                required
                type="text"
                id="standard-basic"
                label="Quiz Name"
                variant="standard"
                value={courseQuizData.quizName}
                disabled={disable}
                onChange={(e) =>
                  setCourseQuizData((prev) => ({
                    ...prev,
                    quizName: e.target.value,
                  }))
                }
              />
            </Box>
            {/* Course */}
            <Box sx={{ width: { md: "30%", sm: "30%", xs: "100%" } }}>
              <InfoSelect
                fullWidth
                dropDownItem={(value) => {
                  setCourseQuizData({
                    ...courseQuizData,
                    quizCategory: value,
                  });
                }}
                value={courseQuizData.quizCategory}
                label="Course Category  "
                disabled={disable}
                variant="standard"
                courseObj={val}
                classXs={{ width: "90%" }}
              />
            </Box>

            <Box
              sx={{
                width: { md: "30%", sm: "30%", xs: "100%" },
              }}
            >
              <TextField
                fullWidth={true}
                required
                type="number"
                id="standard-basic"
                label="Quiz Duration"
                value={courseQuizData.quizDuration}
                disabled={disable}
                variant="standard"
                onChange={(e) =>
                  setCourseQuizData((prev) => ({
                    ...prev,
                    quizDuration: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>
          <Box sx={{ display: "grid", placeItems: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              disabled={disable}
              onClick={createQuizQuestionCkicked}
              sx={{
                fontSize: { xs: "0.6rem", sm: "1rem", sm: "1rem" },
              }}
            >
              Create Quiz Questions
            </Button>
          </Box>

          <Box>
            {createQuizQuestion ? (
              <>
                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextField
                      fullWidth={true}
                      required
                      type="text"
                      disabled={isQuestionDisable}
                      id="standard-basic"
                      label="Quiz Question"
                      value={courseQuizData.quizQuestions}
                      variant="standard"
                      onChange={(e) =>
                        setCourseQuizData((prev) => ({
                          ...prev,
                          quizQuestions: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                </Box>
                <Box
                  sx={{ marginTop: 2, display: "grid", placeItems: "center" }}
                >
                  <Button
                    variant="contained"
                    // fullWidth
                    disabled={isQuestionDisable}
                    sx={{ fontSize: { xs: "0.6rem", sm: "1rem", sm: "1rem" } }}
                    onClick={addQuestionClicked}
                  >
                    add Question
                  </Button>
                </Box>
              </>
            ) : (
              ""
            )}
          </Box>
          {addQuestion ? (
            <>
              <Box sx={{ gap: 1 }}>
                {optionArr.map((x, i) => (
                  <Box sx={{ display: "flex", marginTop: 2, gap: 2 }}>
                    <Checkbox
                      key={i}
                      checked={x.correctAnswer}
                      onChange={() => checkBoxData(i)}
                    />
                    <TextField
                      fullWidth={true}
                      required
                      type="text"
                      id="standard-basic"
                      label="Option"
                      variant="standard"
                      value={x.txt ?? courseQuizData.quizoption}
                      onChange={(e) => {
                        setOptionArr((prev) => {
                          return prev.map((item, index) => {
                            return {
                              ...item,
                              txt: index == i ? e.target.value : item.txt,
                            };
                          });
                        });
                      }}
                    />

                    <Button
                      variant="contained"
                      sx={{
                        fontSize: { xs: "0.6rem", sm: "1rem", sm: "1rem" },
                      }}
                    >
                      DEl
                    </Button>
                  </Box>
                ))}

                <Typography sx={{ marginTop: 1 }}>
                  Tick Correct Option
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                <Button
                  variant="contained"
                  onClick={addOption}
                  sx={{ fontSize: { xs: "0.4rem", sm: "1rem", sm: "1rem" } }}
                >
                  Add Option
                </Button>
              </Box>

              <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                <Button
                  variant="contained"
                  onClick={submitQuizQuestion}
                  sx={{ fontSize: { xs: "0.4rem", sm: "1rem", sm: "1rem" } }}
                >
                  Submit Question
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginTop: 1,
                }}
              >
                {pushInitialData.map((e, i) => {
                  return (
                    <Box
                      sx={{
                        border: "1px solid #eeeeee",
                        boxShadow: "1px 3px #eeeeee",
                        marginBottom: 3,
                        marginTop: 2,
                        paddingLeft: 3,
                        paddingRight: 3,
                      }}
                    >
                      <Box sx={{ marginBottom: 1, marginTop: 2 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          Question #{i + 1}
                        </Typography>
                        <Typography>{e.quizQuestions}</Typography>
                      </Box>
                      <Box sx={{ marginBottom: 1, marginTop: 2 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          Option:
                        </Typography>
                        {e.quizoption.map((event, ind) => {
                          return (
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ fontWeight: 700 }}>
                                {" "}
                                {ind + 1}.{" "}
                              </Typography>
                              <Typography> {event.txt} </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                      <Box sx={{ marginBottom: 0, marginTop: 2 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          Correct Answer:
                        </Typography>
                        {e.quizoption.map((event, ind) => {
                          return (
                            <>
                              <Typography sx={{ fontWeight: 700 }}>
                                {event.correctAnswer && event.txt}
                              </Typography>
                            </>
                          );
                        })}
                      </Box>
                      <br />
                      <Box sx={{ display: "grid", placeItems: "center" }}>
                        <Button
                          onClick={() => {
                            handleQuestionDelete(i);
                          }}
                          variant="contained"
                          fullWidth
                          sx={{
                            fontSize: {
                              xs: "0.6rem",
                              sm: "1rem",
                              sm: "1rem",
                            },
                            marginBottom: 2,
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ display: "grid", placeItems: "center" }}>
                {optionArr.length > 0 ? (
                  <Button
                    variant="contained"
                    onClick={submitCourseQuizData}
                    sx={{ fontSize: { xs: "0.6rem", sm: "1rem", sm: "1rem" } }}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  ""
                )}
              </Box>
            </>
          ) : (
            ""
          )}
          {/*  */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseQuiz;
