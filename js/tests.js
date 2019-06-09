/* Global Mastermind */

function testMastermindConstructor() {
	let mastermind;
	let msg;

	//Check if constructor throws an exception when it's parameter is not an array of a minimum length of 2
	msg = "The constructor should throw an exception when it's parameter is not an array of a minimum length of 2";

	try {
		mastermind = new Mastermind(['red']);
		console.assert( false, msg );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	try {
		mastermind = new Mastermind('blue');
		console.assert( false, msg );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	try {
		mastermind = new Mastermind( 2, 5 );
		console.assert( false, msg );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	//Check if constructor does NOT throw an exception when it's parameter is an array of a minimum length of 2
	msg = "The constructor should NOT throw an exception when it's parameter is an array of a minimum length of 2";

	try {
		mastermind = new Mastermind(['red', 'blue', 'green']);
	} catch( invalidArgumentException ) {
		console.assert( false, msg );
	}
}

function testMakeGuess() {
	let mastermind;
	let msg;
	let feedback;

	mastermind = new Mastermind(['red', 'blue', 'green', 'yellow']);

	//Check if makeGuess method throws an exception when it's parameter is not an array of a length of 4
	msg = "makeGuess method should throw an exception when it's parameter is not an array of a length of 4";

	try {
		mastermind.makeGuess(['red', 'blue', 'green']);
		console.assert( false, msg );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	try {
		mastermind.makeGuess(['red', 'blue', 'green', 'green', 'yellow']);
		console.assert( false, msg );	//the program should never reach this line
	} catch( invalidArgumentException ) {
		//continue, an exception was thrown as expected
	}

	//Check if makeGuess method does NOT throw an exception when it's parameter is an array of a length of 4
	msg = "The makeGuess method should NOT throw an exception when it's parameter is an array of a length of 4";

	try {
		mastermind.makeGuess(['red', 'blue', 'green', 'yellow']);
	} catch( invalidArgumentException ) {
		console.assert( false, msg );
	}

	//Check if makeGuess method returns the correct feedback
	mastermind.code = ['red', 'blue', 'red', 'yellow'];

	feedback = mastermind.makeGuess(['red', 'red', 'red', 'blue']);
	console.assert( feedback.length === 3 && feedback[0] === 1 && feedback[1] === 1 && feedback[2] === 0, 'The feedback should be [1, 1, 0]' );

	feedback = mastermind.makeGuess(['red', 'blue', 'blue', 'blue']);
	console.assert( feedback.length === 2 && feedback[0] === 1 && feedback[1] === 1, 'The feedback should be [1, 1]' );

	feedback = mastermind.makeGuess(['red', 'blue', 'blue', 'blue']);
	console.assert( feedback.length === 2 && feedback[0] === 1 && feedback[1] === 1, 'The feedback should be [1, 1]' );

	feedback = mastermind.makeGuess(['yellow', 'red', 'blue', 'blue']);
	console.assert( feedback.length === 3 && feedback[0] === 0 && feedback[1] === 0 && feedback[2] === 0, 'The feedback should be [0, 0, 0]' );
}

function runTests() {
	testMastermindConstructor();
	testMakeGuess();
}

