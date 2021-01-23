window.addEventListener('load', start);

let rRange;
let gRange;
let bRange;
let redText;
let greenText;
let blueText;
let board;

function start() {
  rRange = document.getElementById('red');
  gRange = document.getElementById('green');
  bRange = document.getElementById('blue');
  redText = document.getElementById('red-text');
  greenText = document.getElementById('green-text');
  blueText = document.getElementById('blue-text');
  board = document.getElementById('container-block');

  connectInputs(rRange, redText);
  connectInputs(gRange, greenText);
  connectInputs(bRange, blueText);
  toColorBoard();

  console.log('ready');
}

function connectInputs(range, text) {
  function fillText(event) {
    text.value = event.target.value;
  }
  text.value = range.value;
  range.addEventListener('input', fillText);
  range.addEventListener('input', toColorBoard);
}

function toColorBoard() {
  let color = `rgb(${rRange.value}, ${gRange.value}, ${bRange.value})`;
  board.style.backgroundColor = color;
}
