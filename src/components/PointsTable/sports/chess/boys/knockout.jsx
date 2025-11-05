// src/components/PointsTable/sports/basketball/boys/knockout.js

export const chessBoysKnockout = {
    rounds: [
        {
            name: "Semi-finals",
            matches: [
                { id: "SF1", team1: "ECE", team2: "EE", winner: "", score1: "", score2: "" },
                { id: "SF2", team1: "CSE", team2: "PG", winner: "", score1: "", score2: "" },
            ]
        },
        {
            name: "Final",
            matches: [
                { id: "F1", team1: "Winner SF1", team2: "Winner SF2", winner: "", score1: "", score2: "" },
            ]
        },
        {
            name: "Winner",
            matches: [
                { id: "W1", team1: "Winner", team2: null, winner: "", score1: null, score2: null },
            ]
        }
    ]
};