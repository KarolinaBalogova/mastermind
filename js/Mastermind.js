/**
 * Mastermind class.
 * Generates a random combination of 4, from the provided array of colours, for the user to guess.
 * Provides feedback to user guesses.
 */
class Mastermind {
	/**
	 * Generates a random combination of 4 colours.
	 * @param {Array.<string>} colours - An array of colours the code can consist of.
	 * @throws {Error} Throws an error when colours parameter is not an array with a minimum length of 2.
	 */
	constructor( colours ) {
		/**
		 * @private
		 * @const {string}
		 */
		this.colours = colours;

		/**
		 * @private
		 * @const {Array.<string>}
		 */
		this.code = [];

		/**
		 * Counts the number of guesses (rounds) the user made.
		 * @public
		 * @type {number}
		 */
		this.round = 1;

		//Throws an error if this.colours is not an array with a minimum length of 2.
		if ( !Array.isArray( this.colours ) || ( Array.isArray( this.colours ) && this.colours.length < 2 ) ) {
			throw new Error( "Provide an array with a minimum of 2 colours" );
		}

		//Generate a random combination of 4 colours (the colours can repeat themselves)
		for ( let i = 0; i < 4; i++ ) {
			this.code.push( this.getRandomColour() );
		}
	}

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

	/**
	 * Picks a random item from the colours array.
	 * @private
	 * @return {string} A random item from the colours array.
	 */
	getRandomColour() {
		return this.colours[ Math.floor( Math.random() * this.colours.length ) ];
	}
}
