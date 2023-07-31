import React from 'react';
import './App.scss';
import {PaletteMode} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AuthContainer from './Pages/Auths/AuthContainer';
import SignUp from './Pages/Auths/SignUp/SignUp';
import Login from './Pages/Auths/Login/Login';
import SignUpEmailSent from './Pages/Auths/SignUp/SignUpEmailSent/SignupEmailSent';
import ChangePassword from './Pages/Auths/ChangePassword/ChangePassword';
import ForgotPassword from './Pages/Auths/ForgotPassword/ForgotPassword';
import ForgotPasswordEmailSent from './Pages/Auths/ForgotPassword/ForgotPasswordEmailSent/ForgotPasswordEmailSent';
import {getDesignTokens} from './themeConfig';
import PanelContainer from './Pages/Panel/PanelContainer';
import Home from './Pages/Panel/Home/Home';
import Profile from './Pages/Panel/Profile/Profile';
import Alerts from './Pages/Panel/Alerts/Alerts';
import EditProfile from './Pages/Panel/Profile/EditProfile';
import Units from './Pages/Panel/Profile/Units/Units';
import Language from './Pages/Panel/Profile/Language/Language';
import AlertProfile from './Pages/Panel/Profile/Alert/Alert';
import PrivateRoute from './Pages/Panel/PrivateRoute';
import CreateFarm from './Pages/Panel/Farm/CreateFarm';
import CreatePond from './Pages/Panel/Pond/CreatePond/CreatePond';
import CreateCycle from './Pages/Panel/Pond/PondDetails/PondCycle/CreateCycle';
import PondList from './Pages/Panel/Pond/PondList/PondList';
import PondDetails from './Pages/Panel/Pond/PondDetails/PondDetails';
import Sampling from './Pages/Panel/Pond/PondDetails/Sampling/Sampling';
import Schedule from './Pages/Panel/Pond/PondDetails/Schedule/Schedule';

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});


function App() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    // Update the theme only if the mode changes
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route element={<AuthContainer/>} path='auth'>
                        <Route element={<SignUp/>} path='/auth/sign-up'/>
                        <Route element={<SignUpEmailSent/>} path='/auth/sign-up-email-sent'/>
                        <Route element={<Login/>} path='/auth/login'/>
                        <Route element={<ChangePassword/>} path='/auth/change-password'/>
                        <Route element={<ForgotPassword/>} path='/auth/forgot-password'/>
                        <Route element={<ForgotPasswordEmailSent/>} path='/auth/forgot-password-email-sent'/>
                        <Route element={<SignUpEmailSent/>} path='/auth/reset-password-completed'/>

                    </Route>
                    <Route element={<PrivateRoute><PanelContainer/></PrivateRoute>}>
                        <Route
                            path="*"
                            element={<Navigate to="/home" />}
                        />
                        <Route element={<Home/>} path='/home'/>
                        <Route element={<Profile/>} path='/profile'/>
                        <Route element={<Alerts/>} path='/alert'/>
                        <Route element={<EditProfile/>} path='/Edit-profile'/>
                        <Route element={<Units/>} path='/units'/>
                        <Route element={<Language/>} path='/language'/>
                        <Route element={<AlertProfile/>} path='/profile-alert'/>
                        <Route element={<CreateFarm/>} path='/create-farm'/>
                        <Route element={<CreatePond/>} path='/create-pond'/>
                        <Route element={<CreateCycle/>} path='/create-cycle'/>
                        <Route element={<PondList/>} path='/pond-list'/>
                        <Route element={<PondDetails/>} path='/pond-list/:id'/>
                        <Route element={<Sampling/>} path='/pond-list/:id/sampling'/>
                        <Route element={<Schedule/>} path='/pond-list/:id/schedule'/>
                        <Route element={<Home/>} path='/dashboard'/>
                    </Route>
                </Routes>
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        display: 'flex',*/}
                {/*        width: '100%',*/}
                {/*        alignItems: 'center',*/}
                {/*        justifyContent: 'center',*/}
                {/*        bgcolor: 'primary.main',*/}
                {/*        color: 'text.primary',*/}
                {/*        borderRadius: 1,*/}
                {/*        p: 3,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {theme.palette.mode} mode*/}
                {/*    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">*/}
                {/*        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}*/}
                {/*    </IconButton>*/}
                {/*</Box>*/}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
