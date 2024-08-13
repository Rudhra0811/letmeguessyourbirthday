const question = document.getElementById('question');
const beforeBtn = document.getElementById('before');
const onBtn = document.getElementById('on');
const afterBtn = document.getElementById('after');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const progressBar = document.getElementById('progress');
const calendar = document.getElementById('calendar');
const difficultySelect = document.getElementById('difficulty-select');

let start = 1;
let end = 365;
let mid;
let guessCount = 0;
let difficulty = 'date';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

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

function getSeason(dayOfYear) {
    if (dayOfYear < 80 || dayOfYear >= 355) return 'Winter';
    if (dayOfYear < 172) return 'Spring';
    if (dayOfYear < 266) return 'Summer';
    return 'Autumn';
}

function updateQuestion() {
    mid = Math.floor((start + end) / 2);
    let midDate = dateFromDayOfYear(mid);
    let questionText;

    switch (difficulty) {
        case 'month':
            midDate = months[new Date(new Date().getFullYear(), 0, mid).getMonth()];
            questionText = `Is your birth month before, in, or after ${midDate}?`;
            break;
        case 'season':
            midDate = getSeason(mid);
            questionText = `Is your birth season before, in, or after ${midDate}?`;
            break;
        default:
            questionText = `Is your birthday before, on, or after ${midDate}?`;
    }

    question.textContent = questionText;
    question.classList.add('fade-in');
    setTimeout(() => question.classList.remove('fade-in'), 500);
    guessCount++;
    updateProgressBar();
    updateCalendar();
    playSound('click');
}

function updateProgressBar() {
    const maxGuesses = difficulty === 'date' ? 9 : (difficulty === 'month' ? 4 : 2);
    const progress = (guessCount / maxGuesses) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function updateCalendar() {
    calendar.innerHTML = '';
    for (let i = 1; i <= 365; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        if (i >= start && i <= end) {
            day.classList.add('active');
        }
        calendar.appendChild(day);
    }
}

function gameOver(message) {
    result.textContent = message;
    result.classList.add('fade-in');
    beforeBtn.style.display = 'none';
    onBtn.style.display = 'none';
    afterBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    playSound('win');
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
    difficulty = difficultySelect.value;
    updateQuestion();
}

function playSound(type) {
    const audio = new Audio(type === 'win' ? 'https://example.com/win.mp3' : 'https://example.com/click.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
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
    let guessedValue;
    switch (difficulty) {
        case 'month':
            guessedValue = months[new Date(new Date().getFullYear(), 0, mid).getMonth()];
            break;
        case 'season':
            guessedValue = getSeason(mid);
            break;
        default:
            guessedValue = dateFromDayOfYear(mid);
    }
    gameOver(`I guessed your ${difficulty} in ${guessCount} tries! It's ${guessedValue}.`);
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
difficultySelect.addEventListener('change', restart);

// Initialize calendar
for (let i = 1; i <= 365; i++) {
    const day = document.createElement('div');
    day.className = 'day active';
    calendar.appendChild(day);
}

// Start the game
updateQuestion();