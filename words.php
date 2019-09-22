<?php
    //this is the basic way of getting a database handler from PDO, PHP's built in quasi-ORM
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);


    $request = $_SERVER['REQUEST_METHOD'];
    $uri = $_SERVER['PATH_INFO'];
    $routes = explode("/", $uri);

    $rack = $routes[1];


    $words = array();

    //this is a sample query which gets some data, the order by part shuffles the results
    //the limit 0, 10 takes the first 10 results.
    // you might want to consider taking more results, implementing "pagination",
    // ordering by rank, etc.


    for ($i = 0; $i < (strlen($rack)-1); $i++){
      for ($j = 1; $j <= (strlen($rack)-$i); $j++){
        $choose_letter = substr($rack,$i,$j);

        $query = "SELECT words FROM racks WHERE rack='$choose_letter'";
        $statement = $dbhandle->prepare($query);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $words = array_merge($results,$words);

        }
      }






    //this next line could actually be used to provide user_given input to the query to
    //avoid SQL injection attacks


    //The results of the query are typically many rows of data
    //there are several ways of getting the data out, iterating row by row,
    //I chose to get associative arrays inside of a big array
    //this will naturally create a pleasant array of JSON data when I echo in a couple lines


    //this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser
    echo json_encode(current($words));

?>
