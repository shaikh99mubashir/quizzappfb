import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InfoSelect from "./InfoSelect";
import app from "../FirebaseConfig/Config";
import { getDatabase, onValue, ref } from "firebase/database";

const PlayQuiz = () => {
  const [category, setCategory] = useState("");
  const [val, setVal] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const database = getDatabase(app);

  const getQuizFromFireBase = () => {
    const reference = ref(database, `quizQuestions`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let value = e.val();
        let values = Object.values(value);
        setVal(values);
      }
    });
  };

  console.log("paly quiz ", val);
  React.useEffect(() => {
    getQuizFromFireBase();
  }, []);

  const sortByCategory = () => {
    setFilterItem(
      val.filter((e, i) => {
        return e.category === category;
      })
    );
  };

  console.log("category", category);
  React.useEffect(() => {
    sortByCategory();
  }, [category]);

  const check = (answer) => {
    if(filterItem.length  === index+1){
        setShowScore(true)
    }
    else{
      if(answer === filterItem[index].correctOption) {
          setScore(score+10)
          setIndex(index +1)
        }
        else{
            setIndex(index +1)            
      }
    }
  }

  const backtoquiz =()=>{
    setShowScore(false)
    setCategory(null)
  }
console.log(filterItem,"filter")
  return (
    <Box>
      <Grid container sx={{ display: "grid", placeItems: "center" }}>
    {showScore? 
    <>
    <Typography>your Score is {score}</Typography> 
    <Button onClick={backtoquiz}>BACK TO QUIZ</Button>
    </>
    
    
    :
        <Grid
          item
          md={6}
          sm={8}
          xs={12}
          sx={{ border: "2px solid black", width: "50%" }}
        >
          <Typography variant="h5" sx={{ marginBottom: 5 }}>
            Select Quiz
          </Typography>
          <InfoSelect
            dropDownItem={setCategory}
            value={category}
            label="Category"
            variant="standard"
            dataSource={[
              {
                id: "wm",
                fullName: "Web Mobile",
              },
              {
                id: "mw",
                fullName: "Mobile Web",
              },
            ]}
          />
          <Box>
            <Typography>
              Quetion:
            </Typography>
            <Typography>
              {filterItem.length ? filterItem[index].quizQuestion : ""}
            </Typography>
            <Box>
            {filterItem.length?
            <Box>
            <Button onClick={()=>check(filterItem[index].option1)}>{filterItem[index].option1}</Button>
            <Button onClick={()=>check(filterItem[index].option2)}>{filterItem[index].option2}</Button>
            <Button onClick={()=>check(filterItem[index].option3)}>{filterItem[index].option3}</Button>
            <Button onClick={()=>check(filterItem[index].option4)}>{filterItem[index].option4}</Button>
            </Box>
            :''}
            </Box>
          </Box>
          
        </Grid>
    }
      </Grid>
    </Box>
  );
};

export default PlayQuiz;
