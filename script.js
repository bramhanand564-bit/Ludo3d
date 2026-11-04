/* ============================================================================
   LUDO KING 100% EXACT CLONE + UNPREDICTABLE COMBO SNIPER LUCK ENGINE
   ============================================================================ */

// 1. Inject Exact Ludo King Board, Toothed Gear Ring & Pop-Out 3D Isometric Cube CSS
const boardStyles = `
.cell {
    border: 0.5px solid #666;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
}
.cell.red-path    { background: #ec1c24; }
.cell.green-path  { background: #00a651; }
.cell.blue-path   { background: #00aeef; }
.cell.yellow-path { background: #fff200; }

.cell.safe-star::after {
    content: '☆';
    font-size: 19px;
    color: #555;
    line-height: 1;
    position: absolute;
    pointer-events: none;
}

.cell.arrow-red::after    { content: '→'; color: #ec1c24; font-weight: 900; font-size: 14px; }
.cell.arrow-green::after  { content: '↓'; color: #00a651; font-weight: 900; font-size: 14px; }
.cell.arrow-yellow::after { content: '←'; color: #d6b800; font-weight: 900; font-size: 14px; }
.cell.arrow-blue::after   { content: '↑'; color: #00aeef; font-weight: 900; font-size: 14px; }

/* 4 Corner Bases */
.base-box {
    grid-row: span 6;
    grid-column: span 6;
    padding: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #333;
    position: relative;
}
.base-red    { grid-area: 1 / 1 / 7 / 7; background: #ec1c24; }
.base-green  { grid-area: 1 / 10 / 7 / 16; background: #00a651; }
.base-blue   { grid-area: 10 / 1 / 16 / 7; background: #00aeef; }
.base-yellow { grid-area: 10 / 10 / 16 / 16; background: #fff200; }

.base-label {
    position: absolute;
    bottom: 2px;
    font-size: 12px;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 1px 3px #000;
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
    border: 1px solid #444;
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
.base-red .base-spot    { background: #ec1c24; }
.base-green .base-spot  { background: #00a651; }
.base-blue .base-spot   { background: #00aeef; }
.base-yellow .base-spot { background: #fff200; }

.center-home {
    grid-area: 7 / 7 / 10 / 10;
    background: conic-gradient(
        from -45deg,
        #00a651 0deg 90deg,
        #fff200 90deg 180deg,
        #00aeef 180deg 270deg,
        #ec1c24 270deg 360deg
    );
    border: 1px solid #333;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

/* ORIGINAL LUDO KING PIN TOKEN */
.ludo-token {
    width: 27px;
    height: 34px;
    position: absolute;
    bottom: 12%;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.6));
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
    font-size: 9px;
    pointer-events: none;
}

/* Toothed Red/Brown Gear Ring Under Movable Token (Exact Video 2) */
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
    border: 3px dashed #9e1b1b;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 1.5px #fff;
    animation: spinGear 2s infinite linear;
    z-index: -1;
}
@keyframes spinGear {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
}

.ludo-token.jumping {
    animation: tokenHop 0.14s ease-out;
}
@keyframes tokenHop {
    0%   { transform: translateY(0) scale(1); }
    50%  { transform: translateY(-13px) scale(1.22); }
    100% { transform: translateY(0) scale(1); }
}

/* Resting Beveled 2D Dice */
.dice-face {
    width: 40px;
    height: 40px;
    background: radial-gradient(circle at center, #ffffff 45%, #bfc4c9 100%);
    border-radius: 7px;
    border: 1.5px solid #888;
    box-shadow: 0 2px 4px rgba(0,0,0,0.4), inset 0 0 4px #aaa;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 5px;
    place-items: center;
}
.pip {
    width: 6.5px;
    height: 6.5px;
    background: #111;
    border-radius: 50%;
}

/* POP-OUT 3D ISOMETRIC CUBE DICE STAGE */
.cube-stage {
    position: absolute;
    width: 66px;
    height: 66px;
    top: -16px;
    left: -8px;
    z-index: 100;
    pointer-events: none;
    animation: tumble3DCube 0.44s ease-out;
}
@keyframes tumble3DCube {
    0%   { transform: translate(0, 8px) scale(0.6) rotate(0deg); }
    35%  { transform: translate(-10px, -14px) scale(1.18) rotate(-140deg); }
    70%  { transform: translate(-4px, -8px) scale(1.1) rotate(-280deg); }
    100% { transform: translate(0, 0) scale(0.85) rotate(-360deg); }
}
`;
const st = document.createElement('style');
st.innerText = boardStyles;
document.head.appendChild(st);

