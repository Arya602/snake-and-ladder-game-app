import React, { useState } from 'react';
import { MdPersonPinCircle, MdEdit } from "react-icons/md";
import {
    Grid,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from "@mui/material";
import './PlayerSetup.css'
import { useNavigate } from 'react-router-dom';
import title from '../../assets/png/title.png';
import title2 from '../../assets/png/title2.png';

// Import all avatars
const avatars = {
    cat: new URL('../../assets/png/cat.png', import.meta.url).href,
    bear: new URL('../../assets/png/bear.png', import.meta.url).href,
    chicken: new URL('../../assets/png/chicken.png', import.meta.url).href,
    girl: new URL('../../assets/png/girl.png', import.meta.url).href,
    human: new URL('../../assets/png/human.png', import.meta.url).href,
    man: new URL('../../assets/png/man.png', import.meta.url).href,
    panda: new URL('../../assets/png/panda.png', import.meta.url).href,
    avatar: new URL('../../assets/png/avatar.png', import.meta.url).href,
    profile: new URL('../../assets/png/profile.png', import.meta.url).href,
    woman: new URL('../../assets/png/woman.png', import.meta.url).href,
    woman1: new URL('../../assets/png/woman1.png', import.meta.url).href,
};

const colorList = ["red", "yellow", "green", "blue"];
const avatarOptions = [
    { name: 'Cat', src: avatars.cat },
    { name: 'Bear', src: avatars.bear },
    { name: 'Chicken', src: avatars.chicken },
    { name: 'Girl', src: avatars.girl },
    { name: 'Human', src: avatars.human },
    { name: 'Man', src: avatars.man },
    { name: 'Panda', src: avatars.panda },
    { name: 'Avatar', src: avatars.avatar },
    { name: 'Profile', src: avatars.profile },
    { name: 'Woman', src: avatars.woman },
    { name: 'Woman1', src: avatars.woman1 },
];

const PlayerSetup = () => {
    const navigate = useNavigate();
    const [NoOfPlayers, setNoOfPlayers] = useState();
    const [playerList, setPlayerList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [colorError, setColorError] = useState('');
    const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);
    const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
    const [titleChanged, setTitleChanged] = useState(false);

    const handleStartGame = () => {
        setShowForm(true);
        setTitleChanged(true);
    };

    const handlePlayerNumberChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setNoOfPlayers(count);
        setPlayerList(Array.from({ length: count }, () => ({
            name: '',
            color: '',
            avatar: avatars.avatar // Default avatar
        })));
    };

    const handlePlayerNameChange = (index, name) => {
        const playerListCopy = [...playerList];
        playerListCopy[index].name = name;
        setPlayerList(playerListCopy);
    };

    const handleTokenColor = (color, index) => {
        if (playerList.some((player, i) => player.color === color && i !== index)) {
            setColorError(`Color "${color}" already chosen by another player.`);
            return;
        }
        const copyPlayerList = [...playerList];
        copyPlayerList[index].color = color;
        setPlayerList(copyPlayerList);
    };

    const handlePlay = () => {
        if (NoOfPlayers && playerList.every(p => p.name.trim())) {
            navigate('/gameBoard', { state: { playerList } });
        } else {
            alert('Please Enter the names of all players');
        }
    };

    const openAvatarDialog = (index) => {
        setEditingPlayerIndex(index);
        setIsAvatarDialogOpen(true);
    };

    const closeAvatarDialog = () => {
        setIsAvatarDialogOpen(false);
        setEditingPlayerIndex(null);
    };

    const changeAvatar = (avatarSrc) => {
        if (editingPlayerIndex !== null) {
            const playerListCopy = [...playerList];
            playerListCopy[editingPlayerIndex].avatar = avatarSrc;
            setPlayerList(playerListCopy);
        }
        closeAvatarDialog();
    };

    return (
        <div className="player-setup-page">
            <div className={`overlay ${showForm ? 'form-visible' : ''}`}>
                <div className={`title-wrapper ${showForm ? 'minimized' : ''}`}>
                    <div className="title-container" onClick={handleStartGame}>
                        <img
                            src={titleChanged ? title2 : title}
                            alt="Game Title"
                            className={`title-image ${showForm ? 'minimized' : ''}`}
                        />
                        {!showForm && (
                            <div className="start-game-text">
                                <h1>Start Game</h1>
                            </div>
                        )}
                    </div>
                </div>
                {/* <div className={`title-container ${showForm ? 'minimized' : ''}`}>
                    <img
                        src={titleChanged ? title2 : title}
                        alt="Start Game"
                        className={`start-game-img ${showForm ? 'minimized' : ''}`}
                    />
                    
                </div> */}

                {showForm && (
                    <div className="form-container">
                        <div className="form-group">
                            <select
                                className='no-of-player-dropdown'
                                value={NoOfPlayers}
                                onChange={handlePlayerNumberChange}
                            >
                                <option value="">Select Number of Players</option>
                                {[1, 2, 3, 4].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                            <Grid container spacing={2} className="players-grid">
                                {playerList.map((player, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <div className="player-form">
                                            <div className="avatar-container">
                                                <img
                                                    src={player.avatar}
                                                    alt="Player"
                                                    className="player-avatar"
                                                />
                                                <IconButton
                                                    className="edit-avatar-btn"
                                                    onClick={() => openAvatarDialog(index)}
                                                    aria-label="edit avatar"
                                                >
                                                    <MdEdit />
                                                </IconButton>
                                            </div>
                                            <TextField
                                                type="text"
                                                placeholder='Enter Player Name'
                                                value={player.name}
                                                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                                                fullWidth
                                            />
                                            <div className="token-icon">
                                                {colorList.map((color, i) => (
                                                    <span
                                                        key={i}
                                                        onClick={() => handleTokenColor(color, index)}
                                                        className={`color-option ${player.color === color ? 'selected' : ''}`}
                                                        style={{ color }}
                                                        aria-label={`color-option-${color}`}
                                                    >
                                                        <MdPersonPinCircle size={32} />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                            <Button
                                className='play-btn'
                                onClick={handlePlay}
                                variant="contained"
                            >
                                Play
                            </Button>
                        </div>
                    </div>
                )}

                <Dialog
                    open={isAvatarDialogOpen}
                    onClose={closeAvatarDialog}
                    maxWidth="md"
                    fullWidth
                    scroll="paper"
                >
                    <DialogTitle>Select Avatar</DialogTitle>
                    <DialogContent dividers>
                        <div className="avatar-grid">
                            {avatarOptions.map((avatar, index) => (
                                <div
                                    key={index}
                                    className="avatar-option"
                                    onClick={() => changeAvatar(avatar.src)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <img
                                        src={avatar.src}
                                        alt={avatar.name}
                                        className="avatar-preview"
                                    />
                                    <span>{avatar.name}</span>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default PlayerSetup;

// import React, { useState } from 'react';
// import { MdPersonPinCircle } from "react-icons/md";
// import {
//     Grid,
//     Typography,
//     TextField,
//     Button,
//     MenuItem,
//     Select,
//     colors,
// } from "@mui/material";
// import './PlayerSetup.css'
// import cat from '../../assets/png/cat.png'
// import { useNavigate } from 'react-router-dom';
// import title from '../../assets/png/title.png'
// // import { motion } from 'framer-motion';

// const colorList = ["red", "yellow", "green", "blue"];


// const PlayerSetup = () => {
//     const navigate = useNavigate();
//     const [NoOfPlayers, setNoOfPlayers] = useState();
//     const [playerList, setPlayerList] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [colorError, setColorError] = useState('');
//     const [tokenColorList, setTokenColorList] = useState([])
//     const [playerImagesList, setPlayerImagesList] = useState([])

//     const [image, setImage] = useState(null);

//     const handleStartGame = () => setShowForm(true);

//     const handlePlayerNumberChange = (e) => {
//         const count = parseInt(e.target.value, 10);
//         setNoOfPlayers(count);
//         const Players = Array.from({ length: count }, () => ({
//             name: '',
//             color: '',
//             // icon: defaultIcon,
//         }));
//         setPlayerList(Players);
//     }

//     const handlePlayerNameChange = (index, name) => {
//         console.log("player name", playerList);

//         const playerListCopy = [...playerList];
//         console.log("player name", playerListCopy);
//         playerListCopy[index].name = name;
//         setPlayerList(playerListCopy);
//         console.log("playerListCopy", playerListCopy);

//     }

//     const handleTokenColor = (color, index) => {
//         const colorAlreadySelected = playerList.some((player, i) => player.color === color && i !== index);
//         if (colorAlreadySelected) {
//             console.log("coloorrrrrrr");

//             setColorError(`Color "${selectedColor}" already chosen by another player.`);
//             return;
//         }
//         const copyPlayerList = [...playerList];
//         copyPlayerList[index].color = color;
//         setPlayerList(copyPlayerList);

//     }

//     const handlePlay = () => {
//         if (NoOfPlayers && playerList.every(p => p.name.trim())) {
//             navigate('/gameBoard', { state: { playerList } });
//         }
//         else {
//             alert('Please Enter the names of all players')
//         }
//     }

//     const isColorSelected = (color) =>
//         playerList.some(player => player.color === color);

//     return (
//         <div className="player-setup-page">
//             <div className="overlay">
//                 {!showForm ?
//                     (
//                         // <Button className='start-game-btn' onClick={handleStartGame}>
//                         //     <h1>Start Game</h1>
//                         // </Button>
//                         <img
//                             src={title}
//                             alt="Start Game"
//                             className="start-game-img"
//                             onClick={handleStartGame}
//                             style={{ cursor: 'pointer', maxWidth: '400px', width: '400px', height: '350px' }}
//                         />
//                     ) :
//                     (
//                         <div className="form-container">
//                             <div className="form-group">
//                                 <select
//                                     className='no-of-player-dropdown'
//                                     value={NoOfPlayers}
//                                     placeholder='Select Number of Players'
//                                     onChange={handlePlayerNumberChange}
//                                 >
//                                     <option value="">Select Numner of Players</option>
//                                     {[1, 2, 3, 4].map(n => (
//                                         <option key={n} value={n}>{n}</option>
//                                     ))}
//                                 </select>
//                                 <Grid container spacing={2}>
//                                     {playerList.map((player, index) => (
//                                         <Grid item xs={12} sm={6} key={index}>
//                                             <div className="player-form">
//                                                 <img
//                                                     src={image || cat}
//                                                     alt="Player"
//                                                     style={{ width: '80px', height: '100px', borderRadius: '20px' }}
//                                                 />
//                                                 <TextField
//                                                     type="text"
//                                                     placeholder='Enter Player Name'
//                                                     value={player.name}
//                                                     onChange={(e) => handlePlayerNameChange(index, e.target.value)}
//                                                 />
//                                                 <div className="token-icon">
//                                                     {colorList.map((color, i) => (
//                                                         <span key={i}
//                                                             onClick={() => handleTokenColor(color, index)}
//                                                             style={{
//                                                                 cursor: 'pointer',
//                                                                 margin: '0px 3px',
//                                                                 color: color,
//                                                                 opacity: player.color === color ? 1 : 0.7,
//                                                                 border: player.color === color ? 'black' : 'none',
//                                                                 borderRadius: '100%',
//                                                                 padding: '3px'
//                                                             }}
//                                                         >
//                                                             <MdPersonPinCircle size={32} />
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </Grid>
//                                     ))}
//                                 </Grid>

//                                 <Button className='play-btn' onClick={handlePlay}>
//                                     Play
//                                 </Button>
//                             </div>

//                         </div>
//                     )}
//             </div>
//         </div>
//     );

// };

// export default PlayerSetup;
