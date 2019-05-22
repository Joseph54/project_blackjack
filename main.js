
    var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    var deck = new Array();
    var players = new Array();
    var currentPlayer = 0;
    var balance = 100;
    var count = 0; //Card counter
   /* var bet = document.getElementById('betNum').value;
    var message = document.getElementById("message");*/

    function createDeck()
    {
        deck = new Array();
        numDeck = document.getElementById('numDeck').value;
        while (numDeck>0){

        for (var i = 0 ; i < values.length; i++)
        {
            for(var x = 0; x < suits.length; x++)
            {
                var weight = parseInt(values[i]);
                if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                    weight = 10;
                if (values[i] == "A"){
                    weight = 1;
                }
                var card = { Value: values[i], Suit: suits[x], Weight: weight };
                deck.push(card);
            }
        }

       numDeck--; }
    }

    function createPlayers(numPlayers)
    {
        numPlayers = document.getElementById('numPlayers').value;
        players = new Array();
        for(var i = 1; i <= numPlayers; i++)
        {
            var hand = new Array();
            var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };

            players.push(player);
        }
       // return numPlayers;
    }

    function createPlayersUI()
    {
        document.getElementById('players').innerHTML = '';
        for(let i = 0; i < players.length; i++)
        {
            var div_player = document.createElement('div');
            var div_playerid = document.createElement('div');
            var div_hand = document.createElement('div');
            var div_points = document.createElement('div');

            div_points.className = 'points';
            div_points.id = 'points_' + i;
            div_player.id = 'player_' + i;
            div_player.className = 'player';
            div_hand.id = 'hand_' + i;

            div_playerid.innerHTML = 'Player ' + players[i].ID;
            div_player.appendChild(div_playerid);
            div_player.appendChild(div_hand);
            div_player.appendChild(div_points);
            document.getElementById('players').appendChild(div_player);
        }
    }

    function shuffle()
    {
// For 1000 turns
// Switch the values of two random cards
        for (let i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
            var temp = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = temp;
        }
    }

    function startblackjack(numPlayers)
    {
        if (numPlayers < 1) {
            message.innerHTML = "Number of players must have a value of at least 1.<br>Press Start to begin again.";
        }
        document.getElementById('btnStart').value = 'Restart';
        document.getElementById("status").style.display="none";
// Deal 2 cards to every player object
        currentPlayer = 0;
        createDeck();
        shuffle();
        createPlayers(numPlayers);
        createPlayersUI();
        dealHands();
        document.getElementById('player_' + currentPlayer).classList.add('active');
        updateDeck();
    }

    function dealHands()
    {
// Alternate handing cards to each player
// 2 cards each
        for(var i = 0; i < 2; i++)
        {
            for (var x = 0; x < players.length; x++)
            {
                var card = deck.pop();
                players[x].Hand.push(card);
                renderCard(card, x);
                updatePoints();
                updateCount();
            }
        }
        updateDeck();

    }

    function renderCard(card, player)
    {
        var hand = document.getElementById('hand_' + player);
        hand.appendChild(getCardUI(card));
    }

    function getCardUI(card)
    {
        var el = document.createElement('div');
        var icon = '';
        if (card.Suit == 'Hearts')
            icon='&hearts;';
        else if (card.Suit == 'Spades')
            icon = '&spades;';
        else if (card.Suit == 'Diamonds')
            icon = '&diams;';
        else
            icon = '&clubs;';

        el.className = 'card';
        el.innerHTML = card.Value + '<br/>' + icon;
        return el;
    }

    //Returns the number of points that a player has in hand
    function getPoints(player)
    {
        var points = 0;
        for(var i = 0; i < players[player].Hand.length; i++)
        {
            points += players[player].Hand[i].Weight;
        }
        players[player].Points = points;
        return points;
    }

    function updatePoints()
    {
        for (var i = 0 ; i < players.length; i++)
        {
            getPoints(i);
            document.getElementById('points_' + i).innerHTML = players[i].Points;
            /*if (players[i].Points > 21 && )
            {
            weight = 1;
            }else{
            weight = 11;
            }*/
        }
    }

    function hitMe()
    {
//Gives a card from the deck to the current player
//Check if current player is over 21
        document.getElementById('stayBtn').value = 'Stay';
        var card = deck.pop();
        players[currentPlayer].Hand.push(card);
        renderCard(card, currentPlayer);
        updateCount();
        updatePoints();
        updateDeck();
        check();
    }

    function stay()
    {
// Move on to next player, if any
        document.getElementById('hitBtn').disabled = false;
        if (currentPlayer != players.length-1) {
            document.getElementById('player_' + currentPlayer).classList.remove('active');
            currentPlayer += 1;
            document.getElementById('player_' + currentPlayer).classList.add('active');
        }

        else {
            endGame();
        }
    }

    function endGame()
    {
        var winner = -1;
        var score = 0;

        for(var i = 0; i < players.length; i++)
        {
            if (players[i].Points > score && players[i].Points < 22)
            {
                winner = i;
            }

            score = players[i].Points;
        }

        document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;

        document.getElementById("status").style.display = "inline-block";
    }

    function check()
    {
        if (players[currentPlayer].Points > 21)
        {
            document.getElementById('stayBtn').value = 'Next Player';
            document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' went bust!';
            document.getElementById('status').style.display = "inline-block";
            document.getElementById('hitBtn').disabled = true;
            if(players[currentPlayer] == players.length){
                endGame();
            }
        }
    }

    function updateDeck()
    {
        document.getElementById('deckcount').innerHTML = deck.length;
    }

    function getBalance(player)
    {
        let balance = document.getElementById('amountLeft').value;
        for(let i = 0; i < players.length; i++)
        {
            balance = players[player].balance;
        }
        document.getElementById('amountLeft').value = balance;
        return balance;
    }

    function updateBalance(balance, bet)
    {
        for(var i = 0; i < players.length; i++)
        {
            if (players[i] == winner)
            {
                document.getElementById('amountLeft').innerHTML = balance+bet;
            }
            else{
                document.getElementById('amountLeft').innerHTML = balance-bet;
            }

            for (var i = 0 ; i < players.length; i++)
            {
                getPoints(i);
                document.getElementById('points_' + i).innerHTML = players[i].Points;
            }
        }

    }

    function updateCount(card, count)
    {
        if (card == 2 || card == 3 || card == 4 || card == 5 || card ==6){
            count -= count;
        }
        else if (card == 10 || card == 'J' || card == 'Q' || card == 'K'){
            count+=count;
        }
        return count;
        document.getElementById('currentCount').innerHTML = count;
    }

    window.addEventListener('load', function(){
        createDeck();
        shuffle();
        createPlayers(numPlayers);

    });
