import React, { useState } from "react";
import PersistentDrawerLeft from "./Dashboard";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import UserData from "./UserData";
import AddQuiz from "./AddQuiz";
import QuizData from "./QuizData";
import UserInformation from "./UserInformation";
import StudentInfo from "./StudentInfo";

const Admin = () => {

  const Home = () => {
    return <div>Admin User Screen</div>;
  };

  return (
    <>
      <PersistentDrawerLeft/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/userdata" element={<UserData />} />
        <Route exact path="addquiz" element={<AddQuiz />} />
        <Route exact path="quizdata" element={<QuizData />} />
        <Route exact path="studentinfo" element={<StudentInfo/>} />
      </Routes>
    </>
  );
};

export default Admin;