// ============================================================================
// 2. ORIGINAL LUDO KING SVG PIN & 3D ISOMETRIC CUBE SVG
// ============================================================================
const PIN_COLORS = {
    red:    { fill: '#ec1c24', dark: '#8c0005' },
    green:  { fill: '#00a651', dark: '#00592b' },
    blue:   { fill: '#00aeef', dark: '#005b87' },
    yellow: { fill: '#f9d700', dark: '#a68e00' }
};

function getPinSVG(color, customIcon = '', withBaseRing = true) {
    const c = PIN_COLORS[color];
    return `
    <svg viewBox="0 0 36 44">
        ${withBaseRing ? `<ellipse cx="18" cy="38" rx="10.5" ry="5" fill="none" stroke="${c.dark}" stroke-width="2.2"/>` : ''}
        <path d="M18 2 C9.5 2 3.5 8.8 3.5 17 C3.5 25.8 14.8 36.5 18 39.2 C21.2 36.5 32.5 25.8 32.5 17 C32.5 8.8 26.5 2 18 2 Z"
              fill="#ffffff" stroke="#333" stroke-width="1.3"/>
        <path d="M18 4.6 C11.2 4.6 6.2 10.2 6.2 17 C6.2 23.8 15.2 32.8 18 35.4 C20.8 32.8 29.8 23.8 29.8 17 C29.8 10.2 24.8 4.6 18 4.6 Z"
              fill="${c.fill}"/>
        <circle cx="18" cy="14.5" r="5.5" fill="#ffffff"/>
    </svg>
    ${customIcon ? `<span class="token-extra-icon">${customIcon}</span>` : ''}
    `;
}

function get3DCubeSVG() {
    return `
    <svg viewBox="0 0 80 80" style="filter: drop-shadow(0 8px 8px rgba(0,0,0,0.55));">
        <polygon points="40,6 72,22 40,38 8,22" fill="#f5f7fa" stroke="#999" stroke-width="1"/>
        <polygon points="8,22 40,38 40,74 8,56" fill="#d8dce2" stroke="#888" stroke-width="1"/>
        <polygon points="40,38 72,22 72,56 40,74" fill="#b8bec6" stroke="#777" stroke-width="1"/>
        <ellipse cx="30" cy="20" rx="3.8" ry="2.4" fill="#111"/>
        <ellipse cx="50" cy="24" rx="3.8" ry="2.4" fill="#111"/>
        <circle cx="16" cy="34" r="3.4" fill="#111"/>
        <circle cx="24" cy="46" r="3.4" fill="#111"/>
        <circle cx="32" cy="58" r="3.4" fill="#111"/>
        <circle cx="48" cy="44" r="3.3" fill="#111"/>
        <circle cx="63" cy="36" r="3.3" fill="#111"/>
        <circle cx="48" cy="60" r="3.3" fill="#111"/>
        <circle cx="63" cy="52" r="3.3" fill="#111"/>
    </svg>`;
}

// ============================================================================
// 3. REALISTIC LUDO KING SOUND SYNTHESIZER
// ============================================================================
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let soundEnabled = true;

