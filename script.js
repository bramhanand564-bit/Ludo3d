/* ============================================================================
   LUDO KING 3D CLONE - ORIGINAL PIN TOKENS, 3D DICE & WINNING PROBABILITY ENGINE
   ============================================================================ */

// 1. Inject Board, Original Ludo King Upright Pin & 3D Tumbling Dice Styles
const boardStyles = `
.cell {
    border: 0.5px solid #222;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
}
.cell.red-path { background: #e31019; }
.cell.green-path { background: #00992f; }
.cell.blue-path { background: #009be2; }
.cell.yellow-path { background: #ffe000; }

/* Hollow Star on Star Squares (Exact Ludo King style) */
.cell.safe-star::after {
    content: '☆';
    font-size: 18px;
    color: #444;
    line-height: 1;
    position: absolute;
    pointer-events: none;
}

/* Entrance Arrows */
.cell.arrow-red::after    { content: '→'; color: #e31019; font-weight: 900; font-size: 14px; }
.cell.arrow-green::after  { content: '↓'; color: #00992f; font-weight: 900; font-size: 14px; }
.cell.arrow-yellow::after { content: '←'; color: #d6b800; font-weight: 900; font-size: 14px; }
.cell.arrow-blue::after   { content: '↑'; color: #009be2; font-weight: 900; font-size: 14px; }

/* 4 Player Corner Bases */
.base-box {
    grid-row: span 6;
    grid-column: span 6;
    padding: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #111;
    position: relative;
}
.base-red    { grid-area: 1 / 1 / 7 / 7; background: #e31019; }
.base-green  { grid-area: 1 / 10 / 7 / 16; background: #00992f; }
.base-blue   { grid-area: 10 / 1 / 16 / 7; background: #009be2; }
.base-yellow { grid-area: 10 / 10 / 16 / 16; background: #ffe000; }

.base-label {
    position: absolute;
    bottom: 2px;
    font-size: 11px;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 1px 3px rgba(0,0,0,0.8);
}
.base-green .base-label, .base-red .base-label {
    top: 2px;
    bottom: auto;
    transform: rotate(180deg);
}

.base-inner {
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1.5px solid #222;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    padding: 8px;
}
.base-spot {
    width: 66%;
    height: 66%;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.base-red .base-spot    { background: #e31019; }
.base-green .base-spot  { background: #00992f; }
.base-blue .base-spot   { background: #009be2; }
.base-yellow .base-spot { background: #ffe000; }

/* Center Home Triangle */
.center-home {
    grid-area: 7 / 7 / 10 / 10;
    background: conic-gradient(
        from -45deg,
        #00992f 0deg 90deg,
        #ffe000 90deg 180deg,
        #009be2 180deg 270deg,
        #e31019 270deg 360deg
    );
    border: 1.5px solid #111;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

/* ORIGINAL LUDO KING UPRIGHT PIN TOKEN */
.ludo-token {
    width: 26px;
    height: 32px;
    position: absolute;
    bottom: 15%;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    filter: drop-shadow(0 3px 3px rgba(0,0,0,0.65));
    transition: transform 0.14s ease;
}
.ludo-token svg {
    width: 100%;
    height: 100%;
    overflow: visible;
}
.ludo-token .token-extra-icon {
    position: absolute;
    top: 4px;
    font-size: 10px;
    pointer-events: none;
}

/* Rotating Dashed Ring Under Movable Token (Like Video 00:20) */
.ludo-token.movable {
    z-index: 40;
}
.ludo-token.movable::before {
    content: '';
    position: absolute;
    bottom: -4px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2.5px dashed #111;
    box-shadow: 0 0 0 2px #fff;
    animation: spinRing 1.8s infinite linear;
    z-index: -1;
}
@keyframes spinRing {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.12); }
    100% { transform: rotate(360deg) scale(1); }
}

.ludo-token.jumping {
    animation: tokenHop 0.15s ease-out;
}
@keyframes tokenHop {
    0%   { transform: translateY(0) scale(1); }
    50%  { transform: translateY(-14px) scale(1.25); }
    100% { transform: translateY(0) scale(1); }
}

/* Realistic Ludo King 3D Dice Face & Pop-Out 3D Rolling Cube */
.dice-face {
    width: 38px;
    height: 38px;
    background: linear-gradient(145deg, #ffffff 0%, #cfd3d6 100%);
    border-radius: 7px;
    border: 1.5px solid #888;
    box-shadow: 0 2px 5px rgba(0,0,0,0.45), inset 0 1px 2px #fff;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 4px;
    place-items: center;
}
.pip {
    width: 6.5px;
    height: 6.5px;
    background: radial-gradient(circle at 35% 35%, #444, #000);
    border-radius: 50%;
}

/* Pop-out 3D Isometric Cube Animation when rolling */
.dice-3d-pop {
    animation: popCubeRoll 0.42s cubic-bezier(0.25, 1, 0.5, 1);
}
@keyframes popCubeRoll {
    0%   { transform: scale(1) rotate(0deg); }
    35%  { transform: scale(1.65) rotate(140deg) translateY(-6px); filter: drop-shadow(0 10px 8px rgba(0,0,0,0.6)); }
    70%  { transform: scale(1.5) rotate(290deg) translateY(-3px); }
    100% { transform: scale(1) rotate(360deg); }
}
`;
const st = document.createElement('style');
st.innerText = boardStyles;
document.head.appendChild(st);

