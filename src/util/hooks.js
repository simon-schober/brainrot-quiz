import { useEffect, useState } from 'react';
import { fetchLeaderboard, submitScore } from '../util/leaderboard.js';

export const useTimer = (gameStarted, gameOver, duration, setGameOver) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (!gameStarted || gameOver) return;
        if (timeLeft <= 0) {
            setGameOver(true);
            return;
        }
        const timer = setInterval(() =>
            setTimeLeft(prev => (prev - 0.01).toFixed(2)), 10
        );

        return () => clearInterval(timer);
    }, [timeLeft, gameStarted, gameOver]);

    return [timeLeft, setTimeLeft];
};

export const useLeaderboard = (gameOver, username, score, mode, duration) => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        if (gameOver) {
            const updateLeaderboard = async () => {
                if (username && score > 0) {
                    await submitScore(username, score, mode, duration);
                }
                const data = await fetchLeaderboard(mode, duration);
                setLeaderboard(data);
            };
            updateLeaderboard();
        }
    }, [gameOver, username, score, mode, duration]);

    return leaderboard;
};

export default {useTimer, useLeaderboard};