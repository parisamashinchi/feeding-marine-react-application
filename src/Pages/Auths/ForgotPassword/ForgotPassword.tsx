import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import {
    TextField,
    Grid,
    Typography, Button,
} from '@mui/material';
import './ForgotPassword.scss';
import {post} from '../../../services/api';
import {useNavigate} from 'react-router-dom';
import AuthTemplate from '../../../components/Templates/AuthTemplate/AuthTemplate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AlertComponent from '../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';

const ForgotPassword: FC = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();
    const updateEmailData = (value: string, key: string) => {
        setEmail(value);
    }

    const onSend = () => {
        localStorage.setItem('email', email);
        post('forgot-password', {email: email}).then((res: any) => {
            if (res) {
                if( res.status && res.status !== 200){
                    setShowAlert(true)
                    let messageText = res.data.message + ' '
                    mapKeys(res.data.detail, function(value:any) {
                        messageText += value.toString()
                    });
                    setAlertMessage(messageText)
                } else {
                    navigate('/auth/forgot-password-email-sent');
                }
            }
        });
    }
    return (
        <AuthTemplate title='Password Recovery' headerImage='logo'>
            <ArrowBackIosIcon onClick={() => navigate('/auth/login')} color="secondary"
                              style={{position: 'absolute', top: '30px', left: '20px', cursor: 'pointer'}}/>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{marginBottom: '26vh'}}
            >
                <Typography className='auth-page-title bodyText2' style={{marginBottom: '20px'}} >Enter your email address and we’ll send
                    you a link to reset your password</Typography>
                <Grid container columns={2} spacing={2} className='form'>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                            variant="outlined"
                            sx={{borderColor: 'secondary.main'}}
                            required
                            id="email"
                            label="Email"
                            placeholder='Enter your email...'
                            onChange={(e) => updateEmailData(e.target.value, 'email')}
                        />
                    </Grid>
                </Grid>
            </Box>
            <div className='auth-footer'>
                <Button variant="contained" className='full-width app-button'
                        onClick={onSend}>Send</Button>
            </div>
        </AuthTemplate>
    )
}

export default ForgotPassword;
