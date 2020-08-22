//Title Animation
const text = document.querySelector(".title");
const strText = text.textContent;
const splitText = strText.split("")
text.textContent = "";

for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);



function onTick() {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if (char === splitText.length) {
        complete();
        return
    }
}
function complete() {
    clearInterval(timer);
    timer = null;
}



items = [
    {
        name: "Light bulb",
        time: "BC",
        year: "1879"
    }
]
// Read File
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                readInArray(allText);
            }
        }
    }; rawFile.send(null);
}

readTextFile("Inventions.txt")
var array;
function readInArray(allText) {
    var array = allText.split(',');

    for (let i = 0; i < array.length; i += 3) {
        var Ob = {
            name: array[i],
            time: array[i + 1],
            year: array[i + 2]
        }
        items.push(Ob);
    }
}
console.log(items);

//game logic

var questionNr = 0;
var score = 0;

// function for choosing random indexes
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var i = 0;
var j = 0;
var lastI = 0;
var lastJ = 0;


function renderQuestions(e) {
    mouseX=e.clientX
    mouseY=e.clientY
    if (questionNr != 0) {
        lastI = i;
        lastJ = j;
    }
    do {
        i = getRandomInt(items.length - 1);
        j = getRandomInt(items.length - 1);
    } while (i == j);

    if (questionNr != 0) {
        if(questionCorrect(mouseX,mouseY,lastI,lastJ)){
            leftInventionResultCorrect(lastI);
            rightInventionResultCorrect(lastJ);
            score++;
            document.getElementById("scoreShow").innerHTML="Score "+score;
        }
        else{
            leftInventionResultIncorrect(lastI);
            rightInventionResultIncorrect(lastJ);
        }
    }
    else {
        leftInventionDisplay();
        rightInventionDisplay();
    }
    questionNr += 1;
}
function questionCorrect(mouseX,mouseY,lastI,lastJ){
    if (mouseX<50*screen.width/100){// chose left
        if (items[lastI].time=="BC" && items[lastJ].time=="BC" && items[lastI].year>items[lastJ].year || items[lastI].time=="BC" && items[lastJ].time=="AD" || items[lastI].time=="AD"&& items[lastJ].time=="AD" && items[lastI].year<items[lastJ].year)
            return 1;
        else
            return 0;
    }
    else{// chose right
        if (items[lastJ].time=="BC" && items[lastI].time=="BC" && items[lastJ].year>items[lastI].year || items[lastJ].time=="BC" && items[lastI].time=="AD" || items[lastJ].time=="AD" && items[lastI].time=="AD" && items[lastJ].year<items[lastI].year)
            return 1;
        else
            return 0;

    }
}

function leftInventionResultCorrect(i) { //give result div (C/I) info of previous info
    document.getElementById("correct").style.display="flex"; 
    var leftYear = document.createElement('div');
    leftYear.id = "leftYear";
    inventionL = items[i].time + " " + items[i].year;
    leftYear.innerHTML = inventionL;
    document.getElementById("leftCorrect").appendChild(leftYear);
    setTimeout(leftInventionRemove, 1000);
    console.log("Result");

}
function rightInventionResultCorrect(j) {// give result div (C/I) info of previous info
    document.getElementById("correct").style.display="flex";
    var rightYear = document.createElement('div');
    rightYear.id = "rightYear";
    inventionL = items[j].time + " " + items[j].year;
    rightYear.innerHTML = inventionL;
    document.getElementById("rightCorrect").appendChild(rightYear);
    setTimeout(rightInventionRemove, 1000);
}

function leftInventionResultIncorrect(i){// give result div (C/I) info of previous info
    document.getElementById("incorrect").style.display="flex";
    var leftYear = document.createElement('div');
    leftYear.id = "leftYear";
    inventionL = items[i].time + " " + items[i].year;
    leftYear.innerHTML = inventionL;
    document.getElementById("leftIncorrect").appendChild(leftYear);
    setTimeout(gameSummary, 2000);
    console.log("Result");
}
function rightInventionResultIncorrect(j){
    document.getElementById("incorrect").style.display="flex";
    var rightYear = document.createElement('div');
    rightYear.id = "rightYear";
    inventionL = items[j].time + " " + items[j].year;
    rightYear.innerHTML = inventionL;
    document.getElementById("rightIncorrect").appendChild(rightYear);
    
}


function leftInventionRemove() {
    // remove the previous invention 
    if (questionNr != 0) {
        document.getElementById("left-div").removeChild(document.getElementById("stDiv"));
        
    }
    oneSecondLeft();
    console.log("Remove");
}
function leftInventionDisplay() {
    // first remove the answer of last question div
    if (questionNr!=0){
        document.getElementById("leftCorrect").removeChild(document.getElementById("leftYear"));
        document.getElementById("correct").style.display="none";
    }
    console.log("Display");
    var stDiv = document.createElement('div');
    stDiv.id = "stDiv";
    inventionL = items[i].name;
    stDiv.innerHTML = inventionL;
    document.getElementById("left-div").appendChild(stDiv);
}
function rightInventionRemove() {
    if (questionNr != 0) {
        document.getElementById("right-div").removeChild(document.getElementById("drDiv"));
    }
    oneSecondRight();

}
function rightInventionDisplay() {
    // first remove the answer of last question div 
    if(questionNr!=0){
        document.getElementById("rightCorrect").removeChild(document.getElementById("rightYear"));
        document.getElementById("correct").style.display="none";
        
    }
    var drDiv = document.createElement('div');
    drDiv.id = "drDiv";
    inventionR = items[j].name;
    drDiv.innerHTML = inventionR;
    document.getElementById("right-div").appendChild(drDiv);
}
function oneSecondLeft() {
    var timeout = setTimeout(leftInventionDisplay, 1000);
}
function oneSecondRight() {
    var timeout = setTimeout(rightInventionDisplay, 1000);
}

function gameSummary(){
    document.getElementById("incorrect").style.display="none";
    document.getElementById("gameSummaryDiv").style.display="flex";
    document.getElementById("scoreInfo").innerHTML=score;
    document.getElementById("scoreSave").innerHTML="<h1>Enter your username and save your score in the leaderboard.</h1><br><h2>Username</h2><input type='text' id='username'></input><br><br><br><button id='saveLeaderboard'><h3>Submit</h3></button><a href='leaderboard.html' id='seeLeaderBoard'><h2>View Leaderboard</h2><br><br><a href='index.html'><h1>Try Again</h1></a>" ;
    document.getElementById("saveLeaderboard").addEventListener('click',writeScore);
}


document.getElementById('left-div').addEventListener('click', renderQuestions);
document.getElementById('right-div').addEventListener('click', renderQuestions);



// MAI AI DE CAUTAT POZE CU API PT FIECARE DESCOPERIRE



// NODE PART

function writeScore(){
    var username=document.getElementById("username").value;
    console.log(username);
    if (username.length!=0){
        var newScore={
            score:score,
            username:username
        }
        fetch('http://localhost:3000/Leaderboard', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newScore)
        }).then(function(response) {
            console.log(response);
        })
    }
}




