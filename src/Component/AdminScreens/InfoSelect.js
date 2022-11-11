import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function InfoSelect(props) {
  const { dropDownItem, value, label, dataSource,courseObj,disabled,classXs } = props;
console.log()
  const handelChange = (event) => {
    dropDownItem(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth={true}>
        <InputLabel>{label}</InputLabel>
        <Select
          fullWidth={true}
          sx={{width:'100%'}}
          variant="standard"
          onChange={handelChange}
          value={value}
          label={label}
          disabled={disabled}
        >
          {dataSource && dataSource.length
            ? dataSource.map((e, i) => (
                <MenuItem key={i} value={e.id}>
                  {e.fullName}
                </MenuItem>
              ))
            : courseObj &&  Object.entries(courseObj).map(([key, value], Index)=>{
              return (
                    <MenuItem key={Index} value={value}>
                     {value}
                     </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </div>
  );
}