// ============================================================================
// 2. ORIGINAL LUDO KING SVG PIN GENERATOR
// ============================================================================
const PIN_COLORS = {
    red:    { fill: '#e31019', dark: '#990006' },
    green:  { fill: '#00992f', dark: '#005c1b' },
    blue:   { fill: '#009be2', dark: '#005b87' },
    yellow: { fill: '#ffcc00', dark: '#b38f00' }
};

function getPinSVG(color, customIcon = '') {
    const c = PIN_COLORS[color];
    return `
    <svg viewBox="0 0 36 44">
        <!-- Base Circle Ring -->
        <ellipse cx="18" cy="38" rx="11" ry="4.5" fill="${c.dark}" stroke="#fff" stroke-width="1.5"/>
        <!-- Teardrop Pin Body (White Stroke + Colored Inner) -->
        <path d="M18 2 C9 2 3 9 3 17.5 C3 26.5 15 37 18 39.5 C21 37 33 26.5 33 17.5 C33 9 27 2 18 2 Z"
              fill="#ffffff" stroke="#222" stroke-width="1.2"/>
        <path d="M18 4.8 C10.8 4.8 5.8 10.5 5.8 17.5 C5.8 24.5 15.2 33.2 18 35.8 C20.8 33.2 30.2 24.5 30.2 17.5 C30.2 10.5 25.2 4.8 18 4.8 Z"
              fill="${c.fill}"/>
        <!-- Glossy Top Inner Circle (Like Ludo King Pin) -->
        <ellipse cx="18" cy="14.5" rx="6.5" ry="5.5" fill="rgba(255,255,255,0.68)"/>
    </svg>
    ${customIcon ? `<span class="token-extra-icon">${customIcon}</span>` : ''}
    `;
}

// ============================================================================
// 3. REALISTIC LUDO KING SOUND SYNTHESIZER
// ============================================================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playSound(type) {
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const now = audioCtx.currentTime;

        if (type === 'dice') {
            // Multi-clack realistic dice rattle sound
            [0, 0.06, 0.12, 0.19, 0.26].forEach(offset => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(180 + Math.random() * 220, now + offset);
                gain.gain.setValueAtTime(0.18, now + offset);
                gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.045);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + offset);
                osc.stop(now + offset + 0.05);
            });
        } else if (type === 'step') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(340, now);
            osc.frequency.exponentialRampToValueAtTime(620, now + 0.08);
            gain.gain.setValueAtTime(0.32, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.085);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.09);
        } else if (type === 'cut') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
            gain.gain.setValueAtTime(0.35, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.36);
        } else if (type === 'win') {
            [440, 554, 659, 880].forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.1);
                gain.gain.setValueAtTime(0.3, now + idx * 0.1);
                gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.1 + 0.22);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + idx * 0.1);
                osc.stop(now + idx * 0.1 + 0.23);
            });
        }
    } catch (e) {}
}

