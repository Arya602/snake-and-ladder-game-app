import React, { useState } from 'react';
import { MdPersonPinCircle } from "react-icons/md";
import {
    Grid,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    colors,
} from "@mui/material";
import './PlayerSetup.css'
import cat from '../../assets/png/cat.png'
import { motion } from 'framer-motion';

const colorList = ["red", "yellow", "green", "blue"];


const PlayerSetup = () => {
    const [NoOfPlayers, setNoOfPlayers] = useState();
    const [playerList, setPlayerList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [colorError, setColorError] = useState('');
    const [tokenColorList, setTokenColorList] = useState([])
    const [playerImagesList, setPlayerImagesList] = useState([])

    const [image, setImage] = useState(null);

    const handleStartGame = () => setShowForm(true);

    const handlePlayerNumberChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setNoOfPlayers(count);
        const Players = Array.from({ length: count }, () => ({
            name: '',
            color: '',
            // icon: defaultIcon,
        }));
        setPlayerList(Players);
    }

    const handlePlayerNameChange = (index, name) => {
        console.log("player name", playerList);

        const playerListCopy = [...playerList];
        console.log("player name", playerListCopy);
        playerListCopy[index].name = name;
        setPlayerList(playerListCopy);
        console.log("playerListCopy", playerListCopy);

    }

    const handleTokenColor = (color, index) => {
        const colorAlreadySelected = playerList.some((player, i) => player.color === color && i !== index);
        if (colorAlreadySelected) {
            console.log("coloorrrrrrr");

            setColorError(`Color "${selectedColor}" already chosen by another player.`);
            return;
        }
        const copyPlayerList = [...playerList];
        copyPlayerList[index].color = color;
        setPlayerList(copyPlayerList);

    }

    const handlePlay = () => {
        if (NoOfPlayers && playerList.every(p => p.name.trim())) {
            onStartGame(playerList);
        }
        else {
            alert('Please Enter the names of all players')
        }
    }

    const isColorSelected = (color) =>
        playerList.some(player => player.color === color);

    return (
        <div className="player-setup-page">
            <div className="overlay">
                {!showForm ?
                    (
                        <motion.div
                            className='start-game-text'
                            initial={{
                                scale: 1,
                                // textShadow: '0 0 0px rgba(0, 255, 0, 0)',
                                // WebkitTextStroke: '2px #00ff00'
                            }}
                            whileHover={{
                                scale: 1.1,
                                // WebkitTextStroke: '3px #ff00ff',
                                // textShadow: '0 0 10px rgba(255, 0, 255, 0.7)'
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            onClick={handleStartGame}
                        >Start Game</motion.div>
                        // <Button className='start-game-btn' onClick={handleStartGame}>
                        //     <h1>Start Game</h1>
                        // </Button>
                    ) :
                    (
                        <div className="form-container">
                            <div className="form-group">
                                <select
                                    className='no-of-player-dropdown'
                                    value={NoOfPlayers}
                                    placeholder='Select Number of Players'
                                    onChange={handlePlayerNumberChange}
                                >
                                    <option value="">Select Numner of Players</option>
                                    {[1, 2, 3, 4].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                                <Grid container spacing={2}>
                                    {playerList.map((player, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <div className="player-form">
                                                <img
                                                    src={image || cat}
                                                    alt="Player"
                                                    style={{ width: '80px', height: '100px', borderRadius: '20px' }}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder='Enter Player Name'
                                                    value={player.name}
                                                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                                                />
                                                <div className="token-icon">
                                                    {colorList.map((color, i) => (
                                                        <span key={i}
                                                            onClick={() => handleTokenColor(color, index)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                margin: '0px 3px',
                                                                color: color,
                                                                opacity: player.color === color ? 1 : 0.7,
                                                                border: player.color === color ? 'black' : 'none',
                                                                borderRadius: '100%',
                                                                padding: '3px'
                                                            }}
                                                        >
                                                            <MdPersonPinCircle size={32} />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Button className='play-btn' onClick={handlePlay}>
                                    Play
                                </Button>
                            </div>

                        </div>
                    )}
            </div>
        </div>
    );

};

export default PlayerSetup;
