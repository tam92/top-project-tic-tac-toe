// game object
const game = (() => {
    let _turn = 1;    // 1: player1 turn; 2: player2 turn;

    const changeTurns = () => {
        if (_turn === 1) {
            _turn = 2;
            displayInfo("Player 2 (o): make a move");
        } else {
            _turn = 1;
            displayInfo("Player 1 (x): make a move");
        }
        console.log("Turn: " + _turn);
    };

    const displayInfo = (message) => {
        const infoP = document.getElementById("infoP");
        infoP.innerHTML = message;
    };

    const getTurn = () => {
        return _turn;
    };

    return {
        changeTurns,
        getTurn,
        displayInfo,
    }

})();

// store the gameboard as an array inside of a Gameboard object, use a module 
const gameboard = (() => {

    let _board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    // -------------------------------------------------------------------------
    // Adds the click event to the cells (private)
    // -------------------------------------------------------------------------
    const _addClickEvent = () => {
        let cells = document.getElementsByClassName("cell");
        for (let cell of cells) {
            cell.addEventListener('click', function a (event) {
            //    alert(cell.firstChild.id)
                game.getTurn() == 1 ?
                    placeSymbol(player1.getSymbol(), cell.firstChild.id) :
                    placeSymbol(player2.getSymbol(), cell.firstChild.id);   
            })
        }
    }
    _addClickEvent();

    // checkWinner() 
    const checkWinner = (symbol) => {
        // check horizontals
        if (_board[0] == symbol && _board[1] == symbol && _board[2] == symbol ||
            _board[3] == symbol && _board[4] == symbol && _board[5] == symbol ||
            _board[6] == symbol && _board[7] == symbol && _board[8] == symbol ||
        // check verticals
            _board[0] == symbol && _board[3] == symbol && _board[6] == symbol ||
            _board[1] == symbol && _board[4] == symbol && _board[7] == symbol ||
            _board[2] == symbol && _board[5] == symbol && _board[8] == symbol ||
        // check diagonals
            _board[0] == symbol && _board[4] == symbol && _board[8] == symbol ||
            _board[2] == symbol && _board[4] == symbol && _board[6] == symbol)
        {
            _announceWinner(symbol);
        }

        let check = false;
        _board.forEach(cell => {
            if (cell === " ") {
                check = true;
                return;
            }
        });
        if (check === false) {
            game.displayInfo("It's a tie!");
        }
    };

    const _announceWinner = (symbol) => {
        console.log(symbol + " wins!!");
        const infoP = document.getElementById("infoP");
        infoP.innerHTML = symbol + " wins!!";
    };

    // -------------------------------------------------------------------------
    // placeSymbol(symbol, cellNumber): places the symbol in the specified array 
    //                                  position. If occupied, shows an error 
    //                                  message in the console.
    //      symbol: the symbol to use
    //      cellNumber: the array position
    // -------------------------------------------------------------------------
    const placeSymbol = (symbol, cellNumber) => {
        if (_board[cellNumber] === " ") {
            _board[cellNumber] = symbol;
            game.changeTurns();
            
            gameboard.checkWinner(symbol);
            
            gameboard.render();
        } else {
            console.log("The chosen cell is already occupied! Try another location");
        }

    };

    // -------------------------------------------------------------------------
    // render(array): renders the contents of the array to the webpage and to 
    //                the console.
    //         array: the current gameboard
    // -------------------------------------------------------------------------
    const render = () => {
        // Renders the current gameboard to the console:
        console.log("Current gameboard:");
        console.log("\t|" + _board[0] + "|" + _board[1] + "|" + _board[2] + "|");
        console.log("\t|" + _board[3] + "|" + _board[4] + "|" + _board[5] + "|");
        console.log("\t|" + _board[6] + "|" + _board[7] + "|" + _board[8] + "|");

        // Renders the current gameboard to the webpage:
        const webBoard = document.getElementsByClassName("cell");
        let index = 0;
        Array.from(webBoard).forEach(cell => {
            cell.innerHTML = '';    // deletes the previous board
            const img = document.createElement('img');
            img.setAttribute("id", index);
            // puts the image in the gameboard
            if (_board[index] === 'x') {
                img.setAttribute("src", "images/multiply-svgrepo-com.svg");
            } else if (_board[index] === 'o') {
                img.setAttribute("src", "images/radiobox-svgrepo-com.svg");
            } else {
                img.setAttribute("src", "");
            }
            index++;
            cell.appendChild(img);
        });
    }

    // -------------------------------------------------------------------------
    // clear(): clears the gameboard (fills the array with spaces).
    // -------------------------------------------------------------------------
    const clear = () => {
        _board.fill(" ");
    };

    return {
        render,
        clear,
        placeSymbol,
        checkWinner,
    };
})();

// -----------------------------------------------------------------------------
// Factory that creates players.
// Parameters:
//      - name: the name of the player
//      - symbol: the symbol the player will use
// -----------------------------------------------------------------------------
const Player = (name, symbol) => {
    let _name = name;
    let _symbol = symbol;
    const getName = () => console.log(_name);
    const getSymbol = () => _symbol;

    return {
        getName,
        getSymbol,
    };
};

// Create the players
const player1 = Player("Player 1", 'x');
const player2 = Player("Player 2", 'o');
gameboard.render();