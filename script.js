// store the gameboard as an array inside of a Gameboard object
// use a module 
const gameboard = (function() {
    const board = [];

    function displayGameboard() {
        console.log(board);
    }

    return {
        displayGameboard: displayGameboard,
    };

})();

// create players with a factory

// function that renders the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)


addClickEvent();
// Adds the click event to the cells
function addClickEvent() {
    let cells = document.getElementsByClassName("cell");

    for (let cell of cells) {
        cell.addEventListener('click', function (event) {
            alert(cell.id);
        })
    }
}