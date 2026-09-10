// Fisher-Yates suffle algorithm
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function buildRound(pool){
    const correct = pool[Math.floor(Math.random() * pool.length)];
    const decoys = pool.filter(t => t.id !== correct.id);

    const options = shuffle([correct, ...decoys]).map(t => ({
        title: t.title,
        albumCover: t.albumCover
    }));

    return {
        preview: correct.preview,
        correctAnswer: correct.title,
        options
    };
}

export function buildQuiz(tracks, numRounds){
    const shuffledTracks = shuffle(tracks);
    const rounds = [];

    for (let i = 0; i < numRounds; i++) {
        const pool = shuffledTracks.slice(i * 4, i * 4 + 4);
        if (pool.length < 4) break;
        rounds.push(buildRound(pool));
    }

    return rounds;
}