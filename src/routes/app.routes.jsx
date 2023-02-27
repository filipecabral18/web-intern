import { Routes, Route } from 'react-router-dom';

import { HomePage } from '../pages/Home'
import { Profile } from "../pages/Profile";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}