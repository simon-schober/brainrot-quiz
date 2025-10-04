import React, { useState, useEffect } from 'react';
import { getRandomImage, processString } from '../util/util.js';
import { useTimer, useLeaderboard } from '../util/hooks.js';
import GameView from './GameView.jsx';
import SelectView from './SelectView.jsx';

import { loadGameModes } from '../util/util.js';

const gameModes = loadGameModes();

function App() {
    const [mode, setMode] = useState('easy');
    const [duration, setDuration] = useState(60);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [lastImage, setLastImage] = useState(null);
    const [lastGuessCorrect, setLastGuessCorrect] = useState(null); // New state
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [username, setUsername] = useState('');


    const [timeLeft, setTimeLeft] = useTimer(gameStarted, gameOver, duration, setGameOver);
    const leaderboard = useLeaderboard(gameOver, username, score, mode, duration);

    useEffect(() => {
        if (gameStarted) {
            setTimeLeft(duration);
            setScore(0);
            setGameOver(false);
            setCurrentImage(getRandomImage(gameModes, mode));
            setLastImage(null);
            setLastGuessCorrect(null); // Reset last guess
        }
    }, [gameStarted, duration, mode]);

    const formatName = (name) => {
        return name
            .replace(/[_\s]+/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentImage) return;

        const isCorrect = processString(input) === processString(currentImage.name);
        setLastGuessCorrect(isCorrect); // Update last guess result
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setLastImage(formatName(currentImage.name)); // Format last image name
        setInput('');
        setCurrentImage(getRandomImage(gameModes, mode));
    };

    if (!gameStarted) {
        return (
            <SelectView
                mode={mode}
                setMode={setMode}
                duration={duration}
                setDuration={setDuration}
                setGameStarted={setGameStarted}
                username={username}
                setUsername={setUsername}
                styles={styles}
                gameModes={Object.keys(gameModes)} // Pass game modes
            />
        );
    }

    return (
        <GameView
            mode={mode}
            duration={duration}
            score={score}
            timeLeft={timeLeft}
            currentImage={currentImage}
            lastImage={lastImage}
            lastGuessCorrect={lastGuessCorrect} // Pass last guess result
            handleSubmit={handleSubmit}
            input={input}
            setInput={setInput}
            gameOver={gameOver}
            leaderboard={leaderboard}
            styles={styles}
        />
    );
}

const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#1e1e2f',
            color: '#e0e0e0',
        },
    introHeader: {
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#2a2a3b',
        borderRadius: '10px',
        color: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '20px', // Increase font size
        fontWeight: 'bold', // Make text bold
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Add subtle shadow
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align elements horizontally
        gap: '20px', // Add spacing between fields
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#2a2a3b',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px', // Set a fixed width for consistent alignment
    },
            // Other styles remain unchanged
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#2a2a3b',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add drop-shadow
    },
    headerItem: {
        fontSize: '18px',
        color: '#ffffff',
    },
    select: {
        flex: 1, // Ensure dropdowns also take up remaining space
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #4caf50',
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
    },
        startButton: {
            padding: '10px 20px',
            fontSize: '16px',
            marginTop: '10px',
            backgroundColor: '#4caf50',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        image: {
            width: '500px',
            height: '500px',
            objectFit: 'cover',
            marginBottom: '20px',
            borderRadius: '10px', // Rounds the corners
        },
        // Other styles remain unchanged
    form: { display: 'flex', alignItems: 'center' },
    input: {
        flex: 1, // Allow the input field to take up remaining space
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#1e1e2f',
        color: '#ffffff',
        border: '1px solid #4caf50',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        marginLeft: '10px',
        backgroundColor: '#4caf50', // Modern green
        color: '#ffffff', // White text
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    leaderboard: {
        marginTop: '20px',
        width: '100%',
        borderTop: '1px solid #4caf50', // Top border for the leaderboard
    },
    leaderboardEntry: {
        padding: '10px 0',
        borderBottom: '1px solid #4caf50', // Division line between scores
        color: '#e0e0e0', // Text color
        textAlign: 'left', // Align text to the left
        fontSize: '18px', // Font size for leaderboard entries
    },
    label: {
        display: 'flex',
        flexDirection: 'row', // Align label and input side by side
        alignItems: 'center', // Vertically center align
        width: '100%', // Ensure full width
        color: '#ffffff',
        fontSize: '16px',
        gap: '10px', // Add spacing between label and input
    },
};

export default App;