# Mastermind Game

A mastermind game written in Vanilla JavaScript(ES6) that allows the user to play against the computer.

## How to play?

The aim of the game is to guess the computer-generated combination of 4 colours, where each colour CAN be used unlimited number of times (ie. the code could be red-red-red-red), in as few guesses as possible.

Start guessing by clicking on the coloured pegs on the left side of the game interface. After completing the row, the computer will provide you with some feedback; red pegs indicate each peg that is a correct color but wrong position, and the white pegs indicate each peg that is a correct color and correct position. The order of these does not hold any significance.

The game was designed this way for the highest possible difficulty.

## File structure

The program has the following structure:

* [index.html](./index.html)

   The HTML file to be run in a browser. Contains the game interface and simple game instructions.

* [js/Mastermind.js](./js/Mastermind.js)

   Definition of the Mastermind ES6 class, which generates a random combination of 4 colours from a pre-defined list and provides feedback to user guesses.

   Method containing the main logic of the game:
   * makeGuess
       ```javascript
       /**
       * Provides feedback to the user's guess by comparing the mastermind's code with it.
       * @public
       * @param {Array.<string>} guess - A combination of 4 colours
       * @throws {Error} Throws an error when guess parameter is not an array with a length of 4.
       * @return {Array.<number>} An array consisting of 1 (present & correct position) and 0 (present & wrong position) values, respectively (without specifying which pegs do these values belong to).
       */
      makeGuess( guess ) {
        //Throw an error if guess is not an array with a length of 4
        if ( !Array.isArray( guess ) || ( Array.isArray( guess ) && guess.length !== 4 ) ) {
          throw new Error( "Provide a combination of 4 colours in an array." );
        }

        let feedback = [];

        //Make a local copy of the code and guess that can be manipulated
        let _code = this.code.slice( 0 );
        let _guess = guess.slice( 0 );

        //Find all exact matches (colour present & correct position)
        for ( let i = 0; i < 4; i++ ) {
          if ( _code[i] === _guess[i] ) {
            feedback.push( 1 );

            //set these pegs in both arrays as undefined to rule them out of further comparisons
            delete _guess[i];
            delete _code[i];
          }
        }

        //Find all partial matches (colour present & wrong position)
        for ( let x = 0; x < 4; x++ ) {
          if ( _code[x] && _guess.includes( _code[x] ) ) {
            feedback.push( 0 );

            //set this peg in the guess array as undefined to rule it out of further comparisons
            delete _guess[ _guess.indexOf( _code[x] ) ];
          }
        }

        //Start next round
        this.round++;

        return feedback;
      }
      ```

* [js/game.js](./js/game.js)

   This is where the game gets initialized. Contains functions that respond to events trigerred by the user and manipulate the HTML game interface.

* [js/tests.js](./js/tests.js)

   File containing simple test functions that validate the outcome of the Mastermind methods.

* [css/styles.css](./css/styles.css)

   Styles for the HTML game interface.

* [css/reset.css](./css/reset.css)

   Meyerweb CSS reset.


