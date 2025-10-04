import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { query, orderBy, where, limit, getDocs } from 'firebase/firestore';
import {db} from "./firebase.js";

// Function to submit score
export const submitScore = async (username, score, mode, duration) => {
    try {
        await addDoc(collection(db, 'leaderboard'), {
            username,
            score,
            mode, // Add mode
            duration, // Add duration
            timestamp: serverTimestamp(),
        });
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

// Function to fetch top scores filtered by mode and duration
export const fetchLeaderboard = async (mode, duration) => {
    const q = query(
        collection(db, 'leaderboard'),
        where('mode', '==', mode),
        where('duration', '==', duration),
        orderBy('score', 'desc'),
        limit(10)
    );

    const querySnapshot = await getDocs(q);
    const leaderboard = querySnapshot.docs.map(doc => doc.data());
    return leaderboard;
};