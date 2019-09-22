var showLetters = function(payload){
    let letters = document.getElementById("letters");
    letters.innerText = payload;
    rackWords(payload);

}

var getLetters = function(){

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (this.status == 200){
            showLetters(JSON.parse(this.response));
        }
        else console.log("No response");
    };
    xhr.open("GET", "rack.php/rack");
    xhr.send();

    //rackWords(rack);
}

var start = function(){
    getLetters();
}

start();

document.getElementById("begin").addEventListener('click', function(){
    getLetters();
});
