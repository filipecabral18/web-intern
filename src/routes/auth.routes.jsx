import { Routes, Route } from 'react-router-dom';

import { LoginPage } from '../pages/SignIn';

export function AuthRoutes(){
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    )
}