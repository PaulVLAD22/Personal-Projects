const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");
const { json } = require("body-parser");

// App
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());


//add a score

app.post("/Leaderboard", (req, res) => {
    
    const List = readJSONFileLeaderboard();
    
    var newScore = {
        id : uuid.v4.apply(),//ii dau un id automat
        score: req.body.score,//pentru ca este un request post, are un body pe care sunt transmisi parametrii noului caine
        username: req.body.username,
    }
  
    //la lista cainilor existenti adaug noul caine
    List.push(newScore);
    //scriu noua lista care contine cainele nou in fisier
    writeJSONFileLeaderboard(List);
    //trimit raspuns ca totul a fost ok
    res.status(200).send(newScore);
  });

  //read all 

  app.get("/Leaderboard", (req, res) => {
    const ScoreList = readJSONFileLeaderboard();
    if(ScoreList != undefined){
      res.status(200).send(ScoreList);
    } else {
        res.status(404).send("No bonus found");
    }
  });


  function readJSONFileLeaderboard(){
      return JSON.parse(fs.readFileSync("db.json"))["Leaderboard"];
  }

  function readAllJSONFile(){
      return JSON.parse(fs.readFileSync("db.json"));
  }

  function writeJSONFileLeaderboard(content){
    var jsonFile = readAllJSONFile();
    jsonFile["Leaderboard"] = content;
    fs.writeFileSync(
      "db.json",
      JSON.stringify(jsonFile, null, 4),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }


  
  app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
