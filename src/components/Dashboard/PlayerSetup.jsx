import React, { useState, useEffect } from 'react';
import { MdPersonPinCircle } from "react-icons/md";
import {
    Grid,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
} from "@mui/material";

const colorList = ["red", "yellow", "green", "blue"];
const defaultIcon = <MdPersonPinCircle size={30} />;

const PlayerSetup = () => {
    const [NoOfPlayers, setNoOfPlayers] = useState();
    const [playerList, setPlayerList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const handleStartGame = () => {
        setShowForm(true);
    };

    const handlePlayerNumberChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setNoOfPlayers(count);
        const Players = Array.from({ length: count }, (_, i) => ({
            name: '',
            color: colorList[i],
            icon: defaultIcon,
        }));
        setPlayerList(Players);
    }

    const handlePlayerNameChange = (index, name) => {
        const playerListCopy = [...playerList];
        playerListCopy[index].name = name;
        setPlayerList(playerListCopy);
    }

    const handlePlay = () => {
        if(NoOfPlayers && playerList.every(p => p.name.trim()))
        {
            onStartGame(playerList);
        }
        else {
            alert('Please Enter the names of all players')
        }
    }

    return (
        <div className="player-setup-page">
            <div className="overlay">
                {!showForm ?
                    (<Button className='start-game-btn' onClick={handleStartGame}>
                        Start Game
                    </Button>
                    ) :
                    (
                        <div className="form-container">
                            <div className="form-group">
                                <Typography>Select Numner of Players</Typography>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    value={NoOfPlayers}
                                    placeholder='Select Number of Players'
                                    onChange={handlePlayerNumberChange}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {[1, 2, 3, 4].map(n => (
                                        <MenuItem key={n} value={n}>{n}</MenuItem>
                                    ))}
                                </Select>
                                {playerList.map((player, index) => (
                                    <div className="player-form">
                                        <h3>Player {index + 1}</h3>
                                        <input
                                            type="text"
                                            placeholder='Enter Player Name'
                                            value={player.name}
                                            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                                        />
                                        <div className="token-icon">
                                            {player.icon}
                                        </div>
                                    </div>
                                ))}
                                <Button className='start-game-btn' onClick={handlePlay}>
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
