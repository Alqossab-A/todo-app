import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useDispatch } from 'react-redux';
import { checkLogin } from './features/user/userSlice';
import { useRef } from 'react';
import { useEffect } from 'react';
// import LandingPage from './pages/LandingPage';

function App() {
    const isMounted = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isMounted.current) return;

        dispatch(checkLogin());

        isMounted.current = true;
    }, [dispatch]);

    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                {/* <Route path='contact' element={<LandingPage />} /> */}
            </Routes>
        </div>
    );
}

export default App;
