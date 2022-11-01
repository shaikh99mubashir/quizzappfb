import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function InfoSelect(props) {
  const {dropDownItem, value, label, dataSource} = props
  
  const handelChange =(event)=>{
    dropDownItem(event.target.value)
  }
  return (
    <div style={{width:'100%'}}>
      <FormControl fullWidth={true}>
        <InputLabel>{label}</InputLabel>
        <Select
          fullWidth={true}
          sx={{marginBottom:5}}
          variant="standard"
          onChange={handelChange}
          value={value}
          label={label}
        >
      
          {dataSource && dataSource.length? dataSource.map((e)=>
              <MenuItem value={e.id}>{e.fullName}</MenuItem>
          ):null}    
        </Select>
      </FormControl>
    </div>
  );
}
