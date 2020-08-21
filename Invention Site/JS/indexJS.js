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

readTextFile("dataSingleLineBun.txt")
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
var ansCorrect=0;
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
    if (mouseX<50*screen.width/100){// a ales stanga
        if (items[lastI].time=="BC" && items[lastJ].time=="BC" && items[lastI].year>items[lastJ].year || items[lastI].time=="BC" && items[lastJ].time=="AD" || items[lastI].time=="AD"&& items[lastJ].time=="AD" && items[lastI].year<items[lastJ].year)
            return 1;
        else
            return 0;
    }
    else{//a ales dreapta
        if (items[lastJ].time=="BC" && items[lastI].time=="BC" && items[lastJ].year>items[lastI].year || items[lastJ].time=="BC" **items[lastI].time=="AD" || items[lastJ].time=="AD" && items[lastI].time=="AD" && items[lastJ].year<items[lastI].year)
            return 1;
        else
            return 0;

    }
}

function leftInventionResultCorrect(i) {// ai de schimbat 
    document.getElementById("correct").style.display="flex";
    ansCorrect=1;
    var leftYear = document.createElement('div');
    leftYear.id = "leftYear";
    inventionL = items[i].time + " " + items[i].year;
    leftYear.innerHTML = inventionL;
    document.getElementById("leftCorrect").appendChild(leftYear);
    setTimeout(leftInventionRemove, 1000);
    console.log("Result");

}
function rightInventionResultCorrect(j) {// ai de schimbat
    document.getElementById("correct").style.display="flex";
    var rightYear = document.createElement('div');
    rightYear.id = "rightYear";
    inventionL = items[j].time + " " + items[j].year;
    rightYear.innerHTML = inventionL;
    document.getElementById("rightCorrect").appendChild(rightYear);
    setTimeout(rightInventionRemove, 1000);
}

function leftInventionResultIncorrect(i){
    document.getElementById("incorrect").style.display="flex";
    ansCorrect=0;
    var leftYear = document.createElement('div');
    leftYear.id = "leftYear";
    inventionL = items[i].time + " " + items[i].year;
    leftYear.innerHTML = inventionL;
    document.getElementById("leftIncorrect").appendChild(leftYear);
    setTimeout(leftInventionRemove, 1000);
    console.log("Result");
}
function rightInventionResultIncorrect(j){
    document.getElementById("incorrect").style.display="flex";
    var rightYear = document.createElement('div');
    rightYear.id = "rightYear";
    inventionL = items[j].time + " " + items[j].year;
    rightYear.innerHTML = inventionL;
    document.getElementById("rightIncorrect").appendChild(rightYear);
    setTimeout(rightInventionRemove, 1000);
}


function leftInventionRemove() {
    if (questionNr != 0) {
        document.getElementById("left-div").removeChild(document.getElementById("stDiv"));
        
    }
    oneSecondLeft();
    console.log("Remove");
}
function leftInventionDisplay() {
    // first remove the answer of last question
    if (questionNr!=0){
        if(ansCorrect==1){
            document.getElementById("leftCorrect").removeChild(document.getElementById("leftYear"));
            document.getElementById("correct").style.display="none";
        }
        else{
            document.getElementById("leftIncorrect").removeChild(document.getElementById("leftYear"));
            document.getElementById("incorrect").style.display="none";

        }
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
    // first remove the answer of last question
    if(questionNr!=0){
        if(ansCorrect==1){
            document.getElementById("rightCorrect").removeChild(document.getElementById("rightYear"));
            document.getElementById("correct").style.display="none";
        }
        else{
            document.getElementById("rightIncorrect").removeChild(document.getElementById("rightYear"));
            document.getElementById("incorrect").style.display="none";
        }
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

document.getElementById('left-div').addEventListener('click', renderQuestions);
document.getElementById('right-div').addEventListener('click', renderQuestions);

// AI DE FACUT SCOR, LEADERBOARD SI LOG IN#

// MAI AI DE CAUTAT POZE CU API PT FIECARE DESCOPERIRE

