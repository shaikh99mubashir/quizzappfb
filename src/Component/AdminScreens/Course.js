import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InfoSelect from "./InfoSelect";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, push, set } from "firebase/database";

const Course = () => {
  const [assistantTrainer, setAssistantTrainer] = useState("");
  const database = getDatabase(app);
  const [courseAdded, setCourseAdded] = useState(false);
  let [count, setCount] = useState(1);
  const [open, setOpen] = useState(true);
  let initialData = {
    courseName: "",
    courseDuration: "",
    isOpen: "",
    noOfQuiz: "",
    feeInRupees: "",
    leadTrainerId: "",
    assistantTrainer: [],
  };
  const [courseData, setCourseData] = useState(initialData);

  let addAssistantTrainer = () => {
    setCourseData({
      ...courseData,
      assistantTrainer: [...courseData.assistantTrainer, assistantTrainer],
    });
    setAssistantTrainer("");
  };
  const handleDelete = (event) => {
    setCourseData({
      ...courseData,
      assistantTrainer: courseData.assistantTrainer.filter((e, i) => {
        return e !== event;
      }),
    });
  };
  const courseDataSubmited = () => {
    let value = Object.values(courseData);
    let flag = value.some((e, i) => e == "");
    if (flag) {
      setCount(false);
    } else {
      setCount(true);
      const reference = ref(database, `courses`);
      push(reference, courseData);
      setCourseData(initialData);
      setAssistantTrainer("");
    }
    setCourseAdded(true);
  };

  // React.useEffect(()=>{
  //   setTimeout(()=>{
  //     setCount(false);
  //   },5000)
  // },[count])

  return (
    <Box>
      <Grid container sx={{ display: "grid", placeItems: "center" }}>
        <Grid
          item
          md={6}
          sm={8}
          xs={12}
          sx={{
            border: "1px solid #eeeeee",
            marginBottom: 5,
            padding: 5,
            boxShadow: "1px 5px #eeeeee",
            borderRadius: 5,
          }}
        >
          <Typography sx={{ marginBottom: 5 }}>
            {!count && courseAdded && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                In Complete Feilds — <strong>check it out!</strong>
              </Alert>
            )}
            {count && courseAdded && (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Courses Add SucessFully — <strong>check it out!</strong>
              </Alert>
            )}
          </Typography>
          <Typography variant="h4" sx={{ marginBottom: 5 }}>
            courses
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={6} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                value={courseData.courseName}
                type="text"
                id="standard-basic"
                label="Course Name"
                variant="standard"
                onChange={(e) =>
                  setCourseData((prev) => ({
                    ...prev,
                    courseName: e.target.value,
                  }))
                }
              />
            </Grid>
            {/* Course */}
            <Grid item md={6} sm={8} xs={12}>
              <InfoSelect
                dropDownItem={(value) => {
                  setCourseData({ ...courseData, courseDuration: value });
                }}
                value={courseData.courseDuration}
                label="Course Duration"
                variant="standard"
                dataSource={[
                  {
                    id: "8month",
                    fullName: "8 Month",
                  },
                  {
                    id: "16month",
                    fullName: "16 Month",
                  },
                ]}
              />
            </Grid>
            <Grid item md={6} sm={8} xs={12}>
              <InfoSelect
                dropDownItem={(value) =>
                  setCourseData({ ...courseData, isOpen: value })
                }
                value={courseData.isOpen}
                label="Course Open"
                variant="standard"
                dataSource={[
                  {
                    id: "Y",
                    fullName: "Yes",
                  },
                  {
                    id: "N",
                    fullName: "No",
                  },
                ]}
              />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={6} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                type="number"
                value={courseData.noOfQuiz}
                id="standard-basic"
                label="No Of Quiz"
                variant="standard"
                onChange={(e) =>
                  setCourseData((prev) => ({
                    ...prev,
                    noOfQuiz: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item md={6} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                type="number"
                value={courseData.feeInRupees}
                id="standard-basic"
                label="Fee In Rupees"
                variant="standard"
                onChange={(e) =>
                  setCourseData((prev) => ({
                    ...prev,
                    feeInRupees: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item md={6} sm={8} xs={12}>
              <TextField
                fullWidth={true}
                required
                value={courseData.leadTrainerId}
                type="text"
                id="standard-basic"
                label="Lead Trainer ID"
                variant="standard"
                onChange={(e) =>
                  setCourseData((prev) => ({
                    ...prev,
                    leadTrainerId: e.target.value,
                  }))
                }
              />
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={12} sm={8} xs={12} sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth={true}
                required
                value={assistantTrainer}
                type="text"
                id="standard-basic"
                label="Assistant Trainer"
                variant="standard"
                onChange={(e) => setAssistantTrainer(e.target.value)}
              />
              <Button variant="contained" onClick={addAssistantTrainer}>
                Add
              </Button>
            </Grid>
          </Box>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Grid item md={12} sm={8} xs={12} sx={{ display: "flex", gap: 2 }}>
              {courseData.assistantTrainer.length
                ? courseData.assistantTrainer.map((e, i) => (
                    <Chip
                      label={e}
                      key={i}
                      variant="outlined"
                      onDelete={() => handleDelete(e)}
                    />
                  ))
                : ""}
            </Grid>
          </Box>

          <Button
            variant="contained"
            onClick={courseDataSubmited}
            sx={{ marginTop: 5 }}
          >
            Add Course
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Course;
