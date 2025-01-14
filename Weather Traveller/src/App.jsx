import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from './components/LogIn';
import WeatherScr from './components/WeatherScr';
import Registration from './components/Registration';
import Weekly from './components/Weekly';
import Hourly from './components/Hourly';
import { createContext , useState } from 'react';
import ButtonComponent from './components/ButtonComponent';
import Favorites from "./components/Favorites";


export const AuthContext = createContext();


function App() {
    const [auth, setAuth] = useState(localStorage.getItem('auth') || null);

    const PrivateRoute = ({ element }) => {
        return auth ? element : <Navigate to="/login" />;
    };
        
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
           
            <BrowserRouter>
            
                <Routes>
                <Route index element={<Registration />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/WeatherScr" element={<PrivateRoute element={<WeatherScr />} />} />
                    <Route path='Weekly' element={<Weekly />} />
                    <Route path='/hourly/:day' element={<PrivateRoute element={<Hourly />} />} /> 

                    <Route path="/registration" element={<Registration />} />
                    <Route path='/ButtonComponent' element={<ButtonComponent />} />
                    <Route path="/Favorites" element={<Favorites />} />
                </Routes>
            </BrowserRouter>
            </AuthContext.Provider>
    );
}

export default App;


