import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../FirebaseConfig/Config";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const database = getDatabase(app);
const auth = getAuth(app);
const year = new Date().getFullYear()
const signUpUser = (obj) => {
    console.log('obj', obj)
  let { email, password, course } = obj;
  console.log(email);
  console.log(password);
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((success) => {
        const user = success.user;
        if (user.email === "owner@gmail.com") {
          obj.isOwner = true;
          const reference = ref(database, `users/${user.uid}`);
          delete obj.password;
          set(reference, obj)
            .then(() => {
              resolve("data is successfully submitted");
            })
            .catch(() => {
              reject("data nahi gia database ma");
            });
        } else {
          const reference = ref(database, `users/${user.uid}`);
          delete obj.password;
          const uid = user.uid
          const roll = uid.slice(3,9)
          const cor = course.slice(0,3)
          const rollNo = `${year}${cor}${roll}`
          obj.rollNo = rollNo
          set(reference, obj)
            .then(() => {
              resolve("data is successfully submitted");
            })
            .catch((reject) => {
              console.log("data nahi gia database ma");
            });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
};

const loginWithUser = (textFeild) => {
  let { email, password } = textFeild;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((success) => {
        const { user } = success;
        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (e) => {
          let status = e.exists();
          if (status) {
            resolve({ ...e.val(), user: user.uid });
          } else {
            reject("login rejected");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export { signUpUser, loginWithUser };
