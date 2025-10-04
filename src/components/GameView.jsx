import React from "react";

function GameView({ mode, duration, score, timeLeft, currentImage, lastImage, lastGuessCorrect, handleSubmit, input, setInput, gameOver, leaderboard, styles }) {
    return (
        <div style={styles.container}>
            <h1>Who's that Brainrot Character</h1>
            <div style={styles.header}>
                <p style={styles.headerItem}>Mode: {mode.toUpperCase()}</p>
                <p style={styles.headerItem}>Score: {score}</p>
                <p style={styles.headerItem}>Time Left: {timeLeft}</p>
            </div>
            {!gameOver ? (
                <div>
                    <ActiveGameView
                        currentImage={currentImage}
                        lastImage={lastImage}
                        lastGuessCorrect={lastGuessCorrect}
                        handleSubmit={handleSubmit}
                        input={input}
                        setInput={setInput}
                        styles={styles}
                    />
                </div>
            ) : (
                <GameOverView leaderboard={leaderboard} mode={mode} duration={duration} styles={styles} />
            )}
        </div>
    );
}

function ActiveGameView({currentImage, lastImage, lastGuessCorrect, handleSubmit, input, setInput, styles}) {
    return (
        <>
            {currentImage && <img src={currentImage.path} alt="Guess" style={styles.image} />}
            <p style={{ color: lastGuessCorrect === true ? 'green' : lastGuessCorrect === false ? 'red' : '#e0e0e0'  }}>
                {lastImage
                    ? `Last image was: ${lastImage} - ${lastGuessCorrect === true ? 'Correct!' : lastGuessCorrect === false ? 'Incorrect!' : ''}`
                    : 'No previous image yet.'}
            </p>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter image name" style={styles.input} />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </>
    );
}

function GameOverView({leaderboard, mode, duration, styles}) {
    return (
        <div>
            <h2>Leaderboard for {duration} second {mode.toUpperCase()} mode</h2>
            <div style={styles.leaderboard}>
                {leaderboard.map((entry, index) => (
                    <div key={index} style={styles.leaderboardEntry}>
                        {entry.username}: {entry.score}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameView;