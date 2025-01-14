import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from "./LogIn";
import WeatherScr from './WeatherScr';
import Registration from './Registration';
import Weekly from './Weekly';
import Hourly from './Hourly';
import { createContext , useState } from 'react';
import ButtonComponent from './ButtonComponent';

export const AuthContext = createContext();


function App() {
    const [auth, setAuth] = useState(localStorage.getItem('auth') || null);

    const PrivateRoute = ({ element }) => {
        return auth ? element : <Navigate to="/login" />;
    };
        
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
           
            <BrowserRouter>
            <NavBar/>
                <Routes>
                <Route index element={<Registration />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/WeatherScr" element={<PrivateRoute element={<WeatherScr />} />} />
                    <Route path='Weekly' element={<Weekly />} />
                    <Route path='/hourly/:day' element={<PrivateRoute element={<Hourly />} />} /> 

                    <Route path="/registration" element={<Registration />} />
                    <Route path='/ButtonComponent' element={<ButtonComponent />} />
                </Routes>
            </BrowserRouter>
            </AuthContext.Provider>
    );
}

export default App;


