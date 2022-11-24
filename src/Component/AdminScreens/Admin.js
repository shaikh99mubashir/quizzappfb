import React, { useState } from "react";
import PersistentDrawerLeft from "./Dashboard";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserData from "./UserData";
import AddQuiz from "./AddQuiz";
import QuizData from "./QuizData";
import StudentInfo from "./StudentInfo";
import Course from "./Course";
import CourseQuiz from "./CourseQuiz";
import { Box, Drawer, Grid } from "@mui/material";
import MediaCard from "./Card";
import CourseQuizData from "./CourseQuizData";
import CreateResult from "./CreateResult";
import Cities from "./Cities";
import Countries from "./Countries";
import FormControl from "./FormControl";
import FormControlData from "./FormControlData";
import TrainerRegistrationData from "./TrainerRegistrationData";
import app from "../FirebaseConfig/Config";

const Admin = () => {
  
  const Home = () => {
    const navigate = useNavigate()
    const auth = getAuth(app);
    
  //   React.useEffect(()=>{
  //     onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //     const uid = user.uid;
  //           console.log('uid', uid)
  //           console.log('user', user)
  //   } else {
      
  //     if (user.isOwner === true) {
  //       // setLoding(false);
  //       navigate("/");
  //     } else {
  //       // console.log("succes login", success);
  //       // setLoding(false);
  //       navigate("/login");
  //     }
  //   }
  // })
  // },[])

    return (
      <Box>
        <Grid container>
          <Grid item md={8} sm={8} xs={12}>
            <Box sx={{paddingLeft:5, paddingRight:5}}>
              DashBoard
              <Grid item md={12} sm={8} xs={12} sx={{marginTop:3}}>
              <Box sx={{display:'flex', gap:2}}>
                <MediaCard width={250} text1={'Higest Marks'} text2={'86'} textvariant={'h5'}/>
                <MediaCard width={200} text1={'Average Marks'} text2={'86'} textvariant={'h5'}/>
                <MediaCard width={250} text1={'Lowest Marks'} text2={'86'} textvariant={'h5'}/>
                <MediaCard width={250} text1={'Fails Average '} text2={'86'} textvariant={'h5'}/>
                <MediaCard width={250} text1={'Retake Quiz'} text2={'86'} textvariant={'h5'} sx={{display:{sm:'none',xs:'noneS'}}}/>
              </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <PersistentDrawerLeft />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/userdata" element={<UserData />} />
        <Route exact path="addquiz" element={<AddQuiz />} />
        <Route exact path="quizdata" element={<QuizData />} />
        <Route exact path="studentinfo" element={<StudentInfo />} />
        <Route exact path="course" element={<Course />} />
        <Route exact path="coursequiz" element={<CourseQuiz />} />
        <Route exact path="coursequizdata" element={<CourseQuizData />} />
        <Route exact path="createresult" element={<CreateResult />} />
        <Route exact path="addcountries" element={<Countries />} />
        <Route exact path="addcities" element={<Cities />} />
        <Route exact path="formcontrol" element={<FormControl />} />
        <Route exact path="formcontroldata" element={<FormControlData />} />
        <Route exact path="trainerdata" element={<TrainerRegistrationData />} />
      </Routes>
    </>
  );
};

export default Admin;
