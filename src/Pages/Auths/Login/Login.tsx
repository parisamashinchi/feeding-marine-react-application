import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import {
    TextField,
    Grid,
    FormControl,
    FormControlLabel,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Checkbox,
    FormGroup,
    Typography,
    Link,
    Button
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {loginInitialization, LoginModel} from '../../../store/auth/models/LoginModel';
import './Login.scss';
import {post, setHeaderToken} from '../../../services/api';
import {Route, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import AuthTemplate from '../../../components/Templates/AuthTemplate/AuthTemplate';
import isEmpty from 'lodash/isEmpty'
import AlertComponent from '../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';


const Login: FC = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState<LoginModel>(loginInitialization);
    const navigate = useNavigate();
    const updateLoginData = (value: string, key: string) => {
        setLoginData({
            ...loginData,
            [key]: value
        });
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const onLogin = () => {
        post('login', loginData).then((res: any) => {
            if(res.status && res.status !== 200){
                setShowAlert(true)
                let messageText = res.data.message + ' '
                mapKeys(res.data.detail, function(value:any) {
                    messageText += value.toString()
                });
                setAlertMessage(messageText)
            } else {
                if (res && res.token) {
                    setHeaderToken(res.token);
                    localStorage.setItem('token', res.token);
                    if(res.farm  && isEmpty(res.farm)){
                        navigate('/create-farm');
                    } else {
                        navigate('/home');
                    }
                }
            }
        })
    }
    return (
        <AuthTemplate title='Log in' headerImage='logo' messageStatus={searchParams.get('status')}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{marginBottom: '18vh'}}
            >
                {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
                <Grid container columns={24} spacing={2} className='form'>
                    <Grid item xs={24}  lg={24}>
                        <TextField
                            variant="outlined"
                            sx={{borderColor: 'secondary.main'}}
                            required
                            id="email"
                            label="Email"
                            placeholder='Enter your email...'
                            onChange={(e) => updateLoginData(e.target.value, 'email')}
                        />
                    </Grid>
                    <Grid item xs={24}  lg={24}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                required
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => updateLoginData(e.target.value, 'password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            color='default'
                                        >
                                            {!showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={13} >
                        <FormGroup>
                            <FormControlLabel style={{color:'#666666'}} control={<Checkbox/>} label="Remember Me"/>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} lg={11} sx={{paddingTop: '24px!important'}} className='bodyText2'>
                        <Link sx={{float: 'right'}} onClick={() => navigate('/auth/forgot-password')}>Forgot
                            Password?</Link>
                    </Grid>
                </Grid>
            </Box>

            <div className='auth-footer'>
                 <span className='auth-change-route'>
                <div style={{margin: '0 auto', display: 'flex'}}>
                     <Typography component='p' style={{color:'#666666'}}>Don't have an account?</Typography>
                     <Button variant="text" className='auth-link'
                             onClick={() => navigate('/auth/sign-up')}>Sign Up</Button>
                </div>
            </span>
                <Button variant="contained" className='full-width app-button buttonText'
                        onClick={onLogin}>Login</Button>
            </div>
        </AuthTemplate>
    )
}

export default Login;
