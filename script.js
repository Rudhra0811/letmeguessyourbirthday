const question = document.getElementById('question');
const beforeBtn = document.getElementById('before');
const onBtn = document.getElementById('on');
const afterBtn = document.getElementById('after');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const progressBar = document.getElementById('progress');

let start = 1;
let end = 365;
let mid;
let guessCount = 0;

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function dayOfYear(month, day) {
    const date = new Date(new Date().getFullYear(), month - 1, day);
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function dateFromDayOfYear(dayOfYear) {
    const date = new Date(new Date().getFullYear(), 0);
    date.setDate(dayOfYear);
    return `${months[date.getMonth()]} ${date.getDate()}`;
}

function updateQuestion() {
    mid = Math.floor((start + end) / 2);
    const midDate = dateFromDayOfYear(mid);
    question.textContent = `Is your birthday before, on, or after ${midDate}?`;
    question.classList.add('fade-in');
    setTimeout(() => question.classList.remove('fade-in'), 500);
    guessCount++;
    updateProgressBar();
}

function updateProgressBar() {
    const progress = (guessCount / 9) * 100; // Max 9 guesses for 365 days
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function gameOver(message) {
    result.textContent = message;
    result.classList.add('fade-in');
    beforeBtn.style.display = 'none';
    onBtn.style.display = 'none';
    afterBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}

function restart() {
    start = 1;
    end = 365;
    guessCount = 0;
    result.textContent = '';
    beforeBtn.style.display = 'inline-block';
    onBtn.style.display = 'inline-block';
    afterBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    progressBar.style.width = '0%';
    updateQuestion();
}

beforeBtn.addEventListener('click', () => {
    end = mid - 1;
    if (start <= end) {
        updateQuestion();
    } else {
        gameOver(`I couldn't guess your birthday. Please try again.`);
    }
});

onBtn.addEventListener('click', () => {
    gameOver(`I guessed your birthday in ${guessCount} tries! It's ${dateFromDayOfYear(mid)}.`);
});

afterBtn.addEventListener('click', () => {
    start = mid + 1;
    if (start <= end) {
        updateQuestion();
    } else {
        gameOver(`I couldn't guess your birthday. Please try again.`);
    }
});

restartBtn.addEventListener('click', restart);

// Start the game
updateQuestion();