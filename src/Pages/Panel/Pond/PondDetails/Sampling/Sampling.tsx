import React, {FC, useEffect, useState} from 'react';
import {
    Box, Breadcrumbs,
    Button, Container,
    Grid, Link, TextField, Typography, useMediaQuery,
} from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom'
import PagesTemplate from '../../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../../components/Organisms/Header/Header';
import './Sampling.scss';
import Footer from '../../../../../components/Organisms/Footer/Footer';
import SampleCard from '../../../../../components/Organisms/SampleCard/SampleCard';
import { get, deleteReq, post } from '../../../../../services/api'
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import {makeStyles } from '@material-ui/core/styles';
import { sampleInitialization, Sample } from '../../../../../store/pond/models/PondModel'
import moment from 'moment';
import AlertComponent from '../../../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Sampling: FC = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [alertMessage, setAlertMessage] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [samplingData, setSamplingData] = useState<Sample>(sampleInitialization)
    const [filteredSampleList, setFilteredSampleList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    interface CustomizedState {
        pond: {name: string, number: string},
        pondId: string,
        id: string
    }
    const state = location.state as CustomizedState;
    useEffect(() => {
        get(`cycles/${state.id}/sample`).then((res: any) => {
            if (res) {
                setFilteredSampleList(res.samplingData)
            }
        });
    },[]);

    const onHandleDeleteSample = (id:string) => {
        deleteReq( `sample-data/${id}`).then((res: any) => {
            if (res) {
                get(`cycles/${state.id}/sample`).then((res: any) => {
                    if (res) {
                        setFilteredSampleList(res.samplingData)
                    }
                });
            }
        });
    }
    const openAddSamplingModal = () =>{
        setOpen(true)
    }
    const closeAddSamplingModal = () =>{
        setOpen(false)
    }
    const updateSamplingData = (value: string, key: string) => {
        setSamplingData({
            ...samplingData,
            [key]: Number(value)
        });
    }
    const onHandleAddSample = () => {
        const data = Object.assign(samplingData,{ 'cycle_id':Number(state.id)})
        post('sample-data', data).then((res: any) => {
            if (res ) {
                if(res.status && res.status !== 200){
                    setShowAlert(true)
                    let messageText = res.data.message + ' '
                    mapKeys(res.data.detail, function(value:any) {
                        messageText += value.toString()
                    });
                    setAlertMessage(messageText)
                } else {
                    setOpen(false);
                    get(`cycles/${state.id}/sample`).then((res: any) => {
                        if (res) {
                            setFilteredSampleList(res.samplingData)
                        }
                    });
                }
            }
        });
    }
    const useStyles = makeStyles({
        topScrollPaper: {
            alignItems: matches ? 'flex-center': "flex-end"
        },
        topPaperScrollBody: {
            verticalAlign: "bottom"
        },
        dialogPaper: {
            width: matches ? '360px!important' : '100%!important',
            margin:'0!important',
            borderRadius: matches ? '15px!important': '15px 15px 0px 0px!important',
            padding: '20px'
        },
    });
    const classes = useStyles();
    return (
        <PagesTemplate header={<Header pageTitle={'Sampling Data'} hasBackButton={true} cycle={true} pondId={state.pondId}/>} footer={<Footer/>}>
            {matches &&
            <Grid container columns={24} spacing={2}>
                <Grid item  lg={21}>
                    <Breadcrumbs aria-label="breadcrumb"  separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="hover" color="inherit" href="/pond-list">
                            Pond list
                        </Link>
                        <Link underline="hover" color="inherit" href={`/pond-list/${state.pondId}`}>
                            {state.pond.name}-{state.pond.number}
                        </Link>
                        <Typography className='panel-text-primary' >Sampling Date</Typography>
                    </Breadcrumbs>
                    <Typography className='panel-text-primary heading4'>
                        Sampling Date
                    </Typography>
                </Grid>
            </Grid>
            }
            <Grid container columns={2} spacing={2} style={{marginTop:'20px',marginBottom:'20px'}}>
                {
                    filteredSampleList && filteredSampleList.map((item: any) => {
                        return (
                            <Grid item xs={2} sm={2} md={2} lg={2}  >
                                <SampleCard
                                              date={moment(item.updated_at).format("YYYY-MM-DD ")}
                                              weight={item.weight/item.count}
                                              handleDeletePond={() => onHandleDeleteSample(item.id)}
                                />
                            </Grid>
                        )
                    })
                }

            </Grid>
            <Grid container columns={24} spacing={2}>
                <Grid item xs={24} lg={24} style={{textAlign: 'right' }}>
                    <Button  onClick={openAddSamplingModal} className=' app-button' style={{height: '36px', width: matches ? '178px' : '160px' }} variant="outlined" >
                        ADD SAMPLING
                    </Button>
                </Grid>
            </Grid>
            {
                <Dialog
                  title="Dialog With Actions"
                  open={open}
                  fullWidth
                  classes={{
                      scrollPaper: classes.topScrollPaper,
                      paperScrollBody: classes.topPaperScrollBody,
                      paper: classes.dialogPaper
                  }}
                  onClose={closeAddSamplingModal}
                >
                    <Grid container columns={24} spacing={2}>
                        <Grid item xs={20} spacing={2}>
                            <Typography className='subtitle1 panel-text-primary' style={{ marginBottom: '0px' }}>
                                Add Sampling
                            </Typography>
                        </Grid>
                        <Grid item  xs={4} spacing={2}>
                            <Button variant="text" className='app-link-button ' onClick={closeAddSamplingModal}>
                                <CloseIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                    {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
                    <Box
                      component="form"
                      noValidate
                      autoComplete="off"
                      sx={{margin: '3vh 0 10vh 0' }}
                    >
                        <Grid container columns={2} spacing={2}>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                  variant="outlined"
                                  sx={{borderColor: 'secondary.main'}}
                                  required
                                  id="weight"
                                  label="Fish Weight (g)"
                                  onChange={(e) => updateSamplingData(e.target.value, 'weight')}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <TextField
                                  variant="outlined"
                                  sx={{borderColor: 'secondary.main'}}
                                  required
                                  id="count"
                                  label="Fish Count"
                                  onChange={(e) => updateSamplingData(e.target.value, 'count')}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <div className='auth-footer'>
                        <Button variant="contained" className='full-width app-button buttonText'
                                onClick={onHandleAddSample}>SAVE</Button>
                    </div>
                </Dialog>
            }
        </PagesTemplate>
    )
}

export default Sampling;
