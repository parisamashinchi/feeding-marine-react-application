import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Grid, useMediaQuery } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import WaterIcon from '@mui/icons-material/Water';
import './Footer.scss';

interface FooterProps {

}

const Footer: FC<PropsWithChildren<FooterProps>> = ({}) => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string>('home');
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const location = useLocation();
    useEffect(() => {
        let path;
        if (location.pathname.lastIndexOf('/') === 0) {
            path = location.pathname;
        } else {
            path = location.pathname.substr(0, location.pathname.lastIndexOf('/'));
        }
        setSelectedId(path);
    }, []);
    return (
        <div style={{boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.05)'}} className='footer-menu'>
            <Grid container direction={{lg:'column'}} columns={4} spacing={2} >
                <Grid item xs={1} sm={1} md={1} lg={1}
                      style={{borderRight: selectedId  === '/home' && matches ? '4px solid #58d5d6' : 'none'}}
                      onClick={() => {
                        setSelectedId('/home');
                        navigate('/home');
                      }}
                >
                    <div className='footer-icon-container'>
                        <HomeRoundedIcon className='footer-icon'
                                         style={{color: selectedId === '/home' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}/>
                    </div>
                    <p className='footer-text'
                       style={{color: selectedId === '/home' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}>Home</p>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}
                      style={{borderRight: selectedId  === '/pond-list' && matches ? '4px solid #58d5d6' : 'none'}}
                      onClick={() => {
                        setSelectedId('/pond-list');
                        navigate('/pond-list');
                      }}
                >
                    <div className='footer-icon-container'>
                        <WaterIcon className='footer-icon'
                                   style={{color: selectedId === '/pond-list' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}/>
                    </div>
                    <p className='footer-text'
                       style={{color: selectedId === '/pond-list' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}>Pond</p>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}
                      style={{borderRight: selectedId  === '/alert' && matches ? '4px solid #58d5d6' : 'none'}}
                      onClick={() => {
                        setSelectedId('/alert');
                        navigate('/alert');
                      }}
                >
                    <div className='footer-icon-container'>
                        <NotificationsIcon className='footer-icon'
                                           style={{color: selectedId === '/alert' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}/>
                    </div>
                    <p className='footer-text'
                       style={{color: selectedId === '/alert' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}>Alerts</p>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}
                      style={{borderRight: selectedId  === '/profile' && matches ? '4px solid #58d5d6' : 'none'}}
                      onClick={() => {
                        setSelectedId('/profile');
                        navigate('/profile');}}
                >
                    <div className='footer-icon-container'>
                        <PersonIcon className='footer-icon'

                                    style={{color: selectedId === '/profile' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}/>
                    </div>
                    <p className='footer-text'
                       style={{color: selectedId === '/profile' ? '#58d5d6' : 'rgba(255,255,255,0.7)'}}>Profile</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;
