import React, { ComponentPropsWithoutRef, FC, PropsWithChildren, useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Divider, useMediaQuery,
} from '@mui/material'
import './PondCycleAddHarvest.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import {makeStyles } from '@material-ui/core/styles';
import { get, post, setHeaderToken } from '../../../services/api'
import { Harvest , harvestInitialization} from '../../../store/pond/models/PondModel'
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import AlertComponent from '../../Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';
import isEmpty from 'lodash/isEmpty';


interface PondCycleAddHarvestCommonProps {
  id: number
}

export type PondCycleAddHarvestProps = Omit<ComponentPropsWithoutRef<'div'>,
    keyof  PondCycleAddHarvestCommonProps> &
  PondCycleAddHarvestCommonProps;


const PondCycleAddHarvest: FC<PropsWithChildren<PondCycleAddHarvestProps>> = ({id}) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  const [alertMessage, setAlertMessage] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [samplingData, setSamplingData] = useState<any>();
  const [showWeight, setShowWight] = useState<boolean>(false);
  const [harvestData, setHarvestData] = useState<Harvest>(harvestInitialization)

  useEffect(() => {
    get(`cycles/${id}/sample?type=harvest`).then((res: any) => {
      if (res) {
        setSamplingData(res.samplingData[res.samplingData.length-1])
        if(!isEmpty(res.samplingData)){
          setShowWight(true)
        }
      }
    });
  },[]);
  const updateHarvestData = (value: string, key: string) => {
    setHarvestData({
      ...harvestData,
      [key]: value
    });
  }
  const openAddHarvestModal = () =>{
    setOpen(true)
  }
  const closeAddHarvestModal = () =>{
    setOpen(false)
  }
  const onHandleAddHarvest = () => {
    const data = Object.assign(harvestData,{ 'cycle_id':Number(id)})
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
          setOpen(false)
          setSamplingData(res.samplingData)
          setShowWight(true)
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
        <>
          {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
          <Card className='pond-card' style={{ marginTop: '16px' }}>
            <CardContent style={{ padding: '16px' }}>
              <Grid container columns={24} spacing={2}>
                <Grid item xs={21} lg={23} spacing={2}>
                  {showWeight
                    ? <Typography className='subtitle1 panel-text-primary' style={{ marginBottom: '0px' }}>
                      harvest info
                    </Typography>
                    :<Typography className = 'subtitle1 panel-text-primary' style={{marginBottom: '0px'}}>
                      You can add harvest
                    </Typography>
                  }
                </Grid>
                <Grid item  xs={3} lg={1} spacing={2}>
                    {showWeight
                      ? <EditIcon onClick={openAddHarvestModal} className='edit-icon' />
                      : <AddIcon onClick={openAddHarvestModal} style={{color: '#00A5A5'}}/>
                    }
                </Grid>
              </Grid>
              {showWeight &&
                <Grid container columns={24} spacing={2}>
                  <Grid item xs={4} lg={3}>
                    <Typography variant="body2" align="left">
                      {samplingData && samplingData.weight/samplingData.count + ' g'}
                    </Typography>
                  </Grid>
                  <Grid item xs={13} lg={17}>
                    <Divider style={{ width: '100%', marginTop: '10px' }}/>
                  </Grid>
                  <Grid item xs={7} lg={4} >
                    <Typography variant="body2" align="right">
                      {moment(samplingData && samplingData.created_at).format("YYYY-MM-DD ")}
                    </Typography>
                  </Grid>
                </Grid>
              }
            </CardContent>
          </Card>
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
              onClose={closeAddHarvestModal}
            >
              <Grid container columns={24} spacing={2}>
                <Grid item xs={20} spacing={2}>
                  <Typography className='subtitle1 panel-text-primary' style={{ marginBottom: '0px' }}>
                    {showWeight ?  'Edit Harvest' : "Add Harvest"}
                  </Typography>
                </Grid>
                <Grid item  xs={4} spacing={2}>
                  <Button variant="text" className='app-link-button ' onClick={closeAddHarvestModal}>
                    <CloseIcon/>
                  </Button>
                </Grid>
              </Grid>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{margin: '3vh 0 4vh 0' }}
              >
                <Grid container columns={2} spacing={2}>
                  <Grid item xs={2} sm={2} md={2} lg={2}>
                    <TextField
                      variant="outlined"
                      sx={{borderColor: 'secondary.main'}}
                      required
                      id="weight"
                      label="Weight"
                       onChange={(e) => updateHarvestData(e.target.value, 'weight')}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} lg={2}>
                    <TextField
                      variant="outlined"
                      sx={{borderColor: 'secondary.main'}}
                      required
                      id="count"
                      label="count"
                      onChange={(e) => updateHarvestData(e.target.value, 'count')}
                    />
                  </Grid>
                </Grid>
              </Box>
              <div className='auth-footer'>
                <Button variant="contained" className='full-width app-button buttonText'
                        onClick={onHandleAddHarvest}>SAVE</Button>
              </div>
            </Dialog>
          }
    </>
      )
}

export default PondCycleAddHarvest;
