/* ============================================================================
   LUDO ROYAL 3D - COMPLETE OFFLINE ENGINE (LOCAL + SMART COMPUTER AI)
   ============================================================================ */

// 1. Inject Extra 3D Board & Token CSS Automatically
const extraStyles = `
.cell {
    border: 0.5px solid #ccc;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
}
.cell.red-path { background: #ea161f; }
.cell.green-path { background: #049c34; }
.cell.blue-path { background: #0095db; }
.cell.yellow-path { background: #f6d002; }

.cell.safe-star::after {
    content: '☆';
    font-size: 16px;
    color: rgba(0,0,0,0.45);
    font-weight: bold;
    position: absolute;
}
.cell.red-start { background: #ea161f; }
.cell.green-start { background: #049c34; }
.cell.blue-start { background: #0095db; }
.cell.yellow-start { background: #f6d002; }
.cell.red-start::after, .cell.green-start::after, .cell.blue-start::after, .cell.yellow-start::after {
    content: '★';
    color: #fff;
    font-size: 15px;
}

/* 4 Player Corner Bases */
.base-box {
    grid-row: span 6;
    grid-column: span 6;
    padding: 14%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #222;
}
.base-red { grid-area: 1 / 1 / 7 / 7; background: #ea161f; }
.base-green { grid-area: 1 / 10 / 7 / 16; background: #049c34; }
.base-blue { grid-area: 10 / 1 / 16 / 7; background: #0095db; }
.base-yellow { grid-area: 10 / 10 / 16 / 16; background: #f6d002; }

.base-inner {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 12px;
    border: 2px solid rgba(0,0,0,0.25);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    padding: 8px;
    box-shadow: inset 0 3px 8px rgba(0,0,0,0.25);
}
.base-spot {
    width: 68%;
    height: 68%;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 3px 5px rgba(0,0,0,0.35);
}
.base-red .base-spot { background: #ea161f; }
.base-green .base-spot { background: #049c34; }
.base-blue .base-spot { background: #0095db; }
.base-yellow .base-spot { background: #f6d002; }

/* Center Home Triangle */
.center-home {
    grid-area: 7 / 7 / 10 / 10;
    background: conic-gradient(
        from -45deg,
        #049c34 0deg 90deg,
        #f6d002 90deg 180deg,
        #0095db 180deg 270deg,
        #ea161f 270deg 360deg
    );
    border: 2px solid #222;
    position: relative;
    box-shadow: inset 0 0 12px rgba(0,0,0,0.5);
}

/* 3D Tokens (Gotiyan) */
.token-3d {
    width: 22px;
    height: 22px;
    border-radius: 50% 50% 50% 10%;
    transform: rotate(-45deg) translateY(-4px);
    position: absolute;
    z-index: 20;
    border: 2px solid #fff;
    box-shadow: -3px 4px 6px rgba(0,0,0,0.65), inset 0 2px 4px rgba(255,255,255,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.token-3d span {
    transform: rotate(45deg);
    font-size: 11px;
    pointer-events: none;
}
.token-3d.red { background: radial-gradient(circle at 30% 30%, #ff6b6b, #b80008); }
.token-3d.green { background: radial-gradient(circle at 30% 30%, #4eff7a, #006b20); }
.token-3d.blue { background: radial-gradient(circle at 30% 30%, #5ce1ff, #005f8c); }
.token-3d.yellow { background: radial-gradient(circle at 30% 30%, #fff36b, #c79a00); }

/* Movable Token Highlight Ring (Like Video) */
.token-3d.movable {
    z-index: 35;
    animation: pulseToken 0.7s infinite alternate ease-in-out;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.9), 0 0 12px #ffd700;
}
@keyframes pulseToken {
    0% { transform: rotate(-45deg) translateY(-4px) scale(1); }
    100% { transform: rotate(-45deg) translateY(-9px) scale(1.22); }
}

.token-3d.jumping {
    animation: hopStep 0.16s ease-out;
}
@keyframes hopStep {
    0% { transform: rotate(-45deg) translateY(-4px) scale(1); }
    50% { transform: rotate(-45deg) translateY(-16px) scale(1.35); }
    100% { transform: rotate(-45deg) translateY(-4px) scale(1); }
}

/* Realistic Dice Face Dots */
.dice-face {
    width: 36px;
    height: 36px;
    background: linear-gradient(145deg, #ffffff, #dcdcdc);
    border-radius: 7px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 2px #fff;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 4px;
    place-items: center;
}
.pip {
    width: 6px;
    height: 6px;
    background: #111;
    border-radius: 50%;
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.6);
}
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = extraStyles;
document.head.appendChild(styleSheet);

// ============================================================================
// 2. SOUND SYNTHESIZER (No external MP3 required!)
// ============================================================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playSound(type) {
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;
        if (type === 'dice') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(520, now + 0.09);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'step') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(420, now);
            osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'cut') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(500, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
            gain.gain.setValueAtTime(0.35, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'win') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(554, now + 0.12);
            osc.frequency.setValueAtTime(659, now + 0.24);
            gain.gain.setValueAtTime(0.35, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        }
    } catch (e) {}
}

// ============================================================================
// 3. BOARD COORDINATES & CONSTANTS
// ============================================================================
const MAIN_TRACK = [
    [6,0],[6,1],[6,2],[6,3],[6,4],[6,5],
    [5,6],[4,6],[3,6],[2,6],[1,6],[0,6],
    [0,7],
    [0,8],[1,8],[2,8],[3,8],[4,8],[5,8],
    [6,9],[6,10],[6,11],[6,12],[6,13],[6,14],
    [7,14],
    [8,14],[8,13],[8,12],[8,11],[8,10],[8,9],
    [9,8],[10,8],[11,8],[12,8],[13,8],[14,8],
    [14,7],
    [14,6],[13,6],[12,6],[11,6],[10,6],[9,6],
    [8,5],[8,4],[8,3],[8,2],[8,1],[8,0],
    [7,0]
];

const START_INDEX = { red: 1, green: 14, yellow: 27, blue: 40 };
const SAFE_INDICES = [1, 8, 14, 21, 27, 34, 40, 47];

const HOME_PATHS = {
    red:    [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
    green:  [[1,7],[2,7],[3,7],[4,7],[5,7],[6,7]],
    yellow: [[7,13],[7,12],[7,11],[7,10],[7,9],[7,8]],
    blue:   [[13,7],[12,7],[11,7],[10,7],[9,7],[8,7]]
};

const TOKEN_ICONS = {
    pin: '',
    star: '⭐',
    hammer: '🔨',
    crown: '👑',
    rocket: '🚀'
};

// ============================================================================
// 4. GAME STATE
// ============================================================================
let state = {
    selectedToken: 'pin',
    gameMode: 'local', // 'local' or 'computer'
    playerCount: 2,
    activeColors: ['blue', 'green'],
    turnIndex: 0,
    diceValue: 1,
    diceRolled: false,
    isAnimating: false,
    tokens: {} // { blue: [-1, -1, -1, -1], ... }
};

// ============================================================================
// 5. MENU & SETUP EVENT LISTENERS
// ============================================================================
document.querySelectorAll('.token-option').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelectorAll('.token-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        state.selectedToken = opt.dataset.token;
        playSound('step');
    });
});

document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.gameMode = card.dataset.mode;
        playSound('step');
    });
});

document.getElementById('btn-to-setup').addEventListener('click', () => {
    playSound('step');
    showScreen('setup-screen');
    updateSetupRows();
});

document.getElementById('btn-back-menu').addEventListener('click', () => {
    playSound('step');
    showScreen('menu-screen');
});

document.getElementById('btn-leave-game').addEventListener('click', () => {
    if (confirm('Leave current game and return to menu?')) {
        showScreen('menu-screen');
    }
});

document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.playerCount = parseInt(btn.dataset.count);
        updateSetupRows();
        playSound('step');
    });
});

function updateSetupRows() {
    const order = {
        2: ['blue', 'green'],
        3: ['blue', 'red', 'green'],
        4: ['blue', 'red', 'green', 'yellow']
    }[state.playerCount];

    state.activeColors = order;
    document.querySelectorAll('.player-row').forEach(row => {
        const c = row.dataset.color;
        if (order.includes(c)) {
            row.classList.remove('hidden');
            const input = row.querySelector('input');
            if (state.gameMode === 'computer' && c !== 'blue') {
                input.value = `Computer (${c.toUpperCase()})`;
            } else if (input.value.startsWith('Computer')) {
                input.value = `Player`;
            }
        } else {
            row.classList.add('hidden');
        }
    });
}

document.getElementById('btn-play-normal').addEventListener('click', () => startGame(false));
document.getElementById('btn-play-quick').addEventListener('click', () => startGame(true));

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ============================================================================
// 6. BOARD GENERATION & INITIALIZATION
// ============================================================================
function buildBoardDOM() {
    const board = document.getElementById('ludo-board');
    board.innerHTML = '';

    // Create 4 Corner Bases
    ['red', 'green', 'blue', 'yellow'].forEach(color => {
        const base = document.createElement('div');
        base.className = `base-box base-${color}`;
        const inner = document.createElement('div');
        inner.className = 'base-inner';
        for (let i = 0; i < 4; i++) {
            const spot = document.createElement('div');
            spot.className = 'base-spot';
            spot.id = `base-${color}-${i}`;
            inner.appendChild(spot);
        }
        base.appendChild(inner);
        board.appendChild(base);
    });

    // Center Home Triangle
    const center = document.createElement('div');
    center.className = 'center-home';
    board.appendChild(center);

    // Create Track & Home Path Cells
    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 15; c++) {
            const inBase = (r < 6 && c < 6) || (r < 6 && c > 8) || (r > 8 && c < 6) || (r > 8 && c > 8);
            const inCenter = (r >= 6 && r <= 8 && c >= 6 && c <= 8);
            if (inBase || inCenter) continue;

            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${r}-${c}`;
            cell.style.gridRow = r + 1;
            cell.style.gridColumn = c + 1;

            // Color Home Paths
            if (r === 7 && c >= 1 && c <= 5) cell.classList.add('red-path');
            if (c === 7 && r >= 1 && r <= 5) cell.classList.add('green-path');
            if (r === 7 && c >= 9 && c <= 13) cell.classList.add('yellow-path');
            if (c === 7 && r >= 9 && r <= 13) cell.classList.add('blue-path');

            // Start & Star Safe Cells
            const trackIdx = MAIN_TRACK.findIndex(([tr, tc]) => tr === r && tc === c);
            if (trackIdx === 1) cell.classList.add('red-start');
            else if (trackIdx === 14) cell.classList.add('green-start');
            else if (trackIdx === 27) cell.classList.add('yellow-start');
            else if (trackIdx === 40) cell.classList.add('blue-start');
            else if (SAFE_INDICES.includes(trackIdx)) cell.classList.add('safe-star');

            board.appendChild(cell);
        }
    }
}

