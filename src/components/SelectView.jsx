import React from "react";

function SelectView({ mode, setMode, duration, setDuration, username, setUsername, setGameStarted, styles, gameModes }) {
    return (
        <div style={styles.container}>
            <h1>Who's that brainrot character?</h1>
            <header style={styles.introHeader}>
                <div style={styles.menu}>
                    <ModeSelect mode={mode} setMode={setMode} gameModes={gameModes} styles={styles} />
                    <TimeSelect duration={duration} setDuration={setDuration} styles={styles} />
                    <UsernameInput username={username} setUsername={setUsername} styles={styles} />
                    <button onClick={() => setGameStarted(true)} style={styles.startButton}>Start Game</button>
                </div>
            </header>
        </div>
    );
}

function ModeSelect({ mode, setMode, gameModes, styles }) {
    return (
        <div style={styles.label}>
            <label>Mode:</label>
            <select value={mode} onChange={e => setMode(e.target.value)} style={styles.select}>
                {gameModes.map((gameMode) => (
                    <option key={gameMode} value={gameMode}>
                        {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}


function TimeSelect({ duration, setDuration, styles }) {
    return (
        <div style={styles.label}>
            <label>Time:</label>
            <select value={duration} onChange={e => setDuration(Number(e.target.value))} style={styles.select}>
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
                <option value={600}>10 minutes</option>
                <option value={3600}>1 hour</option>
                <option value={86400}>1 day</option>
            </select>
        </div>
    );
}

function UsernameInput({ username, setUsername, styles }) {
    return (
        <div style={styles.label}>
            <label>Name</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
            />
        </div>
    );
}

export default SelectView;