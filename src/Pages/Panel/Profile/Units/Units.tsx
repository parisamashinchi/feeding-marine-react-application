import React, { FC, useState } from 'react'
import PagesTemplate from '../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../components/Organisms/Header/Header';
import Footer from '../../../../components/Organisms/Footer/Footer';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import isEmpty from "lodash/isEmpty"
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog/Dialog'
import { makeStyles } from '@material-ui/core'


const Units: FC = () => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [oxygenUnitList, setOxygenUnitList] = useState([{key:'ppm', value: 'ppm'}]);
    const [temperatureUnitList, setTemperatureUnitList] = useState([{key:'Celisus (C)', value: 'celisus'}]);
    const [iconType, setIconType] = useState('edit');
    const [enableField, setEnableField] = useState(true);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

    const handleEdit = () => {
        setEnableField(false)
        setIconType('checked')
        setOpenEditDialog(false)
    }
    const handleChangeOxygen = (newValue:any) => {
        setIconType('checked')
    }
    const handleChangeTemperature= (newValue:any) => {
        setIconType('checked')
    }
    const useStyles = makeStyles({
        topScrollPaper: {
            alignItems: 'flex-center'
        },
        topPaperScrollBody: {
            verticalAlign: "top"
        },
        dialogPaper: {
            width:  '413px!important',
            height: '210px',
            borderRadius:  '15px!important',
            padding: '20px 0 20px 20px!important'
        },
    });
    const classes = useStyles();
    const Fields = () => {
        return <>
            <Grid item xs={24} lg={22}>
                <FormControl sx={{width : matches ? '328px!important' :'100%'}}>
                    <InputLabel id="demo-simple-select-label">Dissolved Oxygen</InputLabel>
                    <Select
                      label="Dissolved Oxygen"
                      onChange={handleChangeOxygen}
                      disabled={openEditDialog? false :enableField}
                      defaultValue={'ppm'}
                    >
                        {!isEmpty(oxygenUnitList) && oxygenUnitList.map((item: any, index: number) => {
                            return <MenuItem value={item.value} key={item.key}  >{item.key}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={24} lg={22}>
                <FormControl sx={{width : matches ? '328px!important' :'100%'}}>
                    <InputLabel id="demo-simple-select-label">Temperature</InputLabel>
                    <Select
                      label="Temperature"
                      onChange={handleChangeTemperature}
                      disabled={openEditDialog? false :enableField}
                      defaultValue={'celisus'}

                    >
                        {!isEmpty(temperatureUnitList) && temperatureUnitList.map((item: any, index: number) => {
                            return <MenuItem value={item.value} key={item.key}  >{item.key}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
            </Grid>
            </>
    }
    return (
        <PagesTemplate header={matches ? ' ' : <Header pageTitle={enableField ? 'Units' :'Edit Units'} hasBackButton={true} handleEdit={handleEdit} icon={iconType} />} footer={matches ? '' :<Footer/>}>
            <Grid container columns={24} spacing={2}  className='profile-container' style={{marginTop: '10px'}}>
                    {matches &&
                    <Grid item lg={24}>
                        <Typography className='panel-text-primary subtitle1'>
                            Edit units
                            <EditIcon onClick={() => setOpenEditDialog(true)} style={{left: '5px',top: '8px', position: 'relative'}}/>
                        </Typography>
                    </Grid>
                    }
                    <Fields />
            </Grid>
            <Dialog
              title="Dialog With Actions"
              open={openEditDialog}
              fullWidth
              classes={{
                  scrollPaper: classes.topScrollPaper,
                  paperScrollBody: classes.topPaperScrollBody,
                  paper: classes.dialogPaper
              }}
              onClose={() => setOpenEditDialog(false)}
            >
                <Grid container columns={24} spacing={2} style={{marginBottom: '20px'}}>
                    <Grid item lg={20}>
                        <Typography className='panel-text-primary subtitle1'>
                            Edit units
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        <CheckIcon onClick={handleEdit} className='header-back-icon-desktop' style={{left: '5px',top: '8px', position: 'relative'}}/>
                    </Grid>
                </Grid>
                <Fields/>
            </Dialog>
        </PagesTemplate>
    )
};

export default Units;