function startGame(oneTokenOut) {
    playSound('win');
    buildBoardDOM();

    // Initialize Tokens (-1 = inside base, 0 = start square)
    state.tokens = {};
    ['blue', 'red', 'green', 'yellow'].forEach(color => {
        if (state.activeColors.includes(color)) {
            state.tokens[color] = oneTokenOut ? [0, -1, -1, -1] : [-1, -1, -1, -1];
        }
    });

    // Configure HUDs
    ['blue', 'red', 'green', 'yellow'].forEach(color => {
        const hud = document.getElementById(`hud-${color}`);
        const nameInput = document.getElementById(`name-${color}`);
        hud.querySelector('.hud-name').innerText = nameInput ? nameInput.value : color.toUpperCase();
        if (state.activeColors.includes(color)) {
            hud.classList.remove('inactive');
        } else {
            hud.classList.add('inactive');
        }
        renderDiceFace(color, 1);
    });

    state.turnIndex = 0;
    state.diceRolled = false;
    state.isAnimating = false;

    showScreen('game-screen');
    renderAllTokens();
    updateTurnHUD();
}

// ============================================================================
// 7. RENDER DICE & 3D TOKENS
// ============================================================================
function renderDiceFace(color, val) {
    const container = document.getElementById(`dice-${color}`);
    const pipPositions = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
    }[val] || [4];

    let html = `<div class="dice-face">`;
    for (let i = 0; i < 9; i++) {
        html += pipPositions.includes(i) ? `<span class="pip"></span>` : `<span></span>`;
    }
    html += `</div>`;
    container.innerHTML = html;
}

