var words_list = [];
var split_words = [];
var words_length = [];
var words_length_num=[];

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
    for (var i = 0; i < words_got.length; i++){
      if (words_got[i].words.indexOf("@@")){
        split_words = words_got[i].words.split("@@");
        for (var j = 0; j < split_words.length; j++){
          words_list.push(split_words[j]);
        }
      }
      else{
        words_list.push(words_got[i].words);}
    }
    count_words_length(words_list);
}

var count_words_length = function(words){
    var j = 0;
    //console.log(words);

    for (var i = 0; i < words.length; i++){
      if (words_length.indexOf(words[i].toString().length) == -1){
        //console.log(words_length.indexOf(words[i].toString().length));
        words_length[j] = words[i].toString().length;
        words_length_num[j] = 1;
        j++;
        //console.log(words_length);
      }
      else{
        //console.log(words_length.indexOf(words[i].toString().length));
        words_length_num[words_length.indexOf(words[i].toString().length)]++;
      }
    }
  //  console.log(words_length);
  //  console.log(words_length_num);
  display_words(words_length, words_length_num);
}

var display_words = function(words_length, words_length_num){
    var note = document.createElement("LI");
    var br =  document.createElement("BR");
    var text ='';
    for (var i = 0; i < words_length.length; i++){
      //var textnode = document.createTextNode('The length of words:'+words_length[i]+'   The number of words remain:'+words_length_num[i]);
      //br.appendChild(textnode);
      text = text + 'The length of words:'+words_length[i]+'   The number of words remain:'+words_length_num[i] + '\r\n';

      //document.getElementById("word_display ").appendChild(br);
    }
    document.getElementById("word_display").innerText=text;
    //console.log(note);

}

var start = function(){
    get_letters();
}




document.getElementById("begin").addEventListener('click', function(){
    words_length=[];
    words_length_num=[];
    words_list = [];
    split_words = [];
    start();
});

document.getElementById("submit_word").addEventListener('click', function(){
  console.log(words_list);
  console.log(words_length);
  console.log(words_length_num);
  var user_guess=document.getElementById("guessing_word").value;
  console.lag(user_guess);
});
