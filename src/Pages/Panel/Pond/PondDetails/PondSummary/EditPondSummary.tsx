import React, { ComponentPropsWithoutRef, FC, PropsWithChildren, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField, useMediaQuery,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import {makeStyles } from '@material-ui/core/styles';
import { post, setHeaderToken } from '../../../../../services/api'
import { PondInfo } from '../../../../../store/pond/models/PondModel'
import { useParams } from 'react-router'
import { put, get } from '../../../../../services/api'

interface PondCycleAddHarvestCommonProps {
  pond:{
    name: string;
    number: string;
    volume: string;
  };
  open: boolean;
  closeEditPondInfoModal: () => void,
}

export type PondCycleAddHarvestProps = Omit<ComponentPropsWithoutRef<'div'>,
  keyof  PondCycleAddHarvestCommonProps> &
  PondCycleAddHarvestCommonProps;


const EditSummaryInfoCard: FC<PropsWithChildren<PondCycleAddHarvestProps>> = ({pond, open, closeEditPondInfoModal}) => {
  const [pondInfoData, setPondInfoData] = useState<PondInfo>(pond)
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  const params = useParams();
  const updateHarvestData = (value: string, key: string) => {
    setPondInfoData({
      ...pondInfoData,
      [key]: value
    });
  }

  const onHandleEditPondInfo = () => {
      put( `ponds/${params.id}`, pondInfoData)
        .then((res: any) => {
          closeEditPondInfoModal();
       });
    }

  const useStyles = makeStyles({
    topScrollPaper: {
      alignItems:  matches ? "flex-center" : "flex-end"
    },
    topPaperScrollBody: {
      verticalAlign: "bottom"
    },
    dialogPaper: {
      width: matches ? '360px!important': '100%',
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
          onClose={closeEditPondInfoModal}
        >
          <Grid container columns={24} spacing={2}>
            <Grid item xs={20} spacing={2}>
              <Typography className='subtitle1 panel-text-primary' style={{ marginBottom: '0px' }}>
               Edit pond info
              </Typography>
            </Grid>
            <Grid item  xs={4} spacing={2}>
              <Button variant="text" className='app-link-button ' onClick={closeEditPondInfoModal}>
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
                  variant="outlined"
                  sx={{borderColor: 'secondary.main'}}
                  defaultValue={pond.name}
                  id="name"
                  label="Pond Name"
                  onChange={(e) => updateHarvestData(e.target.value, 'name')}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  variant="outlined"
                  sx={{borderColor: 'secondary.main'}}
                  defaultValue={pond.number}
                  id="number"
                  label="Pond Number"
                  onChange={(e) => updateHarvestData(e.target.value, 'number')}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <TextField
                  variant="outlined"
                  sx={{borderColor: 'secondary.main'}}
                  defaultValue={pond.volume}
                  id="volume"
                  label="Pond Volume"
                  onChange={(e) => updateHarvestData(e.target.value, 'volume')}
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

export default EditSummaryInfoCard;