function getTokenContainer(color, step, tokenIdx) {
    if (step === -1) {
        return document.getElementById(`base-${color}-${tokenIdx}`);
    }
    if (step >= 0 && step <= 50) {
        const globalIdx = (START_INDEX[color] + step) % 52;
        const [r, c] = MAIN_TRACK[globalIdx];
        return document.getElementById(`cell-${r}-${c}`);
    }
    if (step >= 51 && step <= 55) {
        const [r, c] = HOME_PATHS[color][step - 51];
        return document.getElementById(`cell-${r}-${c}`);
    }
    // Step 56 = Finished inside Center Home
    return document.querySelector('.center-home');
}

function renderAllTokens(movableIndices = []) {
    document.querySelectorAll('.token-3d').forEach(t => t.remove());
    const currentTurnColor = state.activeColors[state.turnIndex];

    state.activeColors.forEach(color => {
        state.tokens[color].forEach((step, idx) => {
            const parent = getTokenContainer(color, step, idx);
            if (!parent) return;

            const token = document.createElement('div');
            token.className = `token-3d ${color}`;
            token.id = `token-${color}-${idx}`;
            token.innerHTML = `<span>${TOKEN_ICONS[state.selectedToken]}</span>`;

            // Offset slightly if multiple tokens share the same cell
            const existing = parent.querySelectorAll('.token-3d').length;
            if (existing > 0 && step !== -1) {
                token.style.marginLeft = `${(existing * 4) - 4}px`;
                token.style.marginTop = `${(existing * 3) - 3}px`;
            }

            if (color === currentTurnColor && movableIndices.includes(idx)) {
                token.classList.add('movable');
                token.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleTokenClick(color, idx);
                });
            }

            parent.appendChild(token);
        });
    });
}

