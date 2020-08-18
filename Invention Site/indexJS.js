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

function renderQuestions(){
    
    let i=0;
    let j=0;
    while (i==j){
        i=getRandomInt(items.length-1);
        j=getRandomInt(items.length-1);
    }
    leftInvention(i);
    rightInvention(j);
    questionNr+=1;
    
}
function leftInvention(i){
    if(questionNr!=0)
        document.getElementById("left-div").removeChild(document.getElementById("stDiv"));
    var stDiv=document.createElement('div');
    stDiv.id="stDiv";
    inventionL=items[i].name;
    stDiv.innerHTML=inventionL;
    document.getElementById("left-div").appendChild(stDiv);
}
function rightInvention(j){
    if(questionNr!=0)
        document.getElementById("right-div").removeChild(document.getElementById("drDiv"));
    var drDiv=document.createElement('div');
    drDiv.id="drDiv";
    inventionR=items[j].name;
    drDiv.innerHTML=inventionR;
    document.getElementById("right-div").appendChild(drDiv);
}

document.getElementById('left-div').addEventListener('click',renderQuestions);
document.getElementById('right-div').addEventListener('click',renderQuestions);





