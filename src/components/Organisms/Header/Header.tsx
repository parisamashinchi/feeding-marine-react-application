import React, {FC, PropsWithChildren} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from 'react-router-dom';
import { Grid, Typography, useMediaQuery } from '@mui/material'
import Logo from '../../../assets/images/logo-desktop.svg'
import './Header.scss';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

interface HeaderProps {
    pageTitle: string;
    hasBackButton: boolean;
    cycle?: boolean;
    pondId?: string;
    handleEdit?: ()=> void;
    handleSaveChanges?: ()=> void;
    icon?: string;
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({pageTitle, hasBackButton, cycle, pondId, handleEdit, handleSaveChanges, icon}) => {
    const navigate = useNavigate();
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    return (
        <div style={{ boxShadow: !matches ? '0px 1px 5px rgba(0, 0, 0, 0.05)' : '', height: '60px',marginBottom:matches? '55px' : ''}}>
            {!matches
              ? <Grid container columns={24} spacing={2} style={{ marginTop: 0 }}>
                  {
                      hasBackButton &&
                      <Grid item xs={3} sm={3} md={3} lg={3}>
                          {cycle
                            ? <ArrowBackIosIcon
                              onClick={() => navigate(`/pond-list/${pondId}`, { state: { cycle: true } })}
                              className='header-back-icon'/>
                            : <ArrowBackIosIcon onClick={() => navigate(-1)} className='header-back-icon'/>
                          }
                      </Grid>
                  }
                  <Grid item xs={hasBackButton ? 17 : 21} sm={hasBackButton ? 17 : 21} md={hasBackButton ? 17 : 21}
                        lg={21}>
                      <Typography sx={{ marginBottom: '0!important', marginLeft: hasBackButton ? '-10px' : '16px' }}
                                  className='panel-page-title heading6'>
                          {pageTitle}
                      </Typography>
                  </Grid>
                  {handleEdit &&
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                      {icon === 'edit'
                        ? <EditIcon onClick={handleEdit} className='header-back-icon'/>
                        : icon === 'checked'
                          ? <CheckIcon onClick={handleSaveChanges} className='header-back-icon'/>
                          : <CircularProgress color="inherit"/>
                      }
                  </Grid>
                  }
              </Grid>
              :
              <Grid container columns={24} spacing={2} style={{ marginTop: 0 }}>
                  <Grid item xs={24} lg={3} xl={2}>
                  </Grid>
                  <Grid item  lg={21} xl={21} >
                     <img src={Logo} />
                  </Grid>
              </Grid>
            }
        </div>
    )
}

export default Header;
