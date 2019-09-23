var words_list = [];

var get_letters = function(){
    var rack_request = new XMLHttpRequest();
    rack_request.onload = function(){
        if (this.status == 200){
          //console.log(this.response);
          show_letters(JSON.parse(this.response));
        }
        else console.log("No response");
    };
    rack_request.open("GET", "rack.php");
    rack_request.send();
}

var show_letters = function(rack_get){
    document.getElementById("showletter").innerText = rack_get.rack;
    get_words(rack_get.rack);
}

var get_words = function(rack){
  var words_request = new XMLHttpRequest();
  words_request.onload = function(){
      if (this.status == 200){
        //console.log(this.response);
        store_words(JSON.parse(this.response));
      }
      else console.log("No response");
  };
  words_request.open("GET", "words.php/"+rack);
  words_request.send();
}

var store_words = function(words_got){
    words_list = [];
    for(var i = 0; i < words_got.length; i++){
      console.log(words_got[i].indexOf("@@"));
      if (words_got[i].indexOf("@@")){
        words_list.push(words_got[i].split("@@"));
      }
      else{
        words_list.push(words_got[i].words);}
    }
    console.log(words_list);
}




get_letters();

document.getElementById("begin").addEventListener('click', function(){
    get_letters();
});
