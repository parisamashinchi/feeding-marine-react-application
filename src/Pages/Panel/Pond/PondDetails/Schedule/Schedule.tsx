import React, {FC, useEffect, useState} from 'react';
import {
    Box, Breadcrumbs,
    Button, Container,
    Grid, Link, TextField, Typography, useMediaQuery,Alert
} from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom'
import PagesTemplate from '../../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../../components/Organisms/Header/Header';
import './Schedule.scss';
import Footer from '../../../../../components/Organisms/Footer/Footer';
import SampleCard from '../../../../../components/Organisms/SampleCard/SampleCard';
import { get, deleteReq, post, put } from '../../../../../services/api'
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import {makeStyles } from '@material-ui/core/styles';
import { scheduleInitialization, Schedule } from '../../../../../store/pond/models/PondModel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import moment from 'moment';
import  AlertDialog from '../../../../../components/Molecules/AlertDialog/AlertDialog';
import AlertComponent from '../../../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';
import isEmpty from 'lodash/isEmpty';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const FeedingSchedule: FC = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showAlertSameTime, setShowAlertSameTime] = useState<boolean>(false);
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [alertMessage, setAlertMessage] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [scheduleData, setScheduleData] = useState<Schedule>(scheduleInitialization)
    const [filteredScheduleList, setFilteredScheduleList] = useState([]);
    const [timeValue, setTimeValue] = useState(new Date('2022-02-18T21:11:54'));
    const [deletedItem, setDeletedItem] = useState<number>();


    const location = useLocation();

    interface CustomizedState {
        pond: {name: string, number: string},
        pondId: string,
        id: string
    }
    const state = location.state as CustomizedState;
    useEffect(() => {
        const time = moment('2022-02-18T21:11:54').format("HH:mm")
        setScheduleData({
            ...scheduleData,
            ['feeding_time']: time
        });
        get(`cycles/${state.id}/schedules`).then((res: any) => {
            if (res) {
                setFilteredScheduleList(res)
            }
        });
    },[]);

    const openAddScheduleModal = () =>{
        setOpen(true)
    }
    const closeAddScheduleModal = () =>{
        setOpen(false)
    }
    const updateScheduleData = (value: string, key: string) => {
        setScheduleData({
            ...scheduleData,
            [key]: Number(value)
        });
    }
    const onHandleAddSchedule = () => {
        const data = Object.assign(scheduleData,{ 'cycle_id':Number(state.id)})
        post(`cycles/${state.id}/schedules`, data).then((res: any) => {
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
                    get(`cycles/${state.id}/schedules`).then((res: any) => {
                        if (res) {
                            setFilteredScheduleList(res)
                        }
                    });
                }
            }
        });
    }
    const handleChangeTimePicker = (newValue:any) => {

        setTimeValue(newValue);
        const time = moment(newValue).format("HH:mm")
        if(isEmpty(filteredScheduleList.filter((filteredScheduleList: any) => filteredScheduleList.feeding_time.toLowerCase().includes(time.toLowerCase())))){
            setScheduleData({
                ...scheduleData,
                ['feeding_time']: time
            });
            setShowAlertSameTime(false)
        } else {
            setShowAlertSameTime(true)
        }
    };
    const handleChangeSwitch = (status:any, id:number) =>{
        setScheduleData({
            ...scheduleData,
            ['disabled']: status
        });
        put( `cycles/${state.id}/schedules/${id}/status`, {'disabled' :status})
          .then((res: any) => {
                get(`cycles/${state.id}/schedules`).then((res: any) => {
                    if (res) {
                        setFilteredScheduleList(res)
                    }
                });
        });
    }
    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
    };
    const openDeleteScheduleAlertDialog = (id:number) => {
        setOpenAlertDialog(true);
        setDeletedItem(id);
    }
    const onHandleDeleteSchedule = () => {
        deleteReq( `cycles/${state.id}/schedules/${deletedItem}`).then((res: any) => {
            if (res) {
                get(`cycles/${state.id}/schedules`).then((res: any) => {
                    if (res) {
                        setFilteredScheduleList(res)
                        setOpenAlertDialog(false);
                    }
                });
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
        <PagesTemplate header={<Header pageTitle={'Feeding Schedule'} hasBackButton={true} cycle={true} pondId={state.pondId}/>} footer={<Footer/>}>
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
                            <Typography className='panel-text-primary' >Feeding Schedule</Typography>
                        </Breadcrumbs>
                        <Typography className='panel-text-primary heading4'>
                            Feeding Schedule
                        </Typography>
                    </Grid>
                </Grid>
            }
            <Grid container columns={2} spacing={2} style={{marginTop:'20px',marginBottom:'20px'}}>
                {
                    filteredScheduleList && filteredScheduleList.map((item: any) => {
                        return (
                            <Grid item xs={2} sm={2} md={2} lg={2}  >
                                <SampleCard
                                              schedule={true}
                                              date={item.feeding_time}
                                              weight={item.feeding_amount}
                                              disabled={item.disabled}
                                              handleDeletePond={ () => openDeleteScheduleAlertDialog(item.id)}
                                              handleChangeSwitch={() => handleChangeSwitch(!item.disabled, item.id)}
                                />
                            </Grid>
                        )
                    })
                }

            </Grid>
            <Grid container columns={24} spacing={2}>
                <Grid item xs={24} lg={24} style={{textAlign: 'right'}}>
                    <Button  onClick={openAddScheduleModal} className='app-button' style={{height: '36px', width: matches ? '178px' : '160px' }} variant="outlined" >
                        ADD Schedule
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
                  onClose={closeAddScheduleModal}
                >
                    <Grid container columns={24} spacing={2}>
                        <Grid item xs={20} spacing={2}>
                            <Typography className='subtitle1 panel-text-primary' style={{ marginBottom: '0px' }}>
                                Add Feeding Schedule
                            </Typography>
                        </Grid>
                        <Grid item  xs={4} spacing={2}>
                            <Button variant="text" className='app-link-button ' onClick={closeAddScheduleModal}>
                                <CloseIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                    {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
                    {showAlertSameTime && <Alert severity="warning"> This time exist, please consider another time.</Alert>}
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
                                  id="feeding_amount"
                                  label="Feeding Amount (g)"
                                  onChange={(e) => updateScheduleData(e.target.value, 'feeding_amount')}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                      label="Time"
                                      value={timeValue}
                                      onChange={(newValue:any) => handleChangeTimePicker(newValue)}
                                      renderInput={(params:any) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className='auth-footer'>
                        <Button variant="contained" className='full-width app-button buttonText'
                                onClick={onHandleAddSchedule}>SAVE</Button>
                    </div>
                </Dialog>
            }
            <AlertDialog
              open={openAlertDialog}
              dialogTitle ="Are you sure you want to delete this feeding schedule?"
              cancelText = "cancel"
              approvedText = "Delete"
              handleClose = {handleCloseAlertDialog}
              handleApproved = {onHandleDeleteSchedule}
            />
        </PagesTemplate>
    )
}

export default FeedingSchedule;
