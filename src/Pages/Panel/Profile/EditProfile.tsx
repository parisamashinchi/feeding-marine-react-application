import React, { FC, PropsWithChildren, useState } from 'react'
import PagesTemplate from '../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../components/Organisms/Header/Header';
import Footer from '../../../components/Organisms/Footer/Footer';
import { Grid, TextField, Typography, useMediaQuery } from '@mui/material'
import {  put } from '../../../services/api'
import { useLocation } from 'react-router'
import CheckIcon from '@mui/icons-material/Check';

interface PagesProps {
    closeEditDialog?: () => void
    user?: string
}

const EditProfile:  FC<PropsWithChildren<PagesProps>> = ({closeEditDialog, user}) => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [enableField, setEnableField] = useState(true);
    const [iconType, setIconType] = useState('edit');
    const location = useLocation();
    interface CustomizedState {
        name: string
    }
    const state = location.state as CustomizedState;
    const [name, setName] = useState(user ? user : state?.name);

    const handleEdit = () => {
        setEnableField(false);
        setIconType('checked')
    }
    const handleChangeName = (value:any) => {
        setName(value)
    }
    const handleSaveChanges = () => {
        setIconType('circle')
        put( `users`, {fullName: name})
          .then((res: any) => {
              setIconType('edit')
              setEnableField(true);
              closeEditDialog && closeEditDialog()
       });
    }
    return (
       <PagesTemplate header={matches ? '' :<Header pageTitle={'Edit Name'} hasBackButton={true} handleEdit={handleEdit} handleSaveChanges={handleSaveChanges}  icon={iconType} />} footer={matches ? '' :<Footer/>}>
            <Grid container columns={24} spacing={2}  className='profile-container' style={{ marginTop: matches? '': '10px'}}>
                    {matches &&
                      <>
                        <Grid item lg={20}>
                            <Typography className='panel-text-primary subtitle1'>
                                Edit Name
                            </Typography>
                        </Grid>
                        <Grid item  lg={4}>
                            <CheckIcon onClick={handleSaveChanges} className='header-back-icon-desktop' style={{float:'right'}}/>
                          </Grid>
                      </>
                    }
                    <Grid item xs={24} lg={24}>
                        <TextField
                          variant="outlined"
                          sx={{borderColor: 'secondary.main'}}
                          defaultValue={user ? user : state?.name}
                          id="name"
                          label="Name"
                          disabled={matches ? false : enableField}
                          onChange={(e) => handleChangeName(e.target.value)}
                        />
                </Grid>
            </Grid>
        </PagesTemplate>
    )
};

export default EditProfile;
