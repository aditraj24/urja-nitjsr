// src/components/PointsTable/sports/basketball/boys/knockout.js

export const badmintonBoysKnockout = {
    rounds: [
        {
            name: "Semi-finals",
            matches: [
                { id: 'SF1', date: '12 October', venue: 'LHC', team1: 'ECE', score1: '', team2: 'EE', score2: '', winner: '' },
                { id: 'SF2', date: '12 October', venue: 'LHC', team1: 'CSE', score1: '', team2: 'PG', score2: '', winner: '' },
            ]
        },
        {
            name: "Final",
            matches: [
                { id: 'F1', date: 'TBD', venue: 'LHC', team1: 'Winner SF1', score1: '', score1_pen: '', team2: 'Winner SF2', score2: '', score2_pen: '', winner: '' }
            ]
        }
    ],
    // 💡 NEW: Dedicated thirdPlace object
    thirdPlace: {
        name: "Third Place",
        match: {
            id: 'TP1', date: 'TBD', venue: 'LHC', team1: 'Loser SF1', score1: '', team2: 'Loser SF2', score2: '', winner: ''
        }
    }
};