// ============================================================================
// 4. BOARD TRACK & CONSTANTS
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
const STAR_ONLY_INDICES = [8, 21, 34, 47];
const SAFE_INDICES = [1, 8, 14, 21, 27, 34, 40, 47];

const HOME_PATHS = {
    red:    [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
    green:  [[1,7],[2,7],[3,7],[4,7],[5,7],[6,7]],
    yellow: [[7,13],[7,12],[7,11],[7,10],[7,9],[7,8]],
    blue:   [[13,7],[12,7],[11,7],[10,7],[9,7],[8,7]]
};

const TOKEN_ICONS = { pin: '', star: '⭐', hammer: '🔨', crown: '👑', rocket: '🚀' };

// ============================================================================
// 5. GAME STATE & WINNING PROBABILITY SETTINGS
// ============================================================================
let savedProbs = JSON.parse(localStorage.getItem('ludo_win_probs')) || {
    blue: 50,
    red: 50,
    green: 50,
    yellow: 50
};

let state = {
    selectedToken: 'pin',
    gameMode: 'local',
    activeColors: ['blue', 'green'],
    turnIndex: 0,
    diceValue: 1,
    diceRolled: false,
    isAnimating: false,
    tokens: {},
    winProb: { ...savedProbs }
};

// ============================================================================
// 6. SETTINGS MODAL (WIN PROBABILITY) LOGIC
// ============================================================================
function syncProbabilityUI() {
    ['blue', 'red', 'green', 'yellow'].forEach(c => {
        const val = state.winProb[c];
        document.getElementById(`slider-${c}`).value = val;
        document.getElementById(`val-prob-${c}`).innerText = `${val}%`;
    });
}
syncProbabilityUI();

document.getElementById('btn-open-settings').addEventListener('click', () => {
    syncProbabilityUI();
    document.getElementById('settings-modal').classList.remove('hidden');
    playSound('step');
});

document.getElementById('btn-close-settings').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.add('hidden');
});

document.querySelectorAll('.prob-slider').forEach(slider => {
    slider.addEventListener('input', () => {
        const c = slider.dataset.color;
        state.winProb[c] = parseInt(slider.value);
        document.getElementById(`val-prob-${c}`).innerText = `${slider.value}%`;
    });
});

document.querySelectorAll('.preset-btns button').forEach(btn => {
    btn.addEventListener('click', () => {
        const c = btn.dataset.color;
        const val = parseInt(btn.dataset.val);
        state.winProb[c] = val;
        syncProbabilityUI();
        playSound('step');
    });
});

document.getElementById('btn-reset-prob').addEventListener('click', () => {
    state.winProb = { blue: 50, red: 50, green: 50, yellow: 50 };
    localStorage.setItem('ludo_win_probs', JSON.stringify(state.winProb));
    syncProbabilityUI();
    playSound('step');
});

document.getElementById('btn-save-prob').addEventListener('click', () => {
    localStorage.setItem('ludo_win_probs', JSON.stringify(state.winProb));
    document.getElementById('settings-modal').classList.add('hidden');
    playSound('win');
});

// ============================================================================
// 7. MENU & CUSTOM COLOR SELECTION LOGIC
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
});

document.getElementById('btn-back-menu').addEventListener('click', () => {
    playSound('step');
    showScreen('menu-screen');
});

// Allow clicking any color row checkbox to toggle custom color selection (e.g., Yellow vs Red!)
document.querySelectorAll('.row-check').forEach(chk => {
    chk.addEventListener('click', () => {
        const color = chk.dataset.color;
        const row = chk.closest('.player-row');
        if (chk.classList.contains('checked')) {
            // Ensure at least 2 colors stay selected
            const checkedCount = document.querySelectorAll('.row-check.checked').length;
            if (checkedCount <= 2) return;
            chk.classList.remove('checked');
            chk.innerText = '';
            row.classList.remove('selected-row');
        } else {
            chk.classList.add('checked');
            chk.innerText = '✔';
            row.classList.add('selected-row');
        }
        syncSelectedColors();
        playSound('step');
    });
});