// ============================================================================
// 8. TURN & DICE ROLL LOGIC
// ============================================================================
function updateTurnHUD() {
    const currentColor = state.activeColors[state.turnIndex];
    document.querySelectorAll('.player-hud').forEach(h => h.classList.remove('active-turn'));
    document.getElementById(`hud-${currentColor}`).classList.add('active-turn');

    // Check if current player is Computer AI
    if (state.gameMode === 'computer' && currentColor !== 'blue') {
        setTimeout(() => rollDice(currentColor), 750);
    }
}

document.querySelectorAll('.dice-box').forEach(box => {
    box.addEventListener('click', () => {
        const color = box.dataset.player;
        const currentColor = state.activeColors[state.turnIndex];
        if (color !== currentColor || state.diceRolled || state.isAnimating) return;
        if (state.gameMode === 'computer' && color !== 'blue') return;
        rollDice(color);
    });
});

function rollDice(color) {
    state.diceRolled = true;
    state.isAnimating = true;
    const diceEl = document.getElementById(`dice-${color}`);
    diceEl.classList.add('dice-rolling');
    playSound('dice');

    setTimeout(() => {
        diceEl.classList.remove('dice-rolling');
        // Slight boost for 6 if all tokens are locked so game feels fast & fun like Ludo King
        const allLocked = state.tokens[color].every(s => s === -1);
        const roll = (allLocked && Math.random() < 0.38) ? 6 : Math.floor(Math.random() * 6) + 1;
        state.diceValue = roll;
        renderDiceFace(color, roll);

        const movable = getMovableTokens(color, roll);
        if (movable.length === 0) {
            setTimeout(nextTurn, 700);
        } else if (movable.length === 1 || (state.gameMode === 'computer' && color !== 'blue')) {
            // Auto-move if only 1 valid move OR if Computer's turn
            const chosenIdx = chooseBestMoveAI(color, movable, roll);
            setTimeout(() => moveTokenStepByStep(color, chosenIdx, roll), 350);
        } else {
            state.isAnimating = false;
            renderAllTokens(movable);
        }
    }, 450);
}

function getMovableTokens(color, roll) {
    const list = [];
    state.tokens[color].forEach((step, idx) => {
        if (step === -1 && roll === 6) list.push(idx);
        else if (step >= 0 && step + roll <= 56) list.push(idx);
    });
    return list;
}

