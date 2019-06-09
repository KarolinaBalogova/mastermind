/* Global Mastermind */

/**
 * A list of HTML5 colours that the mastermind code consists of.
 * @public
 * @const {Array.<string>}
 */
const colours = [
	'red',
	'darkorange',
	'gold',
	'green',
	'greenyellow',
	'cyan',
	'deepskyblue',
	'blue',
	'purple',
	'pink'
];

/**
 * A new instance of the Mastermind object.
 * @public
 * @const {Object.<Mastermind>}
 */
const mastermind = new Mastermind( colours );

/**
 * An array holding the user's guess for each round.
 * @public
 * @type {Array.<string>}
 */
let guess = [];

/**
 * Populates the HTML game interface with coloured pegs that the user can click on to make a guess.
 */
( () => {
	const colourPickerContainer = document.querySelector( '.playground__peg-pickers' );

	colours.forEach( colour => {
		const peg = createElement( 'li', 'peg peg--picker', null, [[ 'backgroundColor', colour ]] );
		peg.addEventListener( 'click', handlePegClick );
		colourPickerContainer.appendChild( peg );
	} );
} )();

/**
 * Displays the picked colour in the round's next empty peg space.
 * Displays Mastermind's feedback when the round's guess is complete.
 * Handles winning scenario.
 */
function handlePegClick() {
	/**
	 * The current round, for which a feedback is required.
	 * @const {number}
	 */
	const round = mastermind.round;

	/**
	 * The next empty peg space in the current row.
	 * @const {Element}
	 */
	const nextEmptyPeg = document.querySelector( '.peg--empty' );

	/**
	 * Background colour of the picked peg.
	 * @const {string}
	 */
	const colour = this.style.backgroundColor;

	//Display the picked colour in the round's next empty peg space
	nextEmptyPeg.style.backgroundColor = colour;

	//Remove empty peg indicator from the element
	nextEmptyPeg.classList.remove( 'peg--empty' );

	//Push the picked colour to the guess array
	guess.push( colour );

	//If the round's guess is complete
	if ( guess.length === 4 ) {

		//Get Mastermind's feedback
		const feedback = mastermind.makeGuess( guess );
		const winner = showFeedback( feedback, round );

		if ( winner ) {
			disablePegPickers();

			//Display winning message
			document.querySelector( 'h1' ).innerHTML = 'Congratulations!';
		} else {
			appendEmptyRoundRow();
		}

		//Reset guess array for the next round
		guess = [];
	}
}

/**
 * Displays feedback pegs on the game interface according to Mastermind's feedback.
 * @param {Array.<number>} feedback - Mastermind's feedback.
 * @param {number} round - The number of the round.
 * @return {boolean} Whether user won the game.
 */
function showFeedback( feedback, round ) {
	const appendContainer = document.querySelector( '#round-' + round + ' .round__feedback' );

	if ( feedback.length === 0 ) {
		appendContainer.innerHTML = '—';
		return false;
	}

	for ( let i = 0; i < feedback.length; i++ ) {
		//Display feedback peg
		const className = 'feedback-peg feedback-peg--' + ( feedback[i] === 0 ? 'wrong-pos' : 'correct' );
		const peg = createElement( 'li', className );

		appendContainer.appendChild( peg );
	}

	//If feedback = [1, 1, 1, 1] (all colours present & at correct positions) the user won
	//It is enough to check if the 4th element === 1, as the feedback array always adds the 1 values from the beginning
	return ( feedback.length === 4 && feedback[3] === 1 );
}

/**
 * Appends an empty row to the game__rounds container for the current round.
 * @param {string} id - ID of the row.
 * @param {number} round - The number of the round.
 */
function appendEmptyRoundRow() {
	const roundRow = createElement( 'li', 'game__rounds__round round', 'round-' + mastermind.round );
	roundRow.innerHTML =
		'<h2 class="round__no">' + mastermind.round + '.</h2>\
		<ul class="round__guess">\
			<li class="peg peg--empty"></li>\
			<li class="peg peg--empty"></li>\
			<li class="peg peg--empty"></li>\
			<li class="peg peg--empty"></li>\
		</ul>\
		<ul class="round__feedback"></ul>';

	document.querySelector( '.game__rounds' ).appendChild( roundRow );
}

/**
 * Disables clicks on the peg pickers.
 */
function disablePegPickers() {
	const pegs = document.querySelectorAll( '.peg--picker' );
	pegs.forEach( peg => {
		peg.classList.add( 'peg--disabled' );
	} );
}

/**
 * Creates HTML element
 * @param {string} type - Element type.
 * @param {string} className - Class of the element.
 * @param {Array.<string[]>} styles - CSS style of the element.
 * @return {Element} An instance of the HTML element.
 */
function createElement( type, className, id, styles = [] ) {
	const el = document.createElement( type );
	el.className = className;
	el.id = id;
	styles.forEach( style => {
		el.style[ style[0] ] = style[1];
	} );

	return el;
}

