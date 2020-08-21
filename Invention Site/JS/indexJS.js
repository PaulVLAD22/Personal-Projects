//Title Animation
const text = document.querySelector(".title");
const strText = text.textContent;
const splitText=strText.split("")
text.textContent="";

for (let i=0;i<splitText.length;i++){
    text.innerHTML += "<span>"+splitText[i]+"</span>";
}

let char =0;
let timer =setInterval(onTick,50);



function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if(char === splitText.length){
        complete();
        return
    }
}
function complete(){
    clearInterval(timer);
    timer=null;
}



items=[
    {
        name:"Light bulb",
        time:"BC",
        year:"1879"
    }
]
// Read File
function readTextFile(file) 
{      
     var rawFile = new XMLHttpRequest(); 
     rawFile.open("GET", file, false); 
     rawFile.onreadystatechange = function () 
     { 
         if(rawFile.readyState === 4) 
         { 
             if(rawFile.status === 200 || rawFile.status == 0) 
             { 
                 var allText = rawFile.responseText; 
                 readInArray(allText);
             } 
         } 
     };    rawFile.send(null);  
} 

readTextFile("dataSingleLineBun.txt")
var array;
function readInArray(allText){
    var array=allText.split(',');
    
    for (let i=0;i<array.length;i+=3){
        var Ob={
            name:array[i],
            time:array[i+1],
            year:array[i+2]
        }
        items.push(Ob);
    }
}
console.log(items);
 
//game logic

var questionNr=0;
var score=0;
// function for choosing random indexes
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
var i=0;
var j=0;
function renderQuestions(){
    
    do{
        i=getRandomInt(items.length-1);
        j=getRandomInt(items.length-1);
    }while(i==j);

    if(questionNr!=0){
        leftInventionResult(i);
        rightInventionResult(j);
    }
    else{
        leftInventionDisplay();
        rightInventionDisplay();
    }
    questionNr+=1;
}
function leftInventionResult(i){
    var leftYear=document.createElement('div');
    leftYear.id="leftYear";
    inventionL=items[i].time+" "+items[i].year;
    leftYear.innerHTML=inventionL;
    document.getElementById("left-div").appendChild(leftYear);
    setTimeout(leftInventionRemove,1000);
    console.log("Result");
}
function rightInventionResult(j){
    var rightYear=document.createElement('div');
    rightYear.id="rightYear";
    inventionL=items[j].time+" "+items[j].year;
    rightYear.innerHTML=inventionL;
    document.getElementById("right-div").appendChild(rightYear);
    setTimeout(rightInventionRemove,1000);
}


function leftInventionRemove(){
    if(questionNr!=0){
        document.getElementById("left-div").removeChild(document.getElementById("stDiv"));
        document.getElementById("left-div").removeChild(document.getElementById("leftYear"));
    }
    oneSecondLeft();
    console.log("Remove");
}
function leftInventionDisplay(){
    console.log("Display");
    var stDiv=document.createElement('div');
    stDiv.id="stDiv";
    inventionL=items[i].name;
    stDiv.innerHTML=inventionL;
    document.getElementById("left-div").appendChild(stDiv);
}
function rightInventionRemove(){
    if(questionNr!=0){
        document.getElementById("right-div").removeChild(document.getElementById("drDiv"));
        document.getElementById("right-div").removeChild(document.getElementById("rightYear"));
    }
    oneSecondRight();

}
function rightInventionDisplay(){
    var drDiv=document.createElement('div');
    drDiv.id="drDiv";
    inventionR=items[j].name;
    drDiv.innerHTML=inventionR;
    document.getElementById("right-div").appendChild(drDiv);
}
function oneSecondLeft(){
    var timeout=setTimeout(leftInventionDisplay,1000);
}
function oneSecondRight(){
    var timeout=setTimeout(rightInventionDisplay,1000);
}

document.getElementById('left-div').addEventListener('click',renderQuestions);
document.getElementById('right-div').addEventListener('click',renderQuestions);

// AI DE FACUT SCOR, LEADERBOARD SI LOG IN#
// NU LASA SA CLICK-uiasca in timpul timeout-ului pana apare inventie noua
// CAUTA SA ADAUGI SI POZA PT FIECARE DINTRE OBIECTELE DIN ITEMS
// SI , IN CEL MAI  BUN CAZ, DOWNLAD-EZI PRIMA POZA CARE APARE
// PE GOOGLE IMAGES SAU ALT SITE

//div verde/rosu



// poti sa pui peste tot ecranul  un div care la apasare nu face nimic 
// (in timpul timpului care trece)
//gen peste body si pui pozitie absoluta width 100% length 100%

