import React, { useState, useEffect, useRef } from 'react';
import './PointsTable.css';

// NOTE: Ensure your actual data files are in place in your project's file system 
// (e.g., ./sports/lawn-tennis/boys/pool-a.jsx). 
// The mock data function and constants have been removed to use your dynamic imports.

const sportsDataMap = {
    'Athletics': {
        genders: ['Boys', 'Girls'],
        pools: {
            'Boys': ['100m', '200m', '400m', '800m', '1500m', 'Discus', '4x400m Relay', 'Cross Country', '3000m', 'Tug Of War', 'Triple Jump', 'Medley', 'Long Jump', 'High Jump', 'Shot Put', 'Javelin Throw', '4x100m Relay'],
            'Girls': ['100m', '200m', '400m', '800m', '1500m', 'Discus', '4x400m Relay', 'Cross Country', '3000m', 'Tug Of War', 'Triple Jump', 'Medley', 'Long Jump', 'High Jump', 'Shot Put', 'Javelin Throw', '4x100m Relay']
        },
        stages: ['Group Stage']
    },
    'Badminton': {
        genders: ['Boys', 'Girls'],
        pools: {
            'Boys': ['Pool A', 'Pool B'],
            'Girls': ['Pool A', 'Pool B']
        },
        stages: ['Group Stage', 'Knockout']
    },
    'Chess': {
        genders: ['Boys', 'Girls'],
        pools: {
            'Boys': ['Pool A', 'Pool B'],
            'Girls': ['Pool A', 'Pool B']
        },
        stages: ['Group Stage', 'Knockout']
    },
    'Cricket': {
        genders: ['Boys'],
        pools: {
            'Boys': ['Pool A', 'Pool B'],
        },
        stages: ['Group Stage', 'Knockout']
    },
    'Football': {
        genders: ['Boys'],
        pools: {
            'Boys': ['Pool A', 'Pool B'],
        },
        stages: ['Group Stage', 'Knockout']
    },
    'Lawn Tennis': {
        genders: ['Boys', 'Girls'],
        pools: {
            'Boys': ['Pool A'],
            'Girls': ['Pool A']
        },
        stages: ['Group Stage', 'Knockout']
    },
    'Table Tennis': {
        genders: ['Boys', 'Girls'],
        pools: {
            'Boys': ['Pool A', 'Pool B'],
            'Girls': ['Pool A', 'Pool B']
        },
        stages: ['Group Stage', 'Knockout']
    },
    'Volleyball': {
        genders: ['Boys', 'Girls'],
        pools: {
            'Boys': ['Pool A', 'Pool B'],
            'Girls': ['Pool A', 'Pool B']
        },
        stages: ['Group Stage', 'Knockout']
    },
};


