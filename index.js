var start = function(){
    getLetters();
}

var getLetters = function(){
    var rack_request = new XMLHttpRequest();
    rack_request.onload = function(){
        if (this.status == 200){
          //console.log(this.response);
          showLetters(JSON.parse(this.response));
        }
        else console.log("No response");
    };
    rack_request.open("GET", "rack.php");
    rack_request.send();
}

var showLetters = function(rack_get){
    let letters = document.getElementById("showletter");
    console.log(rack_get);
    letters.innerText = rack_get;
    //get_words(rack_get);
}

var get_words = function(letter_in){

}




start();

document.getElementById("begin").addEventListener('click', function(){
    getLetters();
});
