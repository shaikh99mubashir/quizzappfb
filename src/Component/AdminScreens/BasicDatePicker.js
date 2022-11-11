import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
    const {label, onChange}= props
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
            let date = newValue
            date = `${date.$D}/${date.$M}/${date.$y}`
            onChange(date)
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} fullWidth={true} variant='standard'/>}
      />
    </LocalizationProvider>
  );
}