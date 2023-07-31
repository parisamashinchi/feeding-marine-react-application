import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import {
    Button,
    Checkbox,
    FormControl, FormControlLabel, FormGroup,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    FormHelperText
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {signUpInitialization, SignUpModel} from '../../../store/auth/models/SignUpModel';
import './SignUp.scss';
import {post} from '../../../services/api';
import {Route, useNavigate} from "react-router-dom";
import AuthTemplate from '../../../components/Templates/AuthTemplate/AuthTemplate';
import AlertComponent from '../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';

const SignUp: FC = () => {
    const [errors, setErrors] = useState({} as any);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUpData, setSignUpData] = useState<SignUpModel>(signUpInitialization);
    let navigate = useNavigate();
    const updateSignUpData = (value: string, key: string) => {
        setSignUpData({
            ...signUpData,
            [key]: value
        });
        validate({ [key]: value });
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validate: any = (fieldValues = signUpData) => {
        let temp: any = { ...errors };

        if ("fullName" in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "Please enter your full name";

        if ("email" in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required.";
            if (fieldValues.email)
                temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
                  ? ""
                  : "Enter the format: name@example.com";
        }
        if ("password" in fieldValues) {
            temp.password = fieldValues.password ? "" : "This field is required.";
            if (fieldValues.password)
                temp.password = fieldValues.password.length > 5
                  ? ""
                  : "Use 6 characters or more for your password";
        }
        if ("confirm_password" in fieldValues) {
            temp.confirm_password = fieldValues.confirm_password ? "" : "This field is required.";
            if (fieldValues.confirm_password)
                temp.confirm_password = signUpData.password === fieldValues.confirm_password
                  ? ""
                  : "Those passwords didn’t match. Try again.";
        }
        setErrors({
            ...temp
        });
    };
    const formIsValid = (fieldValues = signUpData) => {
        const isValid =
          fieldValues.fullName &&
          fieldValues.email &&
          fieldValues.password &&
          fieldValues.confirm_password &&
          Object.values(errors).every((x) => x === "");

        return isValid;
    };
    const onRegister = (e:any) => {
        e.preventDefault();
        const isValid = Object.values(errors).every((x) => x === "") && formIsValid();
        if (isValid) {
            post('register', signUpData).then((res: any) => {
                if (res) {
                    if (res.status && res.status !== 200) {
                        setShowAlert(true)
                        let messageText = res.data.message + ' '
                        mapKeys(res.data.detail, function(value: any) {
                            messageText += value.toString()
                        });
                        setAlertMessage(messageText)
                    } else {
                        navigate('/auth/sign-up-email-sent');
                    }
                }
            });
        }
    }
    return (
        <AuthTemplate title='Sign Up' headerImage='logo'>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{marginBottom: '8vh'}}
            >
                {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
                <Grid container columns={2} spacing={2} className='form'>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                            variant="outlined"
                            required
                            id="fullName"
                            label="Full Name"
                            placeholder='Enter your full name...'
                            onChange={(e) => updateSignUpData(e.target.value, 'fullName')}
                            error={errors["fullName"]}
                            {...(errors["fullName"] && {
                                error: true,
                                helperText: errors["fullName"]
                            })}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                            variant="outlined"
                            required
                            type='email'
                            id="email"
                            label="Email"
                            placeholder='Enter your email...'
                            onChange={(e) => updateSignUpData(e.target.value, 'email')}
                            error={errors["email"]}
                            {...(errors["email"] && {
                                error: true,
                                helperText: errors["email"]
                            })}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                label="Password"
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => updateSignUpData(e.target.value, 'password')}
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
                            />
                            {(errors.password && { error: true } &&
                             <FormHelperText error id="password">{errors.password}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                            <OutlinedInput
                              label="Confirm Password"
                              id="confirm_password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                onChange={(e) => updateSignUpData(e.target.value, 'confirm_password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            color='default'
                                        >
                                            {!showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {(errors.confirm_password && { error: true } &&
                              <FormHelperText error id="confirm_password">{errors.confirm_password}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <FormGroup>
                            <FormControlLabel style={{color:'#666666'}} control={<Checkbox/>}
                                              label={<div>
                                                      <span>I accept the </span>
                                                      <a href={'http://www.ilabmarine.com'}>terms of use</a>
                                                  </div>
                                              }
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Box>
            <div className='auth-footer'>
                <span className='auth-change-route'>
                    <div style={{margin: '0 auto', display: 'flex'}}>
                         <Typography component='p' style={{color:'#666666'}}>Already have an account.</Typography>
                         <Button variant="text" className='auth-link'
                                 onClick={() => navigate('/auth/login')}>Log In</Button>
                    </div>
                </span>
                <Button variant="contained" className='full-width app-button'
                        onClick={onRegister} disabled={!formIsValid()}>SIGN UP</Button>
            </div>
        </AuthTemplate>
    )
}

export default SignUp;
