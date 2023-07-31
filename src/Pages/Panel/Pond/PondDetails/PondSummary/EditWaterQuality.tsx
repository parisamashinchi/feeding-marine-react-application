import React, { ComponentPropsWithoutRef, FC, PropsWithChildren, useState } from 'react'
import {
  Grid,
  Typography,
  Button,
  Box,
  TextField, useMediaQuery,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import {makeStyles } from '@material-ui/core/styles';
import { post } from '../../../../../services/api'
import { WaterQuality } from '../../../../../store/pond/models/PondModel'
import { useParams } from 'react-router'
import AlertComponent from '../../../../../components/Molecules/AlertComponent/AlertComponent'

interface PondCycleAddHarvestCommonProps {
  pond:{
    temperature: number;
    ph: number;
    oxygen: number;
  };
  open: boolean;
  closeEditWaterQualityModal: () => void,
}

export type PondCycleAddHarvestProps = Omit<ComponentPropsWithoutRef<'div'>,
  keyof  PondCycleAddHarvestCommonProps> &
  PondCycleAddHarvestCommonProps;


const EditWaterQuality: FC<PropsWithChildren<PondCycleAddHarvestProps>> = ({pond, open, closeEditWaterQualityModal}) => {
  const [pondInfoData, setPondInfoData] = useState<WaterQuality>(pond)
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  const params = useParams();
  const updateHarvestData = (value: string, key: string) => {
    setPondInfoData({
      ...pondInfoData,
      [key]: Number(value)
    });
  }

  const onHandleEditPondInfo = () => {
    const data = Object.assign(pondInfoData, {'pond_id':Number(params.id)});
      post( `water-quality`, data)
        .then((res: any) => {
          closeEditWaterQualityModal();
       });
    }
  const useStyles = makeStyles({
    topScrollPaper: {
      alignItems:  matches ? "flex-center" : "flex-end"
    },
    topPaperScrollBody: {
      verticalAlign:  "bottom"
    },
    dialogPaper: {
      width: matches ? '360px!important' : '100%',
      margin:0,
      borderRadius: matches ? '15px!important' :'15px 15px 0px 0px!important',
      padding: '20px'
    },
  });
  const classes = useStyles();

  return (
    <>
        <Dialog
          title="Dialog With Actions"
          open={open}
          fullWidth
          classes={{
            scrollPaper: classes.topScrollPaper,
            paperScrollBody: classes.topPaperScrollBody,
            paper: classes.dialogPaper
          }}
          onClose={closeEditWaterQualityModal}
        >
          <Grid container columns={24} spacing={2}>
            <Grid item xs={20} spacing={2}>
              <Typography className='subtitle1 panel-text-primary' style={{ marginBottom: '0px' }}>
               Edit water Quality
              </Typography>
            </Grid>
            <Grid item  xs={4} spacing={2}>
              <Button variant="text" className='app-link-button ' onClick={closeEditWaterQualityModal}>
                <CloseIcon/>
              </Button>
            </Grid>
          </Grid>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{margin: '3vh 0 10vh 0' }}
          >
            <Grid container columns={2} spacing={2}>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  type="number"
                  variant="outlined"
                  sx={{borderColor: 'secondary.main'}}
                  defaultValue={pond?.temperature}
                  id="temperature"
                  label="Temperature"
                  onChange={(e) => updateHarvestData(e.target.value, 'temperature')}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  type="number"
                  variant="outlined"
                  sx={{borderColor: 'secondary.main'}}
                  defaultValue={pond?.ph}
                  id="ph"
                  label="PH"
                  onChange={(e) => updateHarvestData(e.target.value, 'ph')}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  type="number"
                  variant="outlined"
                  sx={{borderColor: 'secondary.main'}}
                  defaultValue={pond?.oxygen}
                  id="oxygen"
                  label="Dissolved oxygen"
                  onChange={(e) => updateHarvestData(e.target.value, 'oxygen')}
                />
              </Grid>
            </Grid>
          </Box>
          <div className='auth-footer'>
            <Button variant="contained" className='full-width app-button buttonText'
                    onClick={onHandleEditPondInfo}>SAVE</Button>
          </div>
        </Dialog>
    </>
  )
}

export default EditWaterQuality;
