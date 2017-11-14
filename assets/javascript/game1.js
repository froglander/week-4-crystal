/*
    Crystal Collector Requirements
    - There will be four crystals displayed as buttons on the page.
        * Each crystal should have a random hidden value between 1 - 12.
    - The player will be shown a random number at the start of the game.
        * The random number shown at the start of the game should be between 19 - 120.
    - When the player clicks on a crystal, it will add a specific amount of points to the player's total score.
    - Your game will hide this amount until the player clicks a crystal.
    - When they do click one, update the player's score counter.
    - The player wins if their total score matches the random number from the beginning of the game.
    - The player loses if their score goes above the random number.
    - The game restarts whenever the player wins or loses.

    - When the game begins again, the player should see a new random number. 
      Also, all the crystals will have four new hidden values. Of course, 
      the user's score (and score counter) will reset to zero.
    - The app should show the number of games the player wins and loses. 
      To that end, do not refresh the page as a means to restart the game.
*/

/* Pseudocode
    Display a random number
    Assign hidden values to each crystal
    Display the player's score/value and have it update each time a crystal is clicked
    If the player score is less than random number, keep playing
    If the player score equals random number, player wins
    If the player score is greater than random number, player loses
    Once a player wins or loses, start game again
*/

$(document).ready(function () {
    var randomNumber;
    var randMax = 120;
    var randMin = 19;
    var crystalMax = 12;
    var crystalMin = 1;
    var userScore = 0;
    var wins = 0;
    var losses = 0;
    var crystals = [];

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Now let's use jquery to assign the values in the crystal array to the crystal divs
    function intializeCrystals() {
        for (var i = 0; i < 4; i++) {
            crystals.push(randomNum(crystalMin, crystalMax));
        }

        var $crystalsDiv = $("#crystals");
        $crystalsDiv.empty();

        $.each(crystals, function (i, crystal) {            
            var $crystalButton = $("<button>");
            $crystalButton.addClass("btn btn-primary crystal")
                .attr("value", crystal)
                .html("<-*->")
                .on("click", function () {
                    userScore = parseInt(userScore) + parseInt(this.value);
                    $("#player-score").html(userScore).attr("value", userScore);
                    checkWin();
                });
            $crystalsDiv.append($crystalButton);
        });
    }

    function checkWin() {
        if (userScore === randomNumber) {
            wins++;
            resetGame();
        } else if (userScore > randomNumber) {
            losses++;
            resetGame();
        } 
    }

    function resetGame() {
        userScore = 0;
        crystals = [];
        randomNumber = randomNum(randMin, randMax);
        $("#random-number").html(randomNumber);
        $("#wins").html(wins);
        $("#losses").html(losses);
        $("#player-score").html(userScore);

        intializeCrystals();
    }

    resetGame();
});