function playSound(type) {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const now = audioCtx.currentTime;

        if (type === 'dice') {
            [0, 0.055, 0.11, 0.17, 0.23, 0.29].forEach(offset => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220 + Math.random() * 260, now + offset);
                gain.gain.setValueAtTime(0.22, now + offset);
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
            osc.frequency.setValueAtTime(360, now);
            osc.frequency.exponentialRampToValueAtTime(650, now + 0.075);
            gain.gain.setValueAtTime(0.32, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.085);
        } else if (type === 'cut') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(540, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.32);
            gain.gain.setValueAtTime(0.35, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.32);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.34);
        } else if (type === 'win') {
            [440, 554, 659, 880].forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.09);
                gain.gain.setValueAtTime(0.28, now + idx * 0.09);
                gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.09 + 0.2);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + idx * 0.09);
                osc.stop(now + idx * 0.09 + 0.21);
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
// 5. 4-BOX SECRET PROBABILITY STORAGE & STATE
// ============================================================================
const defaultBoxProbs = {
    1: { blue: 100, red: 50, green: 10, yellow: 50 },
    2: { blue: 10,  red: 50, green: 100, yellow: 50 },
    3: { blue: 50,  red: 100, green: 50, yellow: 10 },
    4: { blue: 50,  red: 50, green: 50, yellow: 50 }
};

let boxProbs = JSON.parse(localStorage.getItem('ludo_4box_probs')) || defaultBoxProbs;
let currentEditingBox = 1;

let state = {
    selectedToken: 'pin',
    gameMode: 'local',
    activeColors: ['blue', 'green'],
    activeBox: 1,
    pendingOneTokenOut: false,
    turnIndex: 0,
    diceValue: 1,
    diceRolled: false,
    isAnimating: false,
    consecutiveSixes: 0,
    lastRolls: {},
    missedCutRecently: {}, // Tracks intentional near-misses so next cut is 100% lethal
    tokens: {}
};

// ============================================================================
// 6. SECRET 9090 PROFILE SETTINGS & 4-BOX CONFIGURATION
// ============================================================================
document.getElementById('chk-sound').addEventListener('change', (e) => {
    soundEnabled = e.target.checked;
});

document.getElementById('btn-open-settings').addEventListener('click', () => {
    document.getElementById('input-profile-code').value = '';
    document.getElementById('secret-luck-panel').classList.add('hidden');
    document.getElementById('save-toast').classList.add('hidden');
    document.getElementById('settings-modal').classList.remove('hidden');
    playSound('step');
});

document.getElementById('btn-close-settings').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.add('hidden');
});

function checkSecretCode() {
    const val = document.getElementById('input-profile-code').value.trim();
    if (val === '9090') {
        document.getElementById('secret-luck-panel').classList.remove('hidden');
        loadBoxSliders(currentEditingBox);
        playSound('win');
    } else if (val.length > 0) {
        document.getElementById('display-profile-name').innerText = `👤 ${val}`;
        document.getElementById('secret-luck-panel').classList.add('hidden');
        playSound('step');
    }
}

document.getElementById('btn-check-profile').addEventListener('click', checkSecretCode);
document.getElementById('input-profile-code').addEventListener('input', (e) => {
    if (e.target.value.trim() === '9090') checkSecretCode();
});

document.querySelectorAll('.box-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.box-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentEditingBox = parseInt(tab.dataset.box);
        loadBoxSliders(currentEditingBox);
        document.getElementById('save-toast').classList.add('hidden');
        playSound('step');
    });
});

function loadBoxSliders(boxNum) {
    const probs = boxProbs[boxNum];
    ['blue', 'red', 'green', 'yellow'].forEach(c => {
        document.getElementById(`slider-${c}`).value = probs[c];
        document.getElementById(`val-prob-${c}`).innerText = `${probs[c]}%`;
    });
}

document.querySelectorAll('.prob-slider').forEach(slider => {
    slider.addEventListener('input', () => {
        const c = slider.dataset.color;
        boxProbs[currentEditingBox][c] = parseInt(slider.value);
        document.getElementById(`val-prob-${c}`).innerText = `${slider.value}%`;
    });
});

document.querySelectorAll('.preset-btns button').forEach(btn => {
    btn.addEventListener('click', () => {
        const c = btn.dataset.color;
        const val = parseInt(btn.dataset.val);
        boxProbs[currentEditingBox][c] = val;
        loadBoxSliders(currentEditingBox);
        playSound('step');
    });
});

