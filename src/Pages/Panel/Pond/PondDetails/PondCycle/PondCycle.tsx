import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import './PondCycle.scss';
import { Grid, Typography, Box, Container, Button, useMediaQuery } from '@mui/material'
import NoCycle from '../../../../../assets/images/no-cycle-pond.png';
import { useNavigate, useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import PondCycleInfoCard from "../../../../../components/Organisms/PondCycleInfoCard/PondCycleInfoCard"
import PondCycleEndDate from "../../../../../components/Organisms/PondCycleEndDate/PondCycleEndDate"
import FeedingImage from '../../../../../assets/images/feeding.png';
import FeedingDisableImage from '../../../../../assets/images/feeding-disable.png';
import SamplingImage from '../../../../../assets/images/sampling.png';
import SamplingDisableImage from '../../../../../assets/images/sampling-disable.png';
import Dialog from '@mui/material/Dialog';
import {makeStyles } from '@material-ui/core/styles';
import CycleForm from './CycleForm'
import CloseIcon from '@mui/icons-material/Close';

interface PondCycleProps {
  pond: any;
  cycle: any;
  disable: boolean;
  updateCycle: () => void;
  handleTerminate: () => void;
}
const PondCycle: FC<PropsWithChildren<PondCycleProps>> = ({ pond,cycle, disable,updateCycle,handleTerminate }) => {
  const [open, setOpen] = useState<boolean>(false);
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  const [cycleData, setCycleData] = useState(cycle.cycle);
  const navigate = useNavigate();
  const params = useParams();
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
  useEffect(() => {
    setCycleData(cycle.cycle)
  },[cycle]);


  const classes = useStyles();

  const onHandleCloseEditDialog = () => {
    setOpen(false)
  }
    return (
      <>
      <Grid container columns={24} spacing={2}  className='pond-list-container' style={{marginBottom:'90px'}}>
        {!cycleData
          ?
          <Grid item xs={24} sm={24} md={24} lg={24}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                marginTop: '30px'
              }}
            >
              <img src={NoCycle} alt="There is no Cycle" width="100"/>
            </Box>
            <Typography className='auth-page-title heading6'>
              There is no cycle yet
            </Typography>
          </Grid>
          : <>
            <Grid item xs={24} sm={24} md={24} lg={24}>
              <PondCycleInfoCard info={cycleData} openEditDialog={()=>setOpen(true)} />
            </Grid>
            <Grid item xs={24} sm={24} md={16} lg={15}>
              <PondCycleEndDate info={cycleData} handleTerminate={handleTerminate}/>
            </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}
                    style={{pointerEvents: disable ? 'none' : 'inherit', marginTop: matches ? '30px' : 0, cursor: 'pointer'}}
                    onClick={()=>navigate(`/pond-list/${params.id}/schedule`,{ state: {pond: pond , pondId:params.id, id: cycleData.id } })}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: matches ? 'right' :'center',
                    alignItems: matches ? 'right' : "center",
                    margin: matches ? '10px 18px 10px 0' : '10px 0 10px 0 ',
                  }}
                >
                  <img src={disable ? FeedingDisableImage :FeedingImage} />
                </Box>
                <Typography className='captionText' style={{textAlign: matches ? 'right' : "center" , color: disable ? 'textDisabled' :'#045C77'}} >
                  Feeding Schedule
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}
                    style={{pointerEvents: disable ? 'none' : 'inherit', marginTop: matches ? '30px' : 0, cursor: 'pointer'}}
                    onClick={()=>navigate(`/pond-list/${params.id}/sampling`,{ state: {pond: pond , pondId:params.id, id: cycleData.id } })}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: matches ? 'right' :'center',
                    alignItems: matches ? 'right' : "center",
                    margin: matches ? '10px 10px 10px 0' : '10px 0 10px 0 ',
                  }}
                >
                  <img src={disable ? SamplingDisableImage :SamplingImage} />
                </Box>
                <Typography className='captionText' style={{textAlign: matches ? 'right' : "center" , color: disable ? 'textDisabled' :'#045C77'}}>
                  Sampling Data
                </Typography>
              </Grid>
          </>
        }
      </Grid>
        {!matches &&
          <div className='add-new-cycle-btn-container'>
            <Container maxWidth="sm">
              <Grid container columns={2} spacing={2}>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <Button onClick={() => navigate('/create-cycle', { state: { id: params.id } })}
                          className='add-new-cycle-btn app-button' variant="contained" startIcon={<AddIcon/>}
                          disabled={!disable}
                  >
                    NEW CYCLE
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        }
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
            onClose={onHandleCloseEditDialog}
          >
            <Grid container columns={24} spacing={2} sx={{marginBottom: '20px'}}>
              <Grid item xs={21} >
                <Typography className='subtitle1 panel-text-primary'>
                  Edit cycle info
                </Typography>
              </Grid>
              <Grid item  xs={3} >
                  <CloseIcon className='panel-text-primary' onClick={() => setOpen(false)}/>
              </Grid>
            </Grid>
            <CycleForm  info={cycleData} edit={true} updateCycle={updateCycle} closeDialog={onHandleCloseEditDialog} />
          </Dialog>
        }
      </>
    )
}

export default PondCycle;
