import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import app from '../FirebaseConfig/Config'
import { getDatabase, ref, set, onValue } from "firebase/database";
import PersistentDrawerLeft from "./UserDashboard";
import Information from "./Information";
import CourseRegistration from "./CourseRegistration";
import PlayQuiz from "./PlayQuiz";

const Users = () => {
  const [user, setUser] = useState(false)
  const location = useLocation();
  let t = location.state;
  const database = getDatabase(app);
  const navigate = useNavigate();
  
  const auth = getAuth();
  const signoutUser = () => {
    signOut(auth)
      .then((success) => {
      })
      .catch((error) => {
        alert('error')
      });
  };
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
    return <div>This is user home page</div>;
  };

  return (
    <div>
    <PersistentDrawerLeft/>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="information" element={<Information />} />
        <Route exact path="courseregistration" element={<CourseRegistration />} />
        <Route exact path="playquiz" element={<PlayQuiz />} />
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
    </div>
  );
};

export default Users;
