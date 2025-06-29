import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GameBoard.css';

const NUM_ROWS = 10;
const NUM_COLS = 10;
const TOTAL_TILES = NUM_ROWS * NUM_COLS;

const snakePaths = {
  97: 78,
  62: 19,
  36: 6,
};

const ladderPaths = {
  4: 25,
  40: 59,
  14: 48,
};

const GameBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const playersList = location.state?.playerList || [];

  useEffect(() => {
    if (playersList.length === 0) navigate('/playerSetup');
  }, [playersList, navigate]);

  const generateTiles = () => {
    const tiles = [];
    let isReverse = false;

    for (let row = NUM_ROWS - 1; row >= 0; row--) {
      const cols = [];
      for (let col = 0; col < NUM_COLS; col++) {
        const number = row * NUM_COLS + (isReverse ? NUM_COLS - col : col) + 1;
        cols.push(
          <div
            key={number}
            className={`tile ${number % 2 === 0 ? 'tile-light' : 'tile-dark'}`}
            id={`tile-${number}`}
          >
            {number}
          </div>
        );
      }
      tiles.push(...cols);
      isReverse = !isReverse;
    }
    return tiles;
  };

  return (
    <div className="game-board-wrapper">
      <div className="board-container">
        <div className="board-grid">
          {generateTiles()}

          {/* Overlay Snake and Ladder Paths */}
          {Object.entries(snakePaths).map(([from, to], i) => (
            <div
              key={`snake-${i}`}
              className="snake"
              style={{ '--from': from, '--to': to }}
            />
          ))}

          {Object.entries(ladderPaths).map(([from, to], i) => (
            <div
              key={`ladder-${i}`}
              className="ladder"
              style={{ '--from': from, '--to': to }}
            />
          ))}
        </div>
      </div>
      <div className="player-info">
        {playersList.map((player, i) => (
          <div key={i} className="player-card">
            <span style={{ color: player.color }}>{player.icon}</span>
            <span>{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
