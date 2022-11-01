import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(prop) {
  const [value, setValue] = React.useState(null);
    
     let {setDobis ,setDobYear} = prop
    const datePicker = () =>{
        let dobd = value?value.$D : ''
        let dobM = value?value.$M : ''
        let doby = value?value.$y : ''
        let dob = `${dobd}/${dobM}/${doby}`
        setDobis(dob)
        setDobYear(doby)
    }

    React.useEffect(()=>{
        datePicker()
    },[value])

    return (
    <LocalizationProvider variant="standard" dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date Of Birth"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          
        }}
        renderInput={(params) => <TextField {...params} variant="standard" fullWidth={true}/>}
      />
    </LocalizationProvider>
  );
}