const formatString = (str) => {
    if (!str) return '';
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

function ScoreboardTable({ data }) {
    if (!data || !data.headings || !data.data) return null;

    // Find the index of the 'Points' column for sorting
    const pointsColumnIndex = data.headings.findIndex(heading =>
        heading.toLowerCase().includes('pts') || heading.toLowerCase().includes('points')
    );

    // Find the index of the 'Position' column for overriding
    const positionColumnIndex = data.headings.findIndex(heading =>
        heading.toLowerCase().includes('position') || heading.toLowerCase().includes('pos')
    );

    // Sort the data array by Points (descending)
    const sortedData = [...data.data].sort((a, b) => {
        if (pointsColumnIndex !== -1) {
            const pointsA = parseFloat(a[pointsColumnIndex]);
            const pointsB = parseFloat(b[pointsColumnIndex]);

            // Primary sort: Points (descending)
            if (pointsB !== pointsA) {
                return pointsB - pointsA;
            }

            // Secondary sort (Tie-breaker): Team Name
            const teamA = a[1];
            const teamB = b[1];

            // CRITICAL CHECK: Ensure both team names exist and are strings before comparison
            if (typeof teamA === 'string' && typeof teamB === 'string') {
                return teamA.localeCompare(teamB);
            }

            // If team names are invalid (not strings), don't crash, just maintain current order (return 0)
            return 0;
        }
        return 0;
    });

    return (
        <div className="scoreboard-table-container">
            <table>
                <thead>
                    <tr>
                        {data.headings.map((heading, index) => (
                            <th key={index}>{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                                let displayCell = cell;

                                // FIX: Override the Position column with the calculated rank
                                if (cellIndex === positionColumnIndex) {
                                    displayCell = rowIndex + 1;
                                }

                                return (
                                    <td key={cellIndex}>{displayCell}</td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MatchesList({ matches }) {
    if (!matches || matches.length === 0) return null;
    return (
        <div className="matches-list-container">
            <h3>Matches</h3>
            {matches.map((match, index) => (
                <div className="match-card" key={index}>
                    <p className="match-date">{match.date} | {match.time}</p>
                    <div className="match-details">
                        <div className="match-team team1">
                            <span>{match.teams[0]}</span>
                        </div>
                        <div className="match-score">
                            {match.scores.length > 1 ? (
                                <p>{match.scores[0]} - {match.scores[1]}</p>
                            ) : (
                                <p>{match.scores[0]}</p>
                            )}
                        </div>
                        {match.teams.length > 1 && (
                            <div className="match-team team2">
                                <span>{match.teams[1]}</span>
                            </div>
                        )}
                    </div>
                    <p className="match-venue">Venue: {match.venue}</p>
                </div>
            ))}
        </div>
    );
}

function Dropdown({ label, options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        onChange({ target: { value: option } });
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const displayValue = value ? formatString(value) : (options.length > 0 ? formatString(options[0]) : label);

    return (
        <div className={`dropdown-wrapper ${isOpen ? 'active-dropdown' : ''}`} ref={dropdownRef}>
            <label>{label}:</label>
            <div className={`custom-dropdown-button ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
                {displayValue}
                <span className="dropdown-arrow"></span>
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option) => (
                        <li key={option} onClick={() => handleOptionClick(option)} className={option === value ? 'selected' : ''}>
                            {formatString(option)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function KnockoutBracket({ data }) {
    if (!data || !data.rounds || data.rounds.length === 0) {
        return <p className="no-data-message">No knockout bracket data available for this selection.</p>;
    }

    // 💡 Determine if Semi-finals round exists and has matches
    const semiFinals = data.rounds.find(round => round.name === "Semi-finals");
    const hasSemiFinals = semiFinals && semiFinals.matches && semiFinals.matches.length > 0;

    const finalRound = data.rounds.find(round => round.name === "Final");
    const thirdPlaceMatch = data.thirdPlace?.match;

    return (
        <div className="knockout-bracket-container complex-flow">

            <div className="bracket-main-flow">

                {/* 1. Semi-finals Column (Conditional) */}
                {hasSemiFinals && (
                    <div className="bracket-round semi-finals-round">
                        <h3 className="round-heading">Semi-finals</h3>
                        <div className="round-matches">
                            {semiFinals.matches.map((match, index) => (
                                <div key={match.id} className={`bracket-match match-${index + 1}`}>
                                    {/* Match date and venue */}
                                    <p className="match-info">{match.date} - {match.venue}</p>
                                    {/* Team 1 */}
                                    {match.team1 && (
                                        <div className="bracket-team">
                                            <span className="team-name">{match.team1}</span>
                                            <span className="team-score">{match.score1}</span>
                                        </div>
                                    )}
                                    {/* Team 2 */}
                                    {match.team2 && (
                                        <div className="bracket-team">
                                            <span className="team-name">{match.team2}</span>
                                            <span className="team-score">{match.score2}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. Vertical Space/Connector Area (Conditional) */}
                {hasSemiFinals && (
                    <div className="bracket-connectors spacer-area">
                        {/* Pseudo-elements in CSS draw the T-shaped connector here */}
                    </div>
                )}

                {/* 3. Final Column (Always renders if data exists) */}
                <div className="bracket-round final-round">
                    <h3 className="round-heading">Final</h3>
                    <div className="round-matches">
                        {/* Final Match */}
                        {finalRound?.matches.map((match) => (
                            <div key={match.id} className="bracket-match final-match">
                                <p className="match-info">{match.date} - {match.venue}</p>
                                {match.team1 && (
                                    <div className="bracket-team">
                                        <span className="team-name">{match.team1}</span>
                                        <span className="team-score">
                                            {match.score1} {match.score1_pen ? `(${match.score1_pen})` : ''}
                                        </span>
                                    </div>
                                )}
                                {match.team2 && (
                                    <div className="bracket-team">
                                        <span className="team-name">{match.team2}</span>
                                        <span className="team-score">
                                            {match.score2} {match.score2_pen ? `(${match.score2_pen})` : ''}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Third Place Play-off (Heading outside the box) */}
                        {thirdPlaceMatch && (
                            <>
                                <h4 className="round-heading third-place-heading">Third Place</h4>
                                <div className="bracket-match third-place-match">
                                    <p className="match-info">{thirdPlaceMatch.date} - {thirdPlaceMatch.venue}</p>
                                    {thirdPlaceMatch.team1 && (
                                        <div className="bracket-team">
                                            <span className="team-name">{thirdPlaceMatch.team1}</span>
                                            <span className="team-score">{thirdPlaceMatch.score1}</span>
                                        </div>
                                    )}
                                    {thirdPlaceMatch.team2 && (
                                        <div className="bracket-team">
                                            <span className="team-name">{thirdPlaceMatch.team2}</span>
                                            <span className="team-score">{thirdPlaceMatch.score2}</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}


function PointsTable() {
    const [selectedSport, setSelectedSport] = useState('Athletics');
    const [selectedGender, setSelectedGender] = useState('Boys');
    const [selectedPool, setSelectedPool] = useState('100m');
    const [selectedStage, setSelectedStage] = useState('Group Stage');
    const [currentData, setCurrentData] = useState(null);

    const [isMobileSportDropdownOpen, setIsMobileSportDropdownOpen] = useState(false);
    const mobileDropdownRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


    const sportsList = [
        { name: 'Athletics', emoji: '🏃' },
        { name: 'Badminton', emoji: '🏸' },
        { name: 'Chess', emoji: '♟️' },
        { name: 'Cricket', emoji: '🏏' },
        { name: 'Football', emoji: '⚽' },

        { name: 'Lawn Tennis', emoji: '🎾' },
        { name: 'Table Tennis', emoji: '🏓' },
        { name: 'Volleyball', emoji: '🏐' }
    ];

    // Effect to handle dynamic pool selection when sport/gender/stage changes
    useEffect(() => {
        const poolsForCurrentGender = sportsDataMap[selectedSport]?.pools[selectedGender] || [];

        if (selectedStage === 'Group Stage') {
            if (poolsForCurrentGender.length > 0 && !poolsForCurrentGender.includes(selectedPool)) {
                setSelectedPool(poolsForCurrentGender[0]);
            } else if (poolsForCurrentGender.length === 0) {
                setSelectedPool('');
            }
        } else if (selectedStage === 'Knockout') {
            setSelectedPool('');
        }
    }, [selectedSport, selectedGender, selectedStage, selectedPool]);


    // Effect to import the data based on current selections
    useEffect(() => {
        const importData = async () => {
            setCurrentData(null);

            if (!selectedSport || !selectedGender || (selectedStage === 'Group Stage' && !selectedPool && selectedSport !== 'Athletics')) {
                return;
            }

            try {
                const sportFolderPath = selectedSport.toLowerCase().replace(' ', '-');
                const genderFolderPath = selectedGender.toLowerCase().replace(' ', '-');
                let module = null;
                let dataKey = '';

                if (selectedSport === 'Athletics') {
                    module = await import(`./sports/${sportFolderPath}/${genderFolderPath}/events.jsx`).catch(e => {
                        console.error("Athletics import failed:", e);
                        return null;
                    });
                    const eventKey = 'athletics' + selectedPool.replace(/\s+/g, '').replace('m', 'm');
                    dataKey = eventKey;
                } else if (selectedStage === 'Group Stage') {
                    const poolFolderPath = selectedPool.toLowerCase().replace(' ', '-');
                    module = await import(`./sports/${sportFolderPath}/${genderFolderPath}/${poolFolderPath}.jsx`).catch(e => {
                        console.error("Group Stage import failed:", e);
                        return null;
                    });
                    dataKey = module ? Object.keys(module)[0] : '';
                } else { // Knockout Stage
                    module = await import(`./sports/${sportFolderPath}/${genderFolderPath}/knockout.jsx`).catch(e => {
                        console.error("Knockout import failed:", e);
                        return null;
                    });
                    dataKey = module ? Object.keys(module)[0] : '';
                }

                // Final check: If the module loaded AND the expected key exists
                if (module && module[dataKey]) {
                    setCurrentData(module[dataKey]);
                } else {
                    console.warn(`Data not found or key ${dataKey} missing for ${selectedSport}.`);
                    setCurrentData(null);
                }

            } catch (error) {
                // This top-level catch is for any synchronous errors or unexpected promise rejections.
                console.error(`Unexpected crash during data import for ${selectedSport}:`, error);
                setCurrentData(null);
            }
        };

        importData();
    }, [selectedSport, selectedGender, selectedPool, selectedStage]);

    // Effect to handle resize and close dropdown on outside click
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);

        function handleClickOutside(event) {
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
                setIsMobileSportDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // --- Handler Functions ---

    const handleSportChange = (event) => {
        const newSport = event.target.value;
        setSelectedSport(newSport);
        setIsMobileSportDropdownOpen(false);

        const genders = sportsDataMap[newSport]?.genders || [];
        const newGender = genders.length > 0 ? genders[0] : selectedGender;
        setSelectedGender(newGender);

        // FIX: Explicitly reset Pool/Event to the first valid one for the new sport
        const pools = sportsDataMap[newSport]?.pools[newGender] || [];
        setSelectedPool(pools.length > 0 ? pools[0] : '');

        // FIX: Explicitly reset Stage
        const stages = sportsDataMap[newSport]?.stages || [];
        setSelectedStage(stages.length > 0 ? stages[0] : 'Group Stage');
    };

    const handleGenderChange = (event) => {
        const newGender = event.target.value;
        setSelectedGender(newGender);
    };

    const handlePoolChange = (event) => {
        setSelectedPool(event.target.value);
    };

    const handleStageChange = (event) => {
        setSelectedStage(event.target.value);
    };

    const toggleMobileSportDropdown = () => {
        setIsMobileSportDropdownOpen(!isMobileSportDropdownOpen);
    }

    // Helper function to render the mobile dropdown's selected value (with emoji)
    const renderSelectedSport = () => {
        const sport = sportsList.find(s => s.name === selectedSport);
        return sport ? `${sport.emoji} ${sport.name}` : selectedSport;
    }


    const genders = sportsDataMap[selectedSport]?.genders || [];
    const pools = sportsDataMap[selectedSport]?.pools[selectedGender] || [];
    const stages = sportsDataMap[selectedSport]?.stages || [];

    // --- JSX Render ---

    return (
        <div className="points-table-page">
            <h1 className="main-points-heading">Points Table</h1>

            {/* MOBILE SPORT DROPDOWN (Shown when isMobile is true) */}
            {isMobile && (
                <div className="sports-mobile-dropdown-nav" ref={mobileDropdownRef}>
                    <div
                        className={`custom-dropdown-button ${isMobileSportDropdownOpen ? 'open' : ''}`}
                        onClick={toggleMobileSportDropdown}
                    >
                        {renderSelectedSport()}
                        <span className="dropdown-arrow"></span>
                    </div>
                    {isMobileSportDropdownOpen && (
                        <ul className="dropdown-menu">
                            {sportsList.map((sport) => (
                                <li
                                    key={sport.name}
                                    onClick={() => handleSportChange({ target: { value: sport.name } })}
                                    className={sport.name === selectedSport ? 'selected' : ''}
                                >
                                    {sport.emoji} {sport.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* RADIO BUTTONS (Shown when isMobile is false) */}
            {!isMobile && (
                <div className="sports-radio-container">
                    {sportsList.map((sport) => (
                        <label key={sport.name} className="sport-radio-label">
                            <input
                                type="radio"
                                name="sport"
                                value={sport.name}
                                checked={selectedSport === sport.name}
                                onChange={handleSportChange}
                                className="sport-radio-input"
                            />
                            <span className="sport-radio-text">
                                <span className="sport-emoji">{sport.emoji}</span>
                                {sport.name}
                            </span>
                        </label>
                    ))}
                </div>
            )}

            <div className="dropdowns-container">
                {genders.length > 0 && (
                    <Dropdown
                        label="Gender"
                        options={genders}
                        value={selectedGender}
                        onChange={handleGenderChange}
                    />
                )}
                {stages.length > 0 && selectedSport !== 'Athletics' && (
                    <Dropdown
                        label="Stage"
                        options={stages}
                        value={selectedStage}
                        onChange={handleStageChange}
                    />
                )}
                {((selectedStage === 'Group Stage' && selectedSport !== 'Athletics') || selectedSport === 'Athletics') && pools.length > 0 && (
                    <Dropdown
                        label={selectedSport === 'Athletics' ? "Event" : "Pool"}
                        options={pools}
                        value={selectedPool}
                        onChange={handlePoolChange}
                    />
                )}
            </div>

            <div className="scoreboard-container">
                {currentData ? (
                    <>
                        <h2>
                            {selectedSport} - {formatString(selectedGender)} |&nbsp;
                            {selectedSport === 'Athletics' ? formatString(selectedPool) :
                                selectedStage === 'Group Stage' ? formatString(selectedPool) : formatString(selectedStage)}
                        </h2>
                        {selectedStage === 'Group Stage' ? (
                            <>
                                <ScoreboardTable data={currentData.pointsTable} />
                                <MatchesList matches={currentData.matches} />
                            </>
                        ) : (
                            <KnockoutBracket data={currentData} />
                        )}
                    </>
                ) : (
                    <p className="no-data-message">No data available for this selection. Make sure the corresponding data file exists.</p>
                )}
            </div>
        </div>
    );
}

export default PointsTable;