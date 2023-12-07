//  input para introducir la letra okkk
//  mostrar en pantalla la letra que se ha marcado
//  generar la palabra secreta
//  mostrar en pantalla cuantas letras tiene
//  mostrar el numero de intentos restantes

const inputLetterElement = document.getElementById('inputLetter');
const containerSecretWordElement = document.getElementById(
	'containerSecretWord'
);
const buttonNewWordElement = document.getElementById('buttonNewWord');
const errorLetterElement = document.getElementById('errorLetters');
const counterAttemptsElement = document.getElementById('counterAttempts');
const containerCounterAttemptsElement = document.getElementById(
	'containerCounterAttempts'
);
const toyElement = document.getElementById('toy');

const arraySecretsWords = ['casa', 'perro', 'cerveza', 'paraguas', 'raqueta'];
let secretWord = '';
let wordToPrint = [];
let errorPlayer = '';
let counterAttempts = 6;

// leer la letra que introduce el jugador
const playerLetter = event => {
	if (event.key !== 'Enter') return;
	const letter = inputLetterElement.value;
	checkLetter(letter);
	printErrorLetters(letter);
	inputLetterElement.value = '';
};
// conseguir la palabra secreta
const getSecretWord = () => {
	const number = Math.floor(Math.random() * arraySecretsWords.length);
	return arraySecretsWords[number];
};

// pintar el tablero
const printCells = () => {
	containerSecretWordElement.innerHTML = '';
	secretWord = getSecretWord();
	wordToPrint.length = secretWord.length;
	console.log(secretWord);
	console.log(wordToPrint);
	inputLetterElement.disabled = false;
	for (let i = 0; i < secretWord.length; i++) {
		const cell = document.createElement('span');
		cell.classList.add('cell');
		containerSecretWordElement.append(cell);
	}
};
printCells();
const restartGame = () => {
	buttonNewWordElement.disabled = true;
	inputLetterElement.disabled = false;
	counterAttemptsElement.textContent = `Intentos Restantes: ${counterAttempts}`;
	errorLetterElement.innerHTML = '';
	containerCounterAttemptsElement.classList.remove('red');
	containerCounterAttemptsElement.classList.remove('green');
	for (let i = 0; i < 7; i++) {
		toyElement.children[i].classList.add('hide');
	}
	printCells();
};

// comprobar la letra
const checkLetter = letter => {
	const secretWordSplit = secretWord.split('');
	for (let i = 0; i < secretWordSplit.length; i++) {
		if (letter === secretWordSplit[i]) {
			console.log(i);
			wordToPrint.splice(i, 1, letter);
		}
	}
	printPlayerWordOnCells();
	console.log(wordToPrint);
};
// pintar las letrar erroneas
const printErrorLetters = letter => {
	if (!wordToPrint.includes(letter) && !errorPlayer.includes(letter)) {
		printToy();
		const errorLetter = document.createElement('span');
		errorLetter.textContent = letter;
		errorLetterElement.append(errorLetter);
		errorPlayer += letter;
		counterAttempts--;
		printCounterAttempts();
	}
};
// Pintar contador de numero de oportunidades
const printCounterAttempts = () => {
	if (counterAttempts < 0) {
		counterAttemptsElement.textContent = 'PERDISTE';
		containerCounterAttemptsElement.classList.add('red');
		counterAttempts = 6;
		wordToPrint = [];
		errorPlayer = '';
		inputLetterElement.disabled = true;
		buttonNewWordElement.disabled = false;
	} else {
		counterAttemptsElement.textContent = `Intentos Restantes: ${counterAttempts}`;
	}
};
printCounterAttempts();

const printPlayerWordOnCells = () => {
	let counter = 0;
	for (let i = 0; i < wordToPrint.length; i++) {
		containerSecretWordElement.children[i].textContent = wordToPrint[i];
		console.log(wordToPrint[i]);
		if (wordToPrint[i]) {
			counter++;
		}
	}
	if (counter === wordToPrint.length) {
		containerCounterAttemptsElement.classList.add('green');
		counterAttemptsElement.textContent = 'PERDISTE';
		counterAttempts = 6;
		wordToPrint = [];
		errorPlayer = '';
		inputLetterElement.disabled = true;
		buttonNewWordElement.disabled = false;
	}
	console.log(counter);
};
const printToy = () => {
	console.log(counterAttempts);
	toyElement.children[counterAttempts].classList.remove('hide');
};

inputLetterElement.addEventListener('keypress', playerLetter);
buttonNewWordElement.addEventListener('click', restartGame);
