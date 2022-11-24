import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import app from '../FirebaseConfig/Config'
import { getDatabase, ref, set, onValue } from "firebase/database";
import PersistentDrawerLeft from "./UserDashboard";
import Information from "./Information";
import CourseRegistration from "./CourseRegistration";
import PlayQuiz from "./PlayQuiz";
import StdProfile from "./StdProfile";

const Users = () => {
  const [user, setUser] = useState(false)
  const navigate = useNavigate();
  
  const getUserData = localStorage.getItem('userData')
  const userData = JSON.parse(getUserData)

  console.log('data',userData)
  const auth = getAuth();
  const checkUser =()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(true)
      }
      else{
       navigate('/');
      }
   });
  }
  React.useEffect(() => {
    checkUser()
  }, []);



  const Home = () => {
    return <div>This is user home page
     {/* <div>
      <h1>User</h1>
      <h1>{t.fullName}</h1>
      {t.email}
      {t.user}

      </div> */}
   
    
    </div>;
  };

  return (
    <div>
    <PersistentDrawerLeft/>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="information" element={<Information />} />
        <Route exact path="courseregistration" element={<CourseRegistration />} />
        <Route exact path="playquiz" element={<PlayQuiz />} />
        <Route exact path="stdprofile" element={<StdProfile userData={userData} />} />
    </Routes>
    {/* { user?<div>
      <h1>User</h1>
      <h1>{t.fullName}</h1>
      {t.email}
      {t.user}

      <button onClick={signoutUser}>signOut</button>
      </div>
      :<div></div>
    } */}
    {/* <div>
      <h1>User</h1>
      <h1>{t.fullName}</h1>
      {t.email}
      {t.user}

      </div> */}
    </div>
  );
};

export default Users;