function syncSelectedColors() {
    // Clockwise turn order: blue -> red -> green -> yellow
    const clockwise = ['blue', 'red', 'green', 'yellow'];
    const picked = [];
    clockwise.forEach(c => {
        const chk = document.querySelector(`.row-check[data-color="${c}"]`);
        if (chk && chk.classList.contains('checked')) picked.push(c);
    });
    state.activeColors = picked;

    document.querySelectorAll('.count-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.count) === picked.length);
    });
}

document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const count = parseInt(btn.dataset.count);
        const presets = {
            2: ['blue', 'green'],
            3: ['blue', 'red', 'green'],
            4: ['blue', 'red', 'green', 'yellow']
        }[count];

        document.querySelectorAll('.player-row').forEach(row => {
            const c = row.dataset.color;
            const chk = row.querySelector('.row-check');
            if (presets.includes(c)) {
                chk.classList.add('checked');
                chk.innerText = '✔';
                row.classList.add('selected-row');
            } else {
                chk.classList.remove('checked');
                chk.innerText = '';
                row.classList.remove('selected-row');
            }
        });
        syncSelectedColors();
        playSound('step');
    });
});

document.getElementById('btn-play-normal').addEventListener('click', () => startGame(false));
document.getElementById('btn-play-quick').addEventListener('click', () => {
    document.getElementById('quick-popup').classList.remove('hidden');
    playSound('step');
});
document.getElementById('btn-close-quick').addEventListener('click', () => {
    document.getElementById('quick-popup').classList.add('hidden');
});
document.getElementById('btn-confirm-quick').addEventListener('click', () => {
    document.getElementById('quick-popup').classList.add('hidden');
    startGame(true);
});

document.getElementById('btn-leave-game').addEventListener('click', () => {
    if (confirm('Return to Main Menu?')) showScreen('menu-screen');
});

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// ============================================================================
// 8. BUILD BOARD & START GAME
// ============================================================================
function buildBoardDOM() {
    const board = document.getElementById('ludo-board');
    board.innerHTML = '';

    // 4 Corner Bases
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

        if (state.activeColors.includes(color)) {
            const lbl = document.createElement('div');
            lbl.className = 'base-label';
            const inp = document.getElementById(`name-${color}`);
            lbl.innerText = inp ? inp.value : color.toUpperCase();
            base.appendChild(lbl);
        }

        board.appendChild(base);
    });

    // Center Home
    const center = document.createElement('div');
    center.className = 'center-home';
    board.appendChild(center);

    // 15x15 Cells
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

            // Home Stretch Colors
            if (r === 7 && c >= 1 && c <= 5) cell.classList.add('red-path');
            if (c === 7 && r >= 1 && r <= 5) cell.classList.add('green-path');
            if (r === 7 && c >= 9 && c <= 13) cell.classList.add('yellow-path');
            if (c === 7 && r >= 9 && r <= 13) cell.classList.add('blue-path');

            // Entrance Arrows (Exact Ludo King)
            if (r === 7 && c === 0)  cell.classList.add('arrow-red');
            if (r === 0 && c === 7)  cell.classList.add('arrow-green');
            if (r === 7 && c === 14) cell.classList.add('arrow-yellow');
            if (r === 14 && c === 7) cell.classList.add('arrow-blue');

            // Start Squares (Solid Color) & Star Squares (Hollow Star)
            const trackIdx = MAIN_TRACK.findIndex(([tr, tc]) => tr === r && tc === c);
            if (trackIdx === 1)       cell.classList.add('red-path');
            else if (trackIdx === 14) cell.classList.add('green-path');
            else if (trackIdx === 27) cell.classList.add('yellow-path');
            else if (trackIdx === 40) cell.classList.add('blue-path');
            else if (STAR_ONLY_INDICES.includes(trackIdx)) cell.classList.add('safe-star');

            board.appendChild(cell);
        }
    }
}

