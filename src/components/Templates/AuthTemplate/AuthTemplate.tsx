import React, {FC, PropsWithChildren} from 'react';
import Container from '@mui/material/Container';
import AuthHeaderImage from '../../../assets/images/auth-head-img.png';
import AuthTickImage from '../../../assets/images/auth-tick.png';
import { Typography, styled, useMediaQuery } from '@mui/material'

interface AuthProps {
    children: any;
    title: string;
    headerImage: 'tick' | 'logo';
    messageStatus?: any;
}
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    border: '1px solid rgba(179, 179, 179, 0.3)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: '0 83px 58px 83px',
    marginTop: '50px'
  },
}));
const AuthTemplate: FC<PropsWithChildren<AuthProps>> = ({children, title, headerImage, messageStatus}) => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    return (
      <>
            <Container  className={matches ? 'auth-container-desktop' : 'auth-container'} >
              <RootStyle>
                {
                    headerImage === 'logo' ?
                        <img src={AuthHeaderImage} width='100%'/> :
                        <span style={{display: 'flex'}}>
                        <img src={AuthTickImage} className='tick-header'/>
                    </span>
                }
                {
                    messageStatus &&
                    <>
                        {
                            messageStatus === 'verified' ?
                                <Typography sx={{marginBottom: '0!important'}} className='auth-page-title bodyText2' >
                                    The email has been verified successfully.
                                </Typography> :
                                <Typography sx={{color: 'red!important', marginBottom: '0!important'}}
                                            className='auth-page-title bodyText2' color='danger' >
                                    Email verification failed.
                                </Typography>
                        }
                    </>
                }
                <Typography className='auth-page-title heading4'
                            sx={{marginTop: headerImage === 'logo' ? '2vh!important' : '0vh!important'}}>{title}</Typography>
                {children}
              </RootStyle>
            </Container>

        </>
    )
}

export default AuthTemplate
