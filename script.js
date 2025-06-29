const gridSize = 8;
let mineCount = 10;
let minefield = [];
let revealed = [];
let flagged = [];
let gameOver = false;
let openMode = true; // true: open, false: flag

const grid = document.getElementById('grid');
const message = document.getElementById('message');
const toggleBtn = document.getElementById('toggleMode');
const startBtn = document.getElementById('startBtn');
const mineCountInput = document.getElementById('mineCount');

function initGame() {
    mineCount = Math.max(1, Math.min(63, parseInt(mineCountInput.value) || 10));
    minefield = Array.from({length: gridSize}, () => Array(gridSize).fill(0));
    revealed = Array.from({length: gridSize}, () => Array(gridSize).fill(false));
    flagged = Array.from({length: gridSize}, () => Array(gridSize).fill(false));
    gameOver = false;
    openMode = true;
    toggleBtn.textContent = "OPEN";
    message.textContent = '';
    placeMines();
    calculateNumbers();
    renderGrid();
}

function placeMines() {
    let placed = 0;
    while (placed < mineCount) {
        let r = Math.floor(Math.random() * gridSize);
        let c = Math.floor(Math.random() * gridSize);
        if (minefield[r][c] !== 'M') {
            minefield[r][c] = 'M';
            placed++;
        }
    }
}

function calculateNumbers() {
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (minefield[r][c] === 'M') continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    let nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
                        if (minefield[nr][nc] === 'M') count++;
                    }
                }
            }
            minefield[r][c] = count;
        }
    }
}

function renderGrid() {
    grid.innerHTML = '';
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            if (revealed[r][c]) {
                cell.classList.add('open');
                if (minefield[r][c] === 'M') {
                    cell.textContent = '💣';
                } else if (minefield[r][c] > 0) {
                    cell.textContent = minefield[r][c];
                    cell.style.color = getNumberColor(minefield[r][c]);
                }
            } else if (flagged[r][c]) {
                cell.classList.add('flagged');
                cell.textContent = '🚩';
            }
            cell.addEventListener('click', onCellClick);
            grid.appendChild(cell);
        }
    }
}

function getNumberColor(num) {
    const colors = ["", "#1976d2", "#388e3c", "#d32f2f", "#7b1fa2", "#ff8f00", "#00838f", "#c2185b", "#616161"];
    return colors[num] || "#000";
}

function onCellClick(e) {
    if (gameOver) return;
    const r = parseInt(this.dataset.row);
    const c = parseInt(this.dataset.col);
    if (openMode) {
        if (flagged[r][c] || revealed[r][c]) return;
        if (minefield[r][c] === 'M') {
            revealed[r][c] = true;
            revealAllMines();
            renderGrid();
            message.textContent = "GAME OVER";
            gameOver = true;
        } else {
            revealCell(r, c);
            renderGrid();
            if (checkWin()) {
                message.textContent = "YOU WON!";
                gameOver = true;
            }
        }
    } else {
        if (revealed[r][c]) return;
        flagged[r][c] = !flagged[r][c];
        renderGrid();
        if (checkWin()) {
            message.textContent = "YOU WON!";
            gameOver = true;
        }
    }
}

function revealCell(r, c) {
    if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return;
    if (revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if (minefield[r][c] === 0) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr !== 0 || dc !== 0) {
                    revealCell(r + dr, c + dc);
                }
            }
        }
    }
}

function revealAllMines() {
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (minefield[r][c] === 'M') {
                revealed[r][c] = true;
            }
        }
    }
}

function checkWin() {
    let opened = 0;
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (revealed[r][c]) opened++;
        }
    }
    return opened === gridSize * gridSize - mineCount;
}

toggleBtn.addEventListener('click', function() {
    openMode = !openMode;
    toggleBtn.textContent = openMode ? "OPEN" : "FLAG";
});

startBtn.addEventListener('click', initGame);

// Start initial game
const instructions = document.getElementById('instructions');
const closeInstructionsBtn = document.getElementById('closeInstructions');
const openInstructionsBtn = document.getElementById('openInstructions');

closeInstructionsBtn.onclick = function() {
    instructions.classList.add('collapsed');
    setTimeout(() => {
        instructions.style.display = 'none';
        openInstructionsBtn.style.display = 'flex';
        initGame(); // Start the game after closing instructions
    }, 300); // Match the CSS transition duration
};

openInstructionsBtn.onclick = function() {
    instructions.style.display = 'flex';
    setTimeout(() => {
        instructions.classList.remove('collapsed');
    }, 10); // Allow display to apply before removing class
    openInstructionsBtn.style.display = 'none';
};



