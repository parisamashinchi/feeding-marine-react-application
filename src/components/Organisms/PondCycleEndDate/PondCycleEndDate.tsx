import React, { ComponentPropsWithoutRef, FC, PropsWithChildren, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Slider, Button, Box, useMediaQuery,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import './PondCycleEndDate.scss';
import ValueIndicator from '../../../assets/images/Value-Indicator.png';
import  AlertDialog from '../../Molecules/AlertDialog/AlertDialog';
import  AlertComponent from '../../Molecules/AlertComponent/AlertComponent'
import  AddHarvest from '../../Organisms/PondCycleAddHarvest/PondCycleAddHarvest'
import moment from 'moment';
import { put } from '../../../services/api'
import { match } from 'assert'

interface PondCycleEndDateCommonProps {
  info: {
    id:number,
    status: number,
    start_date:string,
    finish_date: string,
    target_weight: number,
    total_seeds: number,
    species:{type:string}
  }
  handleTerminate:() => void
}

export type PondCycleEndDateProps = Omit<ComponentPropsWithoutRef<'div'>,
    keyof  PondCycleEndDateCommonProps> &
  PondCycleEndDateCommonProps;


const PondCycleEndDate: FC<PropsWithChildren<PondCycleEndDateProps>> = ({info, handleTerminate}) => {
  const [open, setOpen] = useState<boolean>(false);
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  const [showAlertSuccess, setShowAlertSuccess] = useState<boolean>(false);
  const [terminated, setTerminated] = useState<boolean>(info && info.status === 3 ? true : false);
  const handleCloseAlertDialog = () => {
    setOpen(false);
  };
  const onTerminateCycle = () => {
    setOpen(true);
  }
  const handleApprovedAlertDialog = () => {
    put( `cycles/${info.id}/terminate`)
      .then((res: any) => {
        setOpen(false);
        setTerminated(true)
        setShowAlertSuccess(true)
        handleTerminate()
    });
  }
    return (
      <>
        <Grid container columns={24} spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography className='subtitle2 panel-text-secondary' style={{position: 'relative', top: '14px'}} >
              {!terminated  ? 'End Date' : 'Cycle is terminated!'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={24} lg={24}>
            <Typography className='heading4 panel-text-primary moment'
                  style={{color:  !terminated ? '#58D6D7': '#B3B3B3'}}>
                 {info && moment().diff(moment(info.start_date), "days")+1}
             </Typography>
          </Grid>
        </Grid>
        <Slider
          defaultValue={30}
          sx={{ color:  !terminated ? '#58D6D7!important': '#B3B3B3' }}
          disabled
        />
        <Grid item xs={24} sm={24} md={24} lg={24}>
        <Typography className='captionText total-days' >
          {info && moment(info.finish_date).diff(moment(info.start_date), "days")+1} days
        </Typography>
      </Grid>

        {!terminated ?
          <>
          <Card className='pond-card' style={{marginTop: matches ? '40px': 0}}>
            <CardContent style={{ padding: '16px' }}>
                  <span className='captionText' style={{ marginBottom: '0px' }}>
                    To start a new cycle, either wait until the current cycle ends or terminate the current cycle
                  </span>
                  <Button variant="text" className='app-link-button' onClick={onTerminateCycle} style={{color: '#00A5A5', padding: matches ? 0 : '15px 0', float: 'right'}}>
                    Terminate
                  </Button>
            </CardContent>
          </Card>
          <AlertDialog
            open={open}
            dialogTitle ="Would you like to end the cycle?"
            cancelText = "cancel"
            approvedText = "Yes"
            handleClose = {handleCloseAlertDialog}
            handleApproved = {handleApprovedAlertDialog}
            />
            {showAlertSuccess &&  <AlertComponent type="success"  alertText="The cycle is successfully terminated"/>}
          </>
          : <>
              <AddHarvest id={info.id}/>
            </>
        }

</>
    )
}

export default PondCycleEndDate;
