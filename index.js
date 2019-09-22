var showLetters = function(payload){
    let letters = document.getElementById("showletter");
    letters.innerText = payload;
    //rackWords(payload);

}

var getLetters = function(){

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (this.status == 200){
          console.log(this.response);
          showLetters(JSON.parse(this.response));
        }
        else console.log("No response");
    };
    xhr.open("GET", "rack.php/rack");
    xhr.send();
}

var start = function(){
    getLetters();
}

start();

document.getElementById("begin").addEventListener('click', function(){

    getLetters();
});
