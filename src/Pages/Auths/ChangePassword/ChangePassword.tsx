import React, {FC, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import './ChangePassword.scss';
import {post} from '../../../services/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import AuthTemplate from '../../../components/Templates/AuthTemplate/AuthTemplate';
import {ResetPasswordModel, resetPasswordModelInitialization} from '../../../store/auth/models/ResetPasswordModel';
import mapKeys from 'lodash/mapKeys';
import AlertComponent from '../../../components/Molecules/AlertComponent/AlertComponent'


const ChangePassword: FC = () => {
    const [errors, setErrors] = useState({} as any);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordModel>(resetPasswordModelInitialization);
    let navigate = useNavigate();
    let location = useLocation();

    const updateSignUpData = (value: any, key: string) => {
        setResetPasswordData({
            ...resetPasswordData,
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
    const validate: any = (fieldValues = resetPasswordData) => {
        let temp: any = { ...errors };
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
                temp.confirm_password = resetPasswordData.password === fieldValues.confirm_password
                  ? ""
                  : "Those passwords didn’t match. Try again.";
        }
        setErrors({
            ...temp
        });
    };
    const formIsValid = (fieldValues = resetPasswordData) => {
        const isValid =
          fieldValues.password &&
          fieldValues.confirm_password &&
          Object.values(errors).every((x) => x === "");
        return isValid;
    };
    const onResetPassword = (e:any) => {
        e.preventDefault();
        const isValid = Object.values(errors).every((x) => x === "") && formIsValid();
        if (isValid) {
            const body: ResetPasswordModel = {
                password: resetPasswordData.password,
                confirm_password: resetPasswordData.confirm_password,
                email: searchParams.get('email'),
                token: searchParams.get('token')
            }
            post('reset-password', body).then((res: any) => {
                if (res) {
                    console.log(res.status)
                    if (res.status && res.status !== 200) {
                        setShowAlert(true)
                        let messageText = res.data.message + ' '
                        mapKeys(res.data.detail, function(value: any) {
                            messageText += value.toString()
                        });
                        setAlertMessage(messageText)
                    } else {
                        navigate('/auth/login');
                    }
                }
            });
        }
    }
    return (
        <AuthTemplate title='Reset Password' headerImage='logo'>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{marginBottom: '26vh'}}
            >
                {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
                <Grid container columns={2} spacing={2} className='form'>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
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
                                label="New Password"
                            />
                            {(errors.password && { error: true } &&
                              <FormHelperText error id="password">{errors.password}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="new-confirm-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="new-confirm-password"
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
                                label="Confirm New Password"
                            />
                            {(errors.confirm_password && { error: true } &&
                              <FormHelperText error id="confirm_password">{errors.confirm_password}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <div className='auth-footer'>
                <Button variant="contained" className='full-width app-button'
                        onClick={onResetPassword} disabled={!formIsValid()}>Reset Password</Button>
            </div>
        </AuthTemplate>
    )
}

export default ChangePassword;
