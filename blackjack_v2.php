<?php
require_once "balance_pdo.php";
session_start();

if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){

    header("location: logout.php");
    exit;
}
error_reporting(0);

echo "bet amount: ".intval($_POST['bet']);
    $bet = -intval($_POST['bet']);


$object = new database();
$balance = $object->updateBalance($_SESSION["id"],$bet);
//echo "<br/>".$balance."<br/>";
$bal = $object->getBalance($_SESSION["id"]);
echo "<br/>"."new balance: ".$bal;

?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Blackjack Game</title>
    <meta name="description" content="">
    <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="main.css">
</head>

<body>

<div class="game" contenteditable="false">
    <h3 contenteditable="false">Blackjack</h3>

    <div class="game-body" contenteditable="false">
    <?php if ($bal>0){ ?>
        <div class="game-options" contenteditable="false">
                <input type="button" id="btnStart" class="btn" value="Start" onclick="startblackjack()">
            <input type="button" id="hitBtn" class="btn" value="Hit Me" onclick="hitMe()">
            <input type="button" id="stayBtn" class="btn" value="Stay" onclick="stay()">
        </div>
        <?php }else{ echo "YOU CAN'T BET MORE THAN YOUR BALANCE";} ?>
        <form method="post" action="blackjack_v2.php">
            <input type="number" name="bet" placeholder="Enter Bet Amount">
            <input type="submit" name="submit" value="Submit">
        </form>

        <div class="status" id="status" contenteditable="false"></div>

        <div id="deck" class="deck" contenteditable="false">
            Cards Left:
            <div id="deckcount" contenteditable="false">52</div>
        </div>

      <input id="numPlayers" name="playerNum" type="number"
               placeholder="Number of Players" min="1" size=20>

        <input id="numDeck" name="deckNum" type="number"
               placeholder="Number of decks" min="1" size=20>

        <div id="players" class="players" contenteditable="false"></div>

        <!-- <span id="message" style="color:#600; font-weight:bold">Welcome to Blackjack!<br>Click "Start" to Begin.</span> -->

        <div class="clear" contenteditable="false"></div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
        crossorigin="anonymous"></script>
<script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
        crossorigin="anonymous"></script>
<!--<script>var win = <?php// echo json_encode($_SESSION['win']); ?>;
var lost = <?php// echo  json_encode($_SESSION['lost']); ?>; </script>-->
<script src="main.js" async defer></script>
<a class="btn btn-success" href="logout.php" class="">Log out</a>
</body>
</html>

