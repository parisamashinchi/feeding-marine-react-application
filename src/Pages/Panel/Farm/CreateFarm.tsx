import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import {
    Button,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import './CreateFarm.scss';
import { get, post, put } from '../../../services/api'
import { useLocation, useNavigate } from 'react-router-dom'
import {farmInitialization, FarmModel} from '../../../store/farm/models/FarmModel';
import PagesTemplate from '../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../components/Organisms/Header/Header';
import 'whatwg-fetch';
import AlertComponent from '../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';
import isEmpty from 'lodash/isEmpty';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog/Dialog'
import { makeStyles } from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import AuthHeaderImage from '../../../assets/images/auth-head-img.png'
import FarmForm from './FarmForm'

export interface IPositionModel {
    lat: number;
    lng: number;
}


interface PagesProps {
    edit?:boolean
}
const CreateFarm: FC<PropsWithChildren<PagesProps>> = ({edit}) => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [errors, setErrors] = useState({} as any);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [headerTitle, setHeaderTitle] = useState<string>('New Farm');
    const [iconType, setIconType] = useState('edit');
    const [enableField, setEnableField] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [newFarmData, setNewFarmData] = useState<FarmModel>(farmInitialization);
    const [selectedTimeZone, setSelectedTimeZone] = useState<any>('');
    const [markerPosition, setMarkerPosition] = useState<IPositionModel>({lat: 0, lng: 0});
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);


    let navigate = useNavigate();
    const location = useLocation();
    interface CustomizedState {
        edit: boolean
    }
    const state = location.state as CustomizedState;

    useEffect(() => {
        get('user').then((res: any) => {
            if (res) {
                if(!isEmpty(res.user.farm) && isEmpty(state) && !edit){
                    navigate('/home');
                } else if(!isEmpty(state) || edit){
                    setHeaderTitle('My Farm')
                    setEnableField(true)
                    setNewFarmData({
                            ...newFarmData,
                            ['timezone']: res.user.farm.timezone,
                            ['name']: res.user.farm.name,
                            ['address1']: res.user.farm.address1,
                            ['address2']: res.user.farm.address2
                    });
                }
            }
        });
    }, []);

    const formIsValid = (fieldValues = newFarmData) => {
        const isValid =
          fieldValues.name &&
          fieldValues.address1 &&
          Object.values(errors).every((x) => x === "");
        return isValid;
    };
    const onCreateFarm = () => {
        const isValid = Object.values(errors).every((x) => x === "") && formIsValid();
        if (isValid) {
            const body: FarmModel = {
                name: newFarmData.name,
                latitude: markerPosition.lat,
                longitude: markerPosition.lng,
                address1: newFarmData.address1,
                address2: newFarmData.address2,
                timezone: selectedTimeZone ? selectedTimeZone : newFarmData.timezone
            }
            if(!state?.edit && !edit){
                post('farms', body)
                  .then((res: any) => {
                      if (res) {
                          if (res.status && res.status !== 200) {
                              setShowAlert(true)
                              let messageText = res.data.message + ' '
                              mapKeys(res.data.detail, function(value: any) {
                                  messageText += value.toString()
                              });
                              setAlertMessage(messageText)
                          } else {
                              navigate('/home');
                          }
                      }
                  })
            } else {
                setIconType('circle')
                put('farms', body)
                  .then((res: any) => {
                      if (res) {
                          if (res.status && res.status !== 200) {
                              setShowAlert(true)
                              let messageText = res.data.message + ' '
                              mapKeys(res.data.detail, function(value: any) {
                                  messageText += value.toString()
                              });
                              setAlertMessage(messageText)
                          } else {
                              navigate('/profile');
                          }
                      }
                  })
            }
        }
    }

    const handleEdit = () => {
        setEnableField(false)
        setIconType('checked')
        setHeaderTitle('Edit Farm')
    }
    const useStyles = makeStyles({
        topScrollPaper: {
            alignItems: 'flex-center'
        },
        topPaperScrollBody: {
            verticalAlign: "top"
        },
        dialogPaper: {
            width:  '360px!important',
            height: '718px',
            borderRadius:  '15px!important',
            padding: '45px!important'
        },
    });
    const classes = useStyles();
    const onCloseEditDialog = ()=>{
       setOpenEditDialog(false)
        get('user').then((res: any) => {
            if (res) {
                setNewFarmData({
                    ...newFarmData,
                    ['timezone']: res.user.farm.timezone,
                    ['name']: res.user.farm.name,
                    ['address1']: res.user.farm.address1
                });
            }
        });
    }

    return (
        <PagesTemplate
          header={state?.edit && !matches
                    ? <Header pageTitle={headerTitle} hasBackButton={true} handleEdit={handleEdit}  handleSaveChanges={onCreateFarm}  icon={iconType} />
                    : !state?.edit && !matches
                    ? <Header pageTitle={headerTitle} hasBackButton={false}  />
                    : matches
            ? '' : ''
          }
        >
            <div style={{ border: (edit || !matches) ? 'none' :'1px solid rgba(179, 179, 179, 0.3)',
                boxShadow: (edit || !matches) ? 'none' : '0px 2px 4px rgba(0, 0, 0, 0.15)',
                borderRadius: '15px',
                margin: edit ? '' :'50px auto',
                width: matches ? '494px' : 'inherit',
                height: 'auto',
                textAlign: edit ? 'left' :'center',
                float: edit ? 'left' :'inherit'
            }}>
                {matches && !edit && isEmpty(state)  && <img src={AuthHeaderImage} width='321'/>}
                {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
                <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{marginBottom: '2vh', padding: matches && !edit ? '0 83px 34px 83px' : ''}}

            >
                <Typography sx={{marginBottom: '10px!important', textAlign: 'left!important', marginTop: '10px'}}
                            className='panel-page-title subtitle2' >
                    {matches && edit
                      ? <>
                        Edit farm
                        <EditIcon onClick={() => setOpenEditDialog(true)} style={{left: '5px',top: '8px', position: 'relative'}}/>
                      </>
                        : matches && !edit
                        ? 'Create Your Farm'
                        : ''
                    }
                </Typography>

                <FarmForm markerPosition={markerPosition}
                          selectedTimeZone={selectedTimeZone}
                          enableField={enableField}
                          errors={errors}
                          setErrors={setErrors}
                          newFarmData={newFarmData}
                          setNewFarmData={setNewFarmData}
                          openEditDialog={openEditDialog}
                          setMarkerPosition={setMarkerPosition}
                          setSelectedTimeZone={setSelectedTimeZone}
                />
            </Box>

            {(!state?.edit && !edit) &&
                <div className='create-farm-btn'>
                    <Button variant="contained"
                        className={!matches ? 'full-width  app-button' : ' app-button'}
                        style={{width : matches ? '328px' : ' ', margin: '0 auto'}}
                        onClick={onCreateFarm} disabled={!formIsValid()}>
                        Create Farm
                    </Button>
                </div>
            }
            </div>
            <Dialog
              title="Dialog With Actions"
              open={openEditDialog}
              fullWidth
              classes={{
                  scrollPaper: classes.topScrollPaper,
                  paperScrollBody: classes.topPaperScrollBody,
                  paper: classes.dialogPaper
              }}
              onClose={onCloseEditDialog}
            >
                <Grid container columns={24} spacing={2} style={{marginBottom: '20px'}}>
                    <Grid item lg={20}>
                        <Typography className='panel-text-primary subtitle1'>
                            Edit my farm info
                        </Typography>
                    </Grid>
                    <Grid item lg={4}>
                        {iconType === 'circle'
                          ?  <CircularProgress color="inherit"/>
                          :  <CheckIcon onClick={onCreateFarm} className='header-back-icon-desktop' />
                        }
                    </Grid>
                </Grid>
                <FarmForm markerPosition={markerPosition}
                          selectedTimeZone={selectedTimeZone}
                          enableField={enableField}
                          errors={errors}
                          setErrors={setErrors}
                          newFarmData={newFarmData}
                          setNewFarmData={setNewFarmData}
                          openEditDialog={openEditDialog}
                          setMarkerPosition={setMarkerPosition}
                          setSelectedTimeZone={setSelectedTimeZone}
                />
            </Dialog>
        </PagesTemplate>
    )
}

export default CreateFarm;