function startGame(oneTokenOut) {
    syncSelectedColors();
    buildBoardDOM();

    state.tokens = {};
    ['blue', 'red', 'green', 'yellow'].forEach(color => {
        const hud = document.getElementById(`hud-${color}`);
        document.getElementById(`hud-pin-${color}`).innerHTML = getPinSVG(color);

        if (state.activeColors.includes(color)) {
            state.tokens[color] = oneTokenOut ? [0, -1, -1, -1] : [-1, -1, -1, -1];
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
    playSound('win');
    renderAllTokens();
    updateTurnHUD();
}

// ============================================================================
// 9. RENDER DICE & UPRIGHT PIN TOKENS
// ============================================================================
function renderDiceFace(color, val) {
    const holder = document.getElementById(`dice-${color}`);
    const pips = {
        1: [4],
        2: [2, 6],
        3: [2, 4, 6],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
    }[val] || [4];

    let html = `<div class="dice-face">`;
    for (let i = 0; i < 9; i++) {
        html += pips.includes(i) ? `<span class="pip"></span>` : `<span></span>`;
    }
    html += `</div>`;
    holder.innerHTML = html;
}

function getTokenContainer(color, step, idx) {
    if (step === -1) return document.getElementById(`base-${color}-${idx}`);
    if (step >= 0 && step <= 50) {
        const globalIdx = (START_INDEX[color] + step) % 52;
        const [r, c] = MAIN_TRACK[globalIdx];
        return document.getElementById(`cell-${r}-${c}`);
    }
    if (step >= 51 && step <= 55) {
        const [r, c] = HOME_PATHS[color][step - 51];
        return document.getElementById(`cell-${r}-${c}`);
    }
    return document.querySelector('.center-home');
}

function renderAllTokens(movableIndices = []) {
    document.querySelectorAll('.ludo-token').forEach(t => t.remove());
    const currentTurnColor = state.activeColors[state.turnIndex];

    state.activeColors.forEach(color => {
        state.tokens[color].forEach((step, idx) => {
            const parent = getTokenContainer(color, step, idx);
            if (!parent) return;

            const tok = document.createElement('div');
            tok.className = `ludo-token`;
            tok.id = `token-${color}-${idx}`;
            tok.innerHTML = getPinSVG(color, TOKEN_ICONS[state.selectedToken]);

            // Stack multiple tokens neatly on same cell
            const existing = parent.querySelectorAll('.ludo-token').length;
            if (existing > 0 && step !== -1) {
                tok.style.transform = `translate(${(existing * 4) - 4}px, ${(existing * -2)}px) scale(0.9)`;
            }

            if (color === currentTurnColor && movableIndices.includes(idx)) {
                tok.classList.add('movable');
                tok.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleTokenClick(color, idx);
                });
            }
            parent.appendChild(tok);
        });
    });
}

// ============================================================================
// 10. SMART WINNING PROBABILITY DICE ENGINE (RIGGED LUCK CONTROLLER)
// ============================================================================
function getProbabilityControlledRoll(color) {
    const myProb = state.winProb[color] ?? 50;
    const oppColors = state.activeColors.filter(c => c !== color);
    const maxOppProb = Math.max(...oppColors.map(c => state.winProb[c] ?? 50));

    // Calculate relative dominance (-100 to +100)
    // Example: Yellow (50%) vs Green (10%) => diff = +40 (Yellow strongly favored!)
    // Example: Blue (100%) vs Yellow (10%) => diff = +90 (Blue guaranteed to dominate!)
    const diff = myProb - maxOppProb;

    // Score each dice face (1..6) for how good or bad it is for `color`
    let rollScores = [];
    for (let d = 1; d <= 6; d++) {
        let bestMoveUtility = -50;
        const movable = getMovableTokens(color, d);

        if (movable.length === 0) {
            bestMoveUtility = -20; // Wasted turn
        } else {
            movable.forEach(idx => {
                const cur = state.tokens[color][idx];
                let u = 0;

                if (cur === -1 && d === 6) {
                    u += 75; // Opening a locked token
                } else if (cur >= 0) {
                    const target = cur + d;
                    if (target === 56) u += 130; // Direct Home entry!
                    else if (target >= 51) u += 65; // Entering safe home path

                    if (target <= 50) {
                        const targetGlobal = (START_INDEX[color] + target) % 52;
                        if (SAFE_INDICES.includes(targetGlobal)) u += 45;

                        // Check if this roll cuts an opponent token!
                        oppColors.forEach(opp => {
                            state.tokens[opp].forEach(oppStep => {
                                if (oppStep >= 0 && oppStep <= 50) {
                                    const oppGlobal = (START_INDEX[opp] + oppStep) % 52;
                                    if (oppGlobal === targetGlobal && !SAFE_INDICES.includes(targetGlobal)) {
                                        // Cutting higher-prob opponent is penalized if myProb < oppProb!
                                        const oppP = state.winProb[opp] ?? 50;
                                        if (myProb >= oppP) {
                                            u += 160; // Favored player loves cutting!
                                        } else {
                                            u -= 250; // Low-prob player is blocked from cutting favored player!
                                        }
                                    }
                                }
                            });
                        });

                        // Check if landing square is in danger (1..6 steps ahead of opponent)
                        if (!SAFE_INDICES.includes(targetGlobal)) {
                            oppColors.forEach(opp => {
                                state.tokens[opp].forEach(oppStep => {
                                    if (oppStep >= 0 && oppStep <= 50) {
                                        const oppGlobal = (START_INDEX[opp] + oppStep) % 52;
                                        const dist = (targetGlobal - oppGlobal + 52) % 52;
                                        if (dist >= 1 && dist <= 6) {
                                            u -= 40; // Dangerous spot!
                                        }
                                    }
                                });
                            });
                        }
                    }
                }
                if (u > bestMoveUtility) bestMoveUtility = u;
            });
        }
        rollScores.push({ dice: d, utility: bestMoveUtility });
    }

    // Sort rolls from best utility to worst utility
    rollScores.sort((a, b) => b.utility - a.utility);

    // Case 1: Current color has HIGHER probability than opponents (or myProb >= 75)
    if (diff > 5 || myProb >= 75) {
        // Strength of luck bias (0.0 to 0.96)
        const luckBias = Math.min(0.96, Math.max(myProb / 100, (diff + 40) / 100));
        if (Math.random() < luckBias) {
            // Pick from the top 1 or 2 most beneficial dice rolls!
            return Math.random() < 0.78 ? rollScores[0].dice : rollScores[1].dice;
        }
    }

    // Case 2: Current color has LOWER probability than opponents (e.g., 10% vs 50% or 100%)
    if (diff < -5 || myProb <= 25) {
        const unluckBias = Math.min(0.95, Math.abs(diff) / 80 + (50 - myProb) / 100);
        if (Math.random() < unluckBias) {
            // Force a non-cutting, low-utility roll (bottom 2 rolls)
            const worst = rollScores[rollScores.length - 1];
            const secondWorst = rollScores[rollScores.length - 2];
            return Math.random() < 0.65 ? worst.dice : secondWorst.dice;
        }
    }

    // Default fair roll when probabilities are equal (e.g. 50% vs 50%)
    const allLocked = state.tokens[color].every(s => s === -1);
    if (allLocked && Math.random() < 0.32) return 6;
    return Math.floor(Math.random() * 6) + 1;
}

// ============================================================================
// 11. TURN, 3D DICE ROLL & TOKEN MOVEMENT
// ============================================================================
function updateTurnHUD() {
    const currentColor = state.activeColors[state.turnIndex];
    document.querySelectorAll('.player-hud').forEach(h => h.classList.remove('active-turn'));
    document.querySelectorAll('.turn-arrow').forEach(a => a.classList.remove('active'));

    document.getElementById(`hud-${currentColor}`).classList.add('active-turn');
    document.getElementById(`arrow-${currentColor}`).classList.add('active');

    // If vs Computer and not First Player's turn
    const humanColor = state.activeColors[0];
    if (state.gameMode === 'computer' && currentColor !== humanColor) {
        setTimeout(() => rollDice(currentColor), 650);
    }
}

document.querySelectorAll('.dice-box').forEach(box => {
    box.addEventListener('click', () => {
        const color = box.dataset.player;
        const currentColor = state.activeColors[state.turnIndex];
        if (color !== currentColor || state.diceRolled || state.isAnimating) return;
        if (state.gameMode === 'computer' && color !== state.activeColors[0]) return;
        rollDice(color);
    });
});

function rollDice(color) {
    state.diceRolled = true;
    state.isAnimating = true;
    document.getElementById(`arrow-${color}`).classList.remove('active');

    const holder = document.getElementById(`dice-${color}`);
    holder.classList.remove('dice-3d-pop');
    void holder.offsetWidth; // trigger reflow
    holder.classList.add('dice-3d-pop');
    playSound('dice');

    // Flicker intermediate faces during 3D pop roll
    let ticks = 0;
    const flicker = setInterval(() => {
        renderDiceFace(color, Math.floor(Math.random() * 6) + 1);
        ticks++;
        if (ticks >= 5) clearInterval(flicker);
    }, 65);

    setTimeout(() => {
        clearInterval(flicker);
        const roll = getProbabilityControlledRoll(color);
        state.diceValue = roll;
        renderDiceFace(color, roll);

        const movable = getMovableTokens(color, roll);
        const isAI = (state.gameMode === 'computer' && color !== state.activeColors[0]);

        if (movable.length === 0) {
            setTimeout(nextTurn, 650);
        } else if (movable.length === 1 || isAI) {
            const chosenIdx = chooseBestTokenToMove(color, movable, roll);
            setTimeout(() => moveTokenStepByStep(color, chosenIdx, roll), 320);
        } else {
            state.isAnimating = false;
            renderAllTokens(movable);
        }
    }, 430);
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

async function moveTokenStepByStep(color, idx, roll) {
    let cur = state.tokens[color][idx];

    if (cur === -1 && roll === 6) {
        state.tokens[color][idx] = 0;
        playSound('step');
        renderAllTokens();
        await sleep(220);
        finishMove(color, idx, true);
        return;
    }

    for (let s = 0; s < roll; s++) {
        state.tokens[color][idx]++;
        playSound('step');
        renderAllTokens();
        const tokEl = document.getElementById(`token-${color}-${idx}`);
        if (tokEl) tokEl.classList.add('jumping');
        await sleep(165);
    }

    finishMove(color, idx, false);
}

function finishMove(color, idx, cameOutOfBase) {
    const landedStep = state.tokens[color][idx];
    let bonusTurn = (state.diceValue === 6) || (landedStep === 56);

    if (!cameOutOfBase && landedStep >= 0 && landedStep <= 50) {
        const myGlobal = (START_INDEX[color] + landedStep) % 52;
        if (!SAFE_INDICES.includes(myGlobal)) {
            state.activeColors.forEach(oppColor => {
                if (oppColor === color) return;
                state.tokens[oppColor].forEach((oppStep, oppIdx) => {
                    if (oppStep >= 0 && oppStep <= 50) {
                        const oppGlobal = (START_INDEX[oppColor] + oppStep) % 52;
                        if (oppGlobal === myGlobal) {
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

    if (state.tokens[color].every(s => s === 56)) {
        playSound('win');
        setTimeout(() => {
            alert(`🏆 ${color.toUpperCase()} WINS THE GAME! 🎉`);
            showScreen('menu-screen');
        }, 300);
        return;
    }

    if (bonusTurn) {
        state.diceRolled = false;
        state.isAnimating = false;
        updateTurnHUD();
    } else {
        setTimeout(nextTurn, 380);
    }
}

function nextTurn() {
    state.turnIndex = (state.turnIndex + 1) % state.activeColors.length;
    state.diceRolled = false;
    state.isAnimating = false;
    renderAllTokens();
    updateTurnHUD();
}

function chooseBestTokenToMove(color, movableIndices, roll) {
    let bestIdx = movableIndices[0];
    let bestScore = -999;

    movableIndices.forEach(idx => {
        const cur = state.tokens[color][idx];
        let score = 0;
        if (cur === -1 && roll === 6) score = 85;
        else {
            const target = cur + roll;
            if (target === 56) score += 130;
            if (target <= 50) {
                const targetGlobal = (START_INDEX[color] + target) % 52;
                if (SAFE_INDICES.includes(targetGlobal)) score += 55;
                state.activeColors.forEach(opp => {
                    if (opp === color) return;
                    state.tokens[opp].forEach(oppStep => {
                        if (oppStep >= 0 && oppStep <= 50) {
                            const oppGlobal = (START_INDEX[opp] + oppStep) % 52;
                            if (oppGlobal === targetGlobal && !SAFE_INDICES.includes(targetGlobal)) {
                                score += 160;
                            }
                        }
                    });
                });
            }
            score += cur;
        }
        if (score > bestScore) {
            bestScore = score;
            bestIdx = idx;
        }
    });
    return bestIdx;
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}
