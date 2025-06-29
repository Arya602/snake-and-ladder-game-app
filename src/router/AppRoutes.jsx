import { Routes, Route } from 'react-router-dom'
import PlayerSetup from '../components/Dashboard/PlayerSetup';
import GameBoard from '../components/GameBoard/GAmeBoard';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<PlayerSetup />} />
        <Route path='/playerSetup' element={<PlayerSetup />} />
        <Route path='/gameBoard' element= {<GameBoard />} />
    </Routes>

)
export default AppRoutes;