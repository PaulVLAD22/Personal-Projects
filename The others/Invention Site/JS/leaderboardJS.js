function getScores() {
    fetch('http://localhost:3000/Leaderboard', {
        method: 'get'
    }).then((response) => {
        response.json().then((data) => {
            //am adus datele
            var div_score = document.getElementById("scoresDiv");
            var ul = document.createElement("ul");
            ul.setAttribute("id", "note-list")
            for(let i = 0; i < data.length; i++) {
                var li = document.createElement("li");
                li.appendChild(document.createTextNode("User: "+data[i].username+" - "));
                li.appendChild(document.createTextNode(data[i].score));


                ul.appendChild(li);
            }
            div_score.appendChild(ul);
        })
    })

}
getScores();