document.getElementById('btn-save-prob').addEventListener('click', () => {
    localStorage.setItem('ludo_4box_probs', JSON.stringify(boxProbs));
    const toast = document.getElementById('save-toast');
    toast.innerText = `✅ Box ${currentEditingBox} Settings Saved!`;
    toast.classList.remove('hidden');
    playSound('win');
});

// ============================================================================
// 7. MENU, COLOR SELECTION & 1-2-3-4 BOX LAUNCHER
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

document.querySelectorAll('.row-check').forEach(chk => {
    chk.addEventListener('click', () => {
        const row = chk.closest('.player-row');
        if (chk.classList.contains('checked')) {
            if (document.querySelectorAll('.row-check.checked').length <= 2) return;
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
    const clockwise = ['blue', 'red', 'green', 'yellow'];
    state.activeColors = clockwise.filter(c =>
        document.querySelector(`.row-check[data-color="${c}"]`).classList.contains('checked')
    );
    document.querySelectorAll('.count-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.count) === state.activeColors.length);
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

function openBoxSelectionModal(oneTokenOut) {
    state.pendingOneTokenOut = oneTokenOut;
    const banner = document.getElementById('quick-mode-banner');
    banner.classList.toggle('hidden', !oneTokenOut);
    document.getElementById('box-select-modal').classList.remove('hidden');
    playSound('step');
}

document.getElementById('btn-play-normal').addEventListener('click', () => openBoxSelectionModal(false));
document.getElementById('btn-play-quick').addEventListener('click', () => openBoxSelectionModal(true));

document.getElementById('btn-close-box-modal').addEventListener('click', () => {
    document.getElementById('box-select-modal').classList.add('hidden');
});

document.querySelectorAll('.game-box-card').forEach(card => {
    card.addEventListener('click', () => {
        state.activeBox = parseInt(card.dataset.box);
        document.getElementById('box-select-modal').classList.add('hidden');
        startGame(state.pendingOneTokenOut);
    });
});

document.getElementById('btn-leave-game').addEventListener('click', () => {
    if (confirm('Leave game and return to menu?')) showScreen('menu-screen');
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

    const center = document.createElement('div');
    center.className = 'center-home';
    board.appendChild(center);

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

            if (r === 7 && c >= 1 && c <= 5) cell.classList.add('red-path');
            if (c === 7 && r >= 1 && r <= 5) cell.classList.add('green-path');
            if (r === 7 && c >= 9 && c <= 13) cell.classList.add('yellow-path');
            if (c === 7 && r >= 9 && r <= 13) cell.classList.add('blue-path');

            if (r === 7 && c === 0)  cell.classList.add('arrow-red');
            if (r === 0 && c === 7)  cell.classList.add('arrow-green');
            if (r === 7 && c === 14) cell.classList.add('arrow-yellow');
            if (r === 14 && c === 7) cell.classList.add('arrow-blue');

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
    state.lastRolls = {};
    state.missedCutRecently = {};

    ['blue', 'red', 'green', 'yellow'].forEach(color => {
        const wrap = document.getElementById(`wrap-${color}`);
        document.getElementById(`hud-pin-${color}`).innerHTML = getPinSVG(color, '', false);
        document.getElementById(`cube-${color}`).innerHTML = get3DCubeSVG();

        if (state.activeColors.includes(color)) {
            state.tokens[color] = oneTokenOut ? [0, -1, -1, -1] : [-1, -1, -1, -1];
            state.lastRolls[color] = [];
            state.missedCutRecently[color] = false;
            wrap.classList.remove('inactive-player');
        } else {
            wrap.classList.add('inactive-player');
        }
        document.getElementById(`dice-${color}`).innerHTML = '';
    });

    state.turnIndex = 0;
    state.diceRolled = false;
    state.isAnimating = false;
    state.consecutiveSixes = 0;

    showScreen('game-screen');
    playSound('win');
    renderAllTokens();
    updateTurnHUD();
}

// ============================================================================
// 9. RENDER DICE & TOKENS
// ============================================================================
function renderDiceFace(color, val) {
    const holder = document.getElementById(`dice-${color}`);
    if (!val) {
        holder.innerHTML = '';
        return;
    }
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
            tok.innerHTML = getPinSVG(color, TOKEN_ICONS[state.selectedToken], true);

            if (color === currentTurnColor && movableIndices.includes(idx)) {
                tok.classList.add('movable');
                tok.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handleTokenClick(color, idx);
                });
            }
            parent.appendChild(tok);

            const siblings = parent.querySelectorAll('.ludo-token');
            if (siblings.length > 1 && step !== -1) {
                siblings.forEach((sib, sIdx) => {
                    const offset = (sIdx - (siblings.length - 1) / 2) * 11;
                    sib.style.transform = `translateX(${offset}px) scale(0.85)`;
                });
            }
        });
    });
}

// ============================================================================
// 10. UNPREDICTABLE COMBO SNIPER LUCK ENGINE (65% TRIGGER + 6+4 / 6+2 COMBOS)
// ============================================================================

// Calculate player progress % (0 to 100%)
function getPlayerProgressPct(color) {
    const total = state.tokens[color].reduce((acc, s) => acc + (s === -1 ? 0 : s + 1), 0);
    return (total / (57 * 4)) * 100;
}

// Check if Luck Mode is triggered (When any player crosses 65% progress OR 2 tokens passed OR lead gap > 25%)
function isSniperLuckActivated(myColor) {
    const myPct = getPlayerProgressPct(myColor);
    for (const c of state.activeColors) {
        const pct = getPlayerProgressPct(c);
        const passed = state.tokens[c].filter(s => s === 56).length;
        const nearHome = state.tokens[c].filter(s => s >= 45).length;
        if (pct >= 62 || passed >= 2 || (passed >= 1 && nearHome >= 2) || (pct - myPct >= 25)) {
            return true;
        }
    }
    return false;
}

// Filter out predictable patterns (e.g., no 3->4->5, no 3rd consecutive 6, no repeated number)
function getUnpredictableAllowedFaces(color) {
    let faces = [1, 2, 3, 4, 5, 6];

    // Strict Rule: Max 2 consecutive sixes!
    if (state.consecutiveSixes >= 2) {
        faces = [1, 2, 3, 4, 5];
    }

    const hist = state.lastRolls[color] || [];
    if (hist.length >= 1) {
        const last = hist[hist.length - 1];
        // Prevent repeating non-6 number twice in a row 70% of the time so numbers jump around (5, 3, 2, 6, 4)
        if (last !== 6 && Math.random() < 0.72) {
            faces = faces.filter(d => d !== last);
        }
        // Prevent arithmetic sequence like 2->3->4 or 4->3->2
        if (hist.length >= 2) {
            const prev = hist[hist.length - 2];
            if (last - prev === 1) faces = faces.filter(d => d !== last + 1);
            if (prev - last === 1) faces = faces.filter(d => d !== last - 1);
            if (last === prev) faces = faces.filter(d => d !== last);
        }
    }
    return faces.length > 0 ? faces : [1, 2, 3, 4, 5];
}

// Find Direct Cuts (1..6) OR Multi-Step Combo Cuts (e.g., 6+2=8, 6+4=10, 6+6+4=16!)
function findSniperCutRoll(color, allowedFaces, activeProbs) {
    const myProb = activeProbs[color] ?? 50;
    const oppColors = state.activeColors.filter(c => c !== color);
    let candidates = [];

    state.tokens[color].forEach((myStep) => {
        if (myStep < 0 || myStep > 50) return;
        const myGlobal = (START_INDEX[color] + myStep) % 52;

        oppColors.forEach(opp => {
            const oppProb = activeProbs[opp] ?? 50;
            // Only snipe opponents who have lower or equal probability
            if (myProb < oppProb) return;

            state.tokens[opp].forEach(oppStep => {
                if (oppStep < 0 || oppStep > 50) return;
                const oppGlobal = (START_INDEX[opp] + oppStep) % 52;
                if (SAFE_INDICES.includes(oppGlobal)) return; // Cannot cut on safe star

                // Clockwise distance from my token to opponent token
                const dist = (oppGlobal - myGlobal + 52) % 52;
                if (dist === 0 || myStep + dist > 50) return;

                const isUrgent = (oppStep >= 36) || (getPlayerProgressPct(opp) >= 65);

                // 1. Direct Single-Roll Cut (dist = 1, 2, 3, 4, 5, or 6)
                if (dist >= 1 && dist <= 6 && allowedFaces.includes(dist)) {
                    candidates.push({ roll: dist, priority: isUrgent ? 300 : 200, isDirect: true, urgent: isUrgent });
                }
                // 2. Two-Roll Combo Cut: e.g., 6 + 2 (dist=8), 6 + 4 (dist=10), 6 + 3 (dist=9)
                else if (dist >= 7 && dist <= 11 && allowedFaces.includes(6) && state.consecutiveSixes < 2) {
                    candidates.push({ roll: 6, priority: isUrgent ? 260 : 175, isDirect: false, urgent: isUrgent });
                }
                // 3. Three-Roll Combo Cut: e.g., 6 + 6 + 4 (dist=16), 6 + 6 + 2 (dist=14)
                else if (dist >= 13 && dist <= 17 && allowedFaces.includes(6) && state.consecutiveSixes === 0) {
                    candidates.push({ roll: 6, priority: isUrgent ? 230 : 150, isDirect: false, urgent: isUrgent });
                }
            });
        });
    });

    if (candidates.length === 0) return null;
    candidates.sort((a, b) => b.priority - a.priority);
    return candidates[0];
}

// Block Low-Probability Opponent from getting Direct Cuts (e.g., 3, 4) OR Combo Cuts (e.g., 6+3) against Favored Player!
function filterOutCutsAgainstFavored(color, allowedFaces, activeProbs) {
    const myProb = activeProbs[color] ?? 50;
    const favoredOpps = state.activeColors.filter(c => c !== color && (activeProbs[c] ?? 50) > myProb + 5);
    if (favoredOpps.length === 0) return allowedFaces;

    let safeFaces = [...allowedFaces];

    state.tokens[color].forEach(myStep => {
        if (myStep < 0 || myStep > 50) return;
        const myGlobal = (START_INDEX[color] + myStep) % 52;

        favoredOpps.forEach(fav => {
            state.tokens[fav].forEach(favStep => {
                if (favStep < 0 || favStep > 50) return;
                const favGlobal = (START_INDEX[fav] + favStep) % 52;
                if (SAFE_INDICES.includes(favGlobal)) return;

                const dist = (favGlobal - myGlobal + 52) % 52;
                // Block direct cut (e.g. needs 3 or 4)
                if (dist >= 1 && dist <= 6) {
                    safeFaces = safeFaces.filter(d => d !== dist);
                }
                // Block 6+X combo initiation (e.g. needs 6 and 3 => dist 9)
                if (dist >= 7 && dist <= 11 && isSniperLuckActivated(fav)) {
                    safeFaces = safeFaces.filter(d => d !== 6);
                }
            });
        });
    });

    // Also if low-prob player has all tokens locked and wants 6 to come out and cut favored player at start
    return safeFaces.length > 0 ? safeFaces : [1, 2];
}

function getNaturalGraphDiceRoll(color) {
    const activeProbs = boxProbs[state.activeBox];
    const myProb = activeProbs[color] ?? 50;
    const oppColors = state.activeColors.filter(c => c !== color);
    const maxOppProb = Math.max(...oppColors.map(c => activeProbs[c] ?? 50));
    const diff = myProb - maxOppProb;

    let allowedFaces = getUnpredictableAllowedFaces(color);

    // ALWAYS protect High-Probability Player from being cut by Low-Probability Player when it matters
    if (diff < -5) {
        allowedFaces = filterOutCutsAgainstFavored(color, allowedFaces, activeProbs);
    }

    const luckActive = isSniperLuckActivated(color);

    // Check if High-Probability Player has a Direct or Combo Cut (e.g., 2, 4, 6+2, 6+4)
    if (diff > 5 || myProb >= 75) {
        const sniperCut = findSniperCutRoll(color, allowedFaces, activeProbs);
        if (sniperCut && (luckActive || sniperCut.isDirect)) {
            // Intentional Near-Miss Logic ("कभी-कभी छूट भी जाना चाहिए" so opponent never suspects!)
            // If NOT urgent and we haven't missed recently, 26% chance to intentionally miss by 1 step!
            const shouldMissOnPurpose = !sniperCut.urgent && !state.missedCutRecently[color] && (Math.random() < 0.26);

            if (shouldMissOnPurpose) {
                state.missedCutRecently[color] = true; // Next opportunity is 100% guaranteed kill!
                const decoyFaces = allowedFaces.filter(d => d !== sniperCut.roll && d !== 6);
                if (decoyFaces.length > 0) {
                    return decoyFaces[Math.floor(Math.random() * decoyFaces.length)];
                }
            } else {
                // Execute lethal cut or combo step (e.g., 6 then 4, or direct 3/4)!
                state.missedCutRecently[color] = false;
                return sniperCut.roll;
            }
        }
    }

    // Early Game (Before 65% Trigger): Play natural & random with mixed numbers (5, 3, 2, 6, 4)
    if (!luckActive) {
        const allLocked = state.tokens[color].every(s => s === -1);
        if (allLocked && allowedFaces.includes(6) && Math.random() < 0.30) return 6;
        return allowedFaces[Math.floor(Math.random() * allowedFaces.length)];
    }

    // Late Game (>65% Trigger Active): Evaluate best tactical numbers for Home Entry, Escaping Danger & Choking Opponent
    let scoredRolls = [];
    allowedFaces.forEach(d => {
        let bestUtility = -40;
        const movable = getMovableTokens(color, d);

        if (movable.length === 0) {
            bestUtility = -15;
        } else {
            movable.forEach(idx => {
                const cur = state.tokens[color][idx];
                let u = 0;

                if (cur === -1 && d === 6) {
                    u += 85;
                } else if (cur >= 0) {
                    const target = cur + d;
                    if (target === 56) u += 190; // Exact Home entry!
                    else if (target >= 51) u += 90; // Safe inside home lane

                    if (target <= 50) {
                        const targetGlobal = (START_INDEX[color] + target) % 52;
                        if (SAFE_INDICES.includes(targetGlobal)) u += 55;

                        // Danger check: avoid landing 1..6 steps ahead of opponent
                        if (!SAFE_INDICES.includes(targetGlobal)) {
                            oppColors.forEach(opp => {
                                state.tokens[opp].forEach(oppStep => {
                                    if (oppStep >= 0 && oppStep <= 50) {
                                        const oppGlobal = (START_INDEX[opp] + oppStep) % 52;
                                        const dist = (targetGlobal - oppGlobal + 52) % 52;
                                        if (dist >= 1 && dist <= 6) u -= 75;
                                    }
                                });
                            });
                        }
                    }
                }
                if (u > bestUtility) bestUtility = u;
            });
        }
        // Add random jitter (1..18) so numbers like 5, 3, 2, 4 mix naturally
        scoredRolls.push({ dice: d, utility: bestUtility + (Math.random() * 18) });
    });

    scoredRolls.sort((a, b) => b.utility - a.utility);

    // High-Probability Player in Late Game: Smoothly gets exact home entries & safe advances
    if (diff > 5 || myProb >= 75) {
        const winBias = Math.min(0.95, Math.max(myProb / 100, (diff + 45) / 100));
        if (Math.random() < winBias) {
            return Math.random() < 0.76 ? scoredRolls[0].dice : scoredRolls[Math.min(1, scoredRolls.length - 1)].dice;
        }
    }

    // Low-Probability Opponent in Late Game: Chokes near home or steps in front of favored player's sniper range!
    if (diff < -5 || myProb <= 25) {
        const chokeBias = Math.min(0.94, Math.abs(diff) / 70 + (50 - myProb) / 100);
        if (Math.random() < chokeBias) {
            const worst = scoredRolls[scoredRolls.length - 1];
            const secondWorst = scoredRolls[Math.max(0, scoredRolls.length - 2)];
            return Math.random() < 0.65 ? worst.dice : secondWorst.dice;
        }
    }

    return allowedFaces[Math.floor(Math.random() * allowedFaces.length)];
}

// ============================================================================
// 11. TURN MANAGEMENT & 3D ISOMETRIC CUBE ROLL
// ============================================================================
function updateTurnHUD() {
    const currentColor = state.activeColors[state.turnIndex];
    document.querySelectorAll('.turn-arrow').forEach(a => a.classList.remove('active'));

    state.activeColors.forEach(c => {
        if (c === currentColor) {
            renderDiceFace(c, state.diceValue || 1);
        } else {
            renderDiceFace(c, null);
        }
    });

    document.getElementById(`arrow-${currentColor}`).classList.add('active');

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

    renderDiceFace(color, null);
    const cubeStage = document.getElementById(`cube-${color}`);
    cubeStage.classList.remove('hidden');
    playSound('dice');

    setTimeout(() => {
        cubeStage.classList.add('hidden');
        const roll = getNaturalGraphDiceRoll(color);
        state.diceValue = roll;

        if (roll === 6) state.consecutiveSixes++;
        else state.consecutiveSixes = 0;

        state.lastRolls[color].push(roll);
        if (state.lastRolls[color].length > 5) state.lastRolls[color].shift();

        renderDiceFace(color, roll);

        const movable = getMovableTokens(color, roll);
        const isAI = (state.gameMode === 'computer' && color !== state.activeColors[0]);

        if (movable.length === 0) {
            setTimeout(nextTurn, 650);
        } else if (movable.length === 1 || isAI) {
            const chosenIdx = chooseBestTokenToMove(color, movable, roll);
            setTimeout(() => moveTokenStepByStep(color, chosenIdx, roll), 300);
        } else {
            state.isAnimating = false;
            renderAllTokens(movable);
        }
    }, 440);
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
        await sleep(160);
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
        setTimeout(nextTurn, 380);
    }
}