function handleTokenClick(color, idx) {
    if (state.isAnimating) return;
    state.isAnimating = true;
    moveTokenStepByStep(color, idx, state.diceValue);
}

// ============================================================================
// 9. STEP-BY-STEP JUMPING ANIMATION & CAPTURE LOGIC
// ============================================================================
async function moveTokenStepByStep(color, idx, roll) {
    let currentStep = state.tokens[color][idx];

    if (currentStep === -1 && roll === 6) {
        // Bring token out of base
        state.tokens[color][idx] = 0;
        playSound('step');
        renderAllTokens();
        await sleep(250);
        finishMove(color, idx, true);
        return;
    }

    // Hop cell by cell
    for (let s = 0; s < roll; s++) {
        state.tokens[color][idx]++;
        playSound('step');
        renderAllTokens();
        const tokEl = document.getElementById(`token-${color}-${idx}`);
        if (tokEl) tokEl.classList.add('jumping');
        await sleep(170);
    }

    finishMove(color, idx, false);
}

function finishMove(color, idx, cameOutOfBase) {
    const landedStep = state.tokens[color][idx];
    let bonusTurn = (state.diceValue === 6) || (landedStep === 56);

    // Check Capture on Main Track (0..50)
    if (!cameOutOfBase && landedStep >= 0 && landedStep <= 50) {
        const myGlobal = (START_INDEX[color] + landedStep) % 52;
        if (!SAFE_INDICES.includes(myGlobal)) {
            state.activeColors.forEach(oppColor => {
                if (oppColor === color) return;
                state.tokens[oppColor].forEach((oppStep, oppIdx) => {
                    if (oppStep >= 0 && oppStep <= 50) {
                        const oppGlobal = (START_INDEX[oppColor] + oppStep) % 52;
                        if (oppGlobal === myGlobal) {
                            // Cut Opponent Token!
                            state.tokens[oppColor][oppIdx] = -1;
                            bonusTurn = true;
                            playSound('cut');
                        }
                    }
                });
            });
        }
    }

    renderAllTokens();

    // Check Win Condition
    if (state.tokens[color].every(s => s === 56)) {
        playSound('win');
        setTimeout(() => {
            alert(`🏆 ${color.toUpperCase()} WINS THE MATCH! 🎉`);
            showScreen('menu-screen');
        }, 300);
        return;
    }

    if (bonusTurn) {
        state.diceRolled = false;
        state.isAnimating = false;
        updateTurnHUD();
    } else {
        setTimeout(nextTurn, 400);
    }
}

function nextTurn() {
    state.turnIndex = (state.turnIndex + 1) % state.activeColors.length;
    state.diceRolled = false;
    state.isAnimating = false;
    renderAllTokens();
    updateTurnHUD();
}

// ============================================================================
// 10. SMART COMPUTER AI DECISION ENGINE
// ============================================================================
function chooseBestMoveAI(color, movableIndices, roll) {
    let bestIdx = movableIndices[0];
    let bestScore = -999;

    movableIndices.forEach(idx => {
        const cur = state.tokens[color][idx];
        let score = 0;

        if (cur === -1 && roll === 6) {
            score = 80; // High priority to open a token
        } else {
            const target = cur + roll;
            if (target === 56) score += 120; // Entering Home!
            if (target <= 50) {
                const targetGlobal = (START_INDEX[color] + target) % 52;
                if (SAFE_INDICES.includes(targetGlobal)) score += 60; // Landing on Star

                // Check if AI can cut an opponent token
                state.activeColors.forEach(opp => {
                    if (opp === color) return;
                    state.tokens[opp].forEach(oppStep => {
                        if (oppStep >= 0 && oppStep <= 50) {
                            const oppGlobal = (START_INDEX[opp] + oppStep) % 52;
                            if (oppGlobal === targetGlobal && !SAFE_INDICES.includes(targetGlobal)) {
                                score += 150; // Huge priority to cut opponent!
                            }
                        }
                    });
                });
            }
            score += cur; // Prefer advancing leading tokens
        }

        if (score > bestScore) {
            bestScore = score;
            bestIdx = idx;
        }
    });

    return bestIdx;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
