import React, {FC} from 'react';
import AuthTemplate from '../../../../components/Templates/AuthTemplate/AuthTemplate';
import {Typography} from '@mui/material';


const SignUpEmailSent: FC = () => {
    return (
        <AuthTemplate title='Email Sent' headerImage='tick'>
            <Typography className='auth-page-title bodyText2' variant="h5" component="h5">
                Please click on the link that has just been sent to your email to verify email.
            </Typography>
        </AuthTemplate>
    )
}

export default SignUpEmailSent;