function nextTurn() {
    state.turnIndex = (state.turnIndex + 1) % state.activeColors.length;
    state.diceRolled = false;
    state.isAnimating = false;
    state.consecutiveSixes = 0;
    renderAllTokens();
    updateTurnHUD();
}

// Smartly chooses chasing/cutting token when auto-moving or AI moving
function chooseBestTokenToMove(color, movableIndices, roll) {
    let bestIdx = movableIndices[0];
    let bestScore = -999;

    movableIndices.forEach(idx => {
        const cur = state.tokens[color][idx];
        let score = 0;
        if (cur === -1 && roll === 6) score = 85;
        else {
            const target = cur + roll;
            if (target === 56) score += 170;
            if (target <= 50) {
                const targetGlobal = (START_INDEX[color] + target) % 52;
                if (SAFE_INDICES.includes(targetGlobal)) score += 55;

                state.activeColors.forEach(opp => {
                    if (opp === color) return;
                    state.tokens[opp].forEach(oppStep => {
                        if (oppStep >= 0 && oppStep <= 50) {
                            const oppGlobal = (START_INDEX[opp] + oppStep) % 52;
                            const distAfterMove = (oppGlobal - targetGlobal + 52) % 52;
                            // Direct cut!
                            if (oppGlobal === targetGlobal && !SAFE_INDICES.includes(targetGlobal)) {
                                score += 250;
                            }
                            // Combo setup! (Moves within 1..6 steps of opponent on a 6 roll)
                            else if (roll === 6 && distAfterMove >= 1 && distAfterMove <= 6 && !SAFE_INDICES.includes(oppGlobal)) {
                                score += 140;
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
