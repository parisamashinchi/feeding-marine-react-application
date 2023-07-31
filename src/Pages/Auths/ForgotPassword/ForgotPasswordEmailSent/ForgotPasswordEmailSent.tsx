import React, {FC} from 'react';
import AuthTemplate from '../../../../components/Templates/AuthTemplate/AuthTemplate';
import {Button, Typography, Grid} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {post} from '../../../../services/api';


const ForgotPasswordEmailSent: FC = () => {
    const navigate = useNavigate();
    const onResendClick = () => {
        const email = localStorage.getItem('email');
        post('forgot-password', {email: email}).then((res: any) => {
            if (res) {

            }
        });
    }
    const onChangeEmail = () => {
        navigate('/auth/forgot-password');
    }
    return (
        <AuthTemplate title='Email Sent' headerImage='tick'>
            <Typography className='auth-page-title bodyText2' style={{marginBottom: '20px'}} >
                Please click on the link that has just been sent to your email to reset your password.
            </Typography>
            <Typography className='auth-page-title heading6'  style={{color:'#007577'}}>
                Didn't receive the email?
            </Typography>
            <Grid container columns={2} spacing={2}>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <div style={{display: 'flex'}}>
                        <Button style={{height: '36px'}} variant="outlined" className='full-width app-button'
                                onClick={onResendClick}>Resend</Button>
                    </div>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <div style={{display: 'flex'}}>
                        <Button style={{height: '36px'}} variant="outlined" className='full-width app-button'
                                onClick={onChangeEmail}>Change Email</Button>
                    </div>
                </Grid>
            </Grid>
        </AuthTemplate>
    )
}

export default ForgotPasswordEmailSent;
