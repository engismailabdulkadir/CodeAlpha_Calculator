// Grab elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operatorClicked = false;

// Update display
function updateDisplay(value) {
  display.value = value;
}

// Handle number & dot clicks
function handleNumber(num) {
  if (operatorClicked) {
    currentInput = num;
    operatorClicked = false;
  } else {
    // Prevent multiple leading zeros
    if (currentInput === '0' && num === '0') return;
    // Prevent multiple dots
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
  }
  updateDisplay(currentInput);
}

// Handle operator clicks
function handleOperator(op) {
  if (!currentInput) return;
  // Append operator with spaces for easy splitting
  currentInput += ` ${op} `;
  operatorClicked = false;
  updateDisplay(currentInput);
}

// Clear
function clearAll() {
  currentInput = '';
  updateDisplay('');
}

// Evaluate expression
function calculate() {
  try {
    // Use Function constructor instead of eval for slightly safer parse
    const result = Function(`"use strict"; return (${currentInput});`)();
    currentInput = String(result);
    updateDisplay(currentInput);
    operatorClicked = true;
  } catch {
    updateDisplay('Error');
    currentInput = '';
  }
}

// Attach listeners
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('number')) {
      handleNumber(btn.textContent);
    } else if (btn.classList.contains('dot')) {
      handleNumber('.');
    } else if (btn.classList.contains('operator')) {
      handleOperator(btn.dataset.op);
    } else if (btn.id === 'clear') {
      clearAll();
    } else if (btn.id === 'equals') {
      calculate();
    }
  });
});
