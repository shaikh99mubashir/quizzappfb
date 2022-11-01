import React from 'react'
import app from '../FirebaseConfig/Config'
import { getDatabase, ref, onValue } from "firebase/database";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const UserInformation = () => {
    // const [val, setVal] = React.useState([]);
    // const database = getDatabase(app);
    // const gettingUserInfoFromFireBase = () => {
    //   const reference = ref(database, `students`);
    //   onValue(reference, (e) => {
       
    //       let value = e.val();
    //       console.log(value, 'userinfo VAlue')
    //       let values = Object.values(value);
    //       setVal(values);
        
    //   });
    // };
  
    // React.useEffect(() => {
    //     gettingUserInfoFromFireBase();
    // }, []);

    // let key = Object.keys(val);
    // console.log(key);
    console.log('Student Info');
  return (
    <>
 <Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box><Box>
    <Typography> Hye </Typography>
 </Box>
 </>
  )
}

export default UserInformation

