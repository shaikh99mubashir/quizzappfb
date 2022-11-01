import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut  } from "firebase/auth";
import app from '../FirebaseConfig/Config'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const database = getDatabase(app);
const auth = getAuth(app);


const signUpUser = (obj) =>{
    
    let {email,password,firstName, isOwner} = obj
    console.log(isOwner);
   return new Promise((resolve,reject)=>{
    createUserWithEmailAndPassword(auth, email, password, firstName)
       .then((success)=>{
        const user  = success.user
        if(user.email === 'owner@gmail.com'){
            obj.isOwner = true
            const reference = ref(database, `users/${user.uid}`) ;
            delete obj.password
            set(reference, obj)
            .then(()=>{
                resolve("data is successfully submitted")
            })
            .catch((reject)=>{console.log('data nahi gia database ma')})
        }
        else{
            const reference = ref(database, `users/${user.uid}`) ;
            delete obj.password
            set(reference, obj)
            .then(()=>{
                resolve("data is successfully submitted")
            })
            .catch((reject)=>{console.log('data nahi gia database ma')})
        }
            
        })
       .catch((error)=>{
        console.log('error', error)
       })
       
    })      
}

const loginWithUser = (textFeild) =>{
    let {email, password} = textFeild
  return new Promise ((resolve, reject)=>{
    signInWithEmailAndPassword(auth,email, password)
        .then((success)=>{
            const {user}  = success
            const reference = ref(database, `users/${user.uid}`) ; 
            onValue(reference, (e)=>{
               let status = e.exists()
               if(status){
                resolve({...e.val(), user:user.uid})
               }
               else{
                reject('login rejected')
               }
            })
        })
        .catch((error)=>{
            console.log(error)
        })
  }) 
}


export {signUpUser, loginWithUser}
