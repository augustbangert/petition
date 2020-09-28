(function () {
    var currentPlayer = "player1"; // variable defines existing player
    var playerInfo = $(".player-info");
    var overlay = $("#overlay");
    var colorPlayer = "";

    // ########## DETERMINE COLOR OF PLAYER ########## //
    // if (currentPlayer == "player1") {
    //     colorPlayer = "Red";
    // } else {
    //     colorPlayer = "Black";
    // }

    $(".column").on("click", function (e) {
        var selectedColumn = $(e.currentTarget); // declares the variable/column on which the click event took place
        var slotsInColumn = selectedColumn.children(); // selectedColumn.find('.slot');
        var checkWinRow = 0; // this defines the variables needed for the vertical win check loops
        var checkWinPlayer = "";
        var checkWinColumn = 0;
        var allColumns = $(".column");
        var holesInColumn = selectedColumn.children().children(); //references the selected column
        // var slotsInAllColumns = allColumns.children(); //does not reference the selected column
        // var holesInAllColumns = allColumns.children().children(); //does not reference the selected column
        var horsArray = [];
        var vertArray = [];
        var leftDownArray = [];
        var leftUpArray = [];
        var gameInSession = "yes";
        var gameWin = $("#game-win");

        // ########### LOOP TO DROP PIECES INTO THE BOARD ########## //

        for (var i = 5; i >= 0; i--) {
            // creates a loop to check which columns are empty, then adds a piece accordingly
            if (
                !slotsInColumn.eq(i).children().hasClass("player1") &&
                !slotsInColumn.eq(i).children().hasClass("player2")
            ) {
                slotsInColumn.eq(i).children().addClass(currentPlayer);
                break;
            }
        }

        // ######### FUNCTION TO SWITCH BETWEEN PLAYERS ######### //

        function switchPlayers() {
            // this function changes the player and current turn indication on the screen
            if (currentPlayer == "player1") {
                colorPlayer = "Black";
                currentPlayer = "player2";
                playerInfo.html("Black's Turn");
                playerInfo.css({ color: "black" });
            } else {
                colorPlayer = "Red";
                currentPlayer = "player1";
                playerInfo.html("Red's Turn");
                playerInfo.css({ color: "red" });
            }
        }

        // ######### GET CURRENT INDEXES ######## // // I will change this later. for now, I want to focus on diagonal victories.

        for (var i = 0; i <= 5; i++) {
            if (
                slotsInColumn.eq(i).children().hasClass("player1") ||
                slotsInColumn.eq(i).children().hasClass("player2")
            ) {
                checkWinRow = i;
                checkWinPlayer = slotsInColumn
                    .eq(i)
                    .children()
                    .attr("class")
                    .toString()
                    .slice(5);
                checkWinColumn = selectedColumn
                    .attr("class")
                    .toString()
                    .slice(10);
                // console.log("checkWinPlayer", checkWinPlayer);
                // console.log("checkWinRow", checkWinRow);
                // console.log("checkWinColumn", checkWinColumn);
                break;
            }
        }
        checkWinColumn = Number(checkWinColumn);
        // console.log("checkWinColumn", checkWinColumn);

        // ############ CREATE ARRAYS TO DETERMINE FOUR-IN-A-ROW ############## //

        // vertical win array
        for (var i = 0; i <= 5; i++) {
            vertArray.push(holesInColumn.eq(i).hasClass(currentPlayer));
        }

        // horizontal win array
        for (var i = 0; i <= 6; i++) {
            var allColumnsSlots = allColumns.eq(i).children();
            var allColumnsHoles = allColumnsSlots.eq(checkWinRow).children();
            horsArray.push(allColumnsHoles.hasClass(currentPlayer));
        }

        // diagonal upper-left to lower-right array
        for (var i = -3; i <= 3; i++) {
            var allColumnsSlots = allColumns.eq(checkWinColumn + i).children();
            var allColumnsHoles = allColumnsSlots
                .eq(checkWinRow + i)
                .children();
            leftDownArray.push(allColumnsHoles.hasClass(currentPlayer));
        }

        // diagonal lower-left to upper-right array
        for (var i = -3; i <= 3; i++) {
            var allColumnsSlots = allColumns.eq(checkWinColumn + i).children();
            var allColumnsHoles = allColumnsSlots
                .eq(checkWinRow - i)
                .children();
            leftUpArray.push(allColumnsHoles.hasClass(currentPlayer));
        }

        // ############ DISPLAY VICTORY MESSAGES ############## //
        // if someone wins, change the gameinsession to no, display victory message, and add overlay

        // //check vertical win
        function checkVertWin() {
            var counter = 0;
            for (var i = 0; i < vertArray.length; i++) {
                if (vertArray[i]) {
                    counter++;
                } else {
                    counter = 0;
                }
                console.log("counter", counter);
                if (counter == 4) {
                    gameInSession = "no";
                    gameWin.html(colorPlayer + " wins vertically!");
                    overlay.addClass("overlay-on");
                    counter = 0;
                    break;
                }
            }
        }

        //check horizontal win
        function checkHorsWin() {
            var counter = 0;
            for (var i = 0; i < horsArray.length; i++) {
                if (horsArray[i]) {
                    counter++;
                } else {
                    counter = 0;
                }
                console.log("counter", counter);
                if (counter == 4) {
                    gameInSession = "no";
                    gameWin.html(colorPlayer + " wins horizontally!");
                    overlay.addClass("overlay-on");
                    counter = 0;
                    break;
                }
            }
        }

        // check diagonal win
        function checkLeftDownWin() {
            var counter = 0;
            for (var i = 0; i < leftDownArray.length; i++) {
                if (leftDownArray[i]) {
                    counter++;
                } else {
                    counter = 0;
                }
                console.log("counter", counter);
                if (counter == 4) {
                    gameInSession = "no";
                    gameWin.html(colorPlayer + " wins diagonally!");
                    overlay.addClass("overlay-on");
                    counter = 0;
                    break;
                }
            }
        }

        // check diagonal win
        function checkLeftUpWin() {
            var counter = 0;
            for (var i = 0; i < leftUpArray.length; i++) {
                if (leftUpArray[i]) {
                    counter++;
                } else {
                    counter = 0;
                }
                console.log("counter", counter);
                if (counter == 4) {
                    gameInSession = "no";
                    gameWin.html(colorPlayer + " wins diagonally!");
                    overlay.addClass("overlay-on");
                    counter = 0;
                    break;
                }
            }
        }
        checkVertWin();
        checkHorsWin();
        checkLeftDownWin();
        checkLeftUpWin();

        switchPlayers();

        // ######## RESET BOARD BUTTON ######### //
        $("#reset-button").on("click", function () {
            console.log("reset button was clicked");
            allColumns.children().children().removeClass("player1");
            allColumns.children().children().removeClass("player2");
            if (gameInSession == "yes") {
                overlay.addClass("overlay-on");
                gameInSession = "no";
            } else {
                gameInSession = "yes";
                overlay.removeClass("overlay-on");
                gameWin.html("");
            }
        });
    });

    // $("#reset-button").on("click", function () {
    //     console.log("hey");
    // });

    // ############ TEST CODE ############ //

    // console.log("selectedColumn", selectedColumn);
    // console.log(
    //     "test",
    //     allColumns.eq(checkWinRow).hasClass(currentPlayer)
    // );
    // var iColumn = allColumns[i];
    // console.log("iColumn", iColumn);
    // console.log("loopColumn", loopColumn);
    // console.log(
    //     "test",
    //     loopColumn.eq(i).children(checkWinRow).hasClass(currentPlayer)
    // );
    // console.log(
    //     "iColumn.eq(checkWinRow).children()",
    //     iColumn.eq(checkWinRow).children()
    // );
    // console.log("allColumns[checkWinRow]", allColumns[checkWinRow]);
    // console.log("allColumns[5]", allColumns[5]);
    // console.log("allColumns.eq(checkWinRow)", allColumns.eq(checkWinRow));
    // console.log("allColumns[5]", allColumns[5]);

    // console.log(
    //     "test",
    //     allColumns.eq(6).children(checkWinRow).hasClass(currentPlayer)
    // );
    // console.log(currentPlayer);
    // console.log(
    //     "holesInColumn.eq(0).hasClass(currentPlayer)",
    //     holesInColumn.eq(0).hasClass(currentPlayer)
    // );
    // console.log(
    //     "holesInColumn.eq(5).hasClass(currentPlayer)",
    //     holesInColumn.eq(5).hasClass(currentPlayer)
    // );
    // console.log(slotsInColumn.eq(5).children());
    // console.log(slotsInColumn.eq(0).children());
    // console.log("holesInColumn[0]", holesInColumn[0]);
    // console.log("holesInColumn[5]", holesInColumn[5]);
    // console.log("allColumns", allColumns);
    // console.log("slotsInAllColumns[5]", slotsInAllColumns[5]);
    // console.log("slotsInAllColumns[4]", slotsInAllColumns[4]);
    // console.log("slotsInAllColumns[0]", slotsInAllColumns[0]);
    // console.log("holesInAllColumns[0]", holesInAllColumns[0]);
})();
