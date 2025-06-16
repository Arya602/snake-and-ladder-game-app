import { Routes, Route } from 'react-router-dom'
import PlayerSetup from '../components/Dashboard/PlayerSetup';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<PlayerSetup />} />
        <Route path='/playerSetup' element={<PlayerSetup />} />
    </Routes>

)
export default AppRoutes;