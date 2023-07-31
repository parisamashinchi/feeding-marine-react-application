import React, {FC, useEffect, useState} from 'react';
import {
    Box,
    Button, Container,
    Grid, Typography,
    useMediaQuery, Divider
} from '@mui/material'

import {useNavigate} from "react-router-dom";
import PagesTemplate from '../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../components/Organisms/Header/Header';
import './PondList.scss';
import Footer from '../../../../components/Organisms/Footer/Footer';
import PondListCard from '../../../../components/Organisms/PondListCard/PondListCard';
import AddIcon from '@mui/icons-material/Add';
import HeaderSearchBox from '../../../../components/Organisms/HeaderSearchBox/HeaderSearchBox';
import { get , deleteReq} from '../../../../services/api'
import NoPond from '../../../../assets/images/no-pond.png';
import isEmpty from "lodash/isEmpty"
import AlertDialog from '../../../../components/Molecules/AlertDialog/AlertDialog'
import Dialog from '@mui/material/Dialog/Dialog'
import CloseIcon from '@mui/icons-material/Close';
import CreatePond from '../CreatePond/CreatePond'
import { makeStyles } from '@material-ui/core'

const PondList: FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [filteredPondList, setFilteredPondList] = useState([]);
    const [searchInput, setSearchInput] = useState<string>('');
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [deletedItem, setDeletedItem] = useState<number>();
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))

    const navigate = useNavigate();
    useEffect(() => {
        get('ponds').then((res: any) => {
            if (res) {
                setFilteredPondList(res.ponds)
            }
        });
    },[]);


    useEffect(() => {
        get('ponds').then((res: any) => {
            if (res) {
                setFilteredPondList(res.ponds.filter((pond: any) => pond.name.toLowerCase().includes(searchInput.toLowerCase())))
                }
            });
    }, [searchInput]);

    const onPondClick = (pondId: any) => {
        navigate(`/pond-list/${pondId}`);
    }
    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
    };
    const openDeletePondAlertDialog = (id:number) => {
        setOpenAlertDialog(true);
        setDeletedItem(id);
    }
    const onHandleDeletePond = () => {
        deleteReq( `ponds/${deletedItem}`).then((res: any) => {
            if (res) {
                get('ponds').then((res: any) => {
                    if (res) {
                        setFilteredPondList(res.ponds)
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
    const onHandleCloseEditDialog = () => {
        setOpen(false)
        get('ponds').then((res: any) => {
            if (res) {
                setFilteredPondList(res.ponds)
            }
        });
    }
    return (
      <PagesTemplate header={<Header pageTitle={'Pond List'} hasBackButton={false}/>} footer={<Footer/>} >
          <div style={{top:matches ?'-40px': '', position:'relative'}}>
          {matches ?
           <div className="search">
                <Grid container columns={24} spacing={2} className={matches ? 'filter-lg' : ''}>
                    <Grid item xs={16} sm={16} md={16} lg={16}>
                        <HeaderSearchBox setSearchInput={setSearchInput} alert={true}/>
                    </Grid>
                </Grid>
            </div>

            :   <HeaderSearchBox setSearchInput={setSearchInput} alert={false}/>
          }
          <Grid container columns={24} spacing={2} className='add-new-pond-btn' style={{marginBottom: matches ? '55px' : ''}}>
              <Grid item xs={14}  lg={20}>
                  {matches && <Typography
                    className={matches ? 'panel-text-primary heading4' : 'panel-text-primary subtitle1 '}>
                      Pond List
                  </Typography>
                  }
              </Grid>
              <Grid item xs={10}  lg={4} >
                  <Button onClick={matches ? ()=>setOpen(true) : ()=>navigate('/create-pond')} className='app-button' variant="contained" startIcon={<AddIcon/>}>
                      New Pond
                  </Button>
              </Grid>
          </Grid>
            {isEmpty(filteredPondList)
              ?
              <Grid container columns={24} spacing={2}  className={matches ? '' :'pond-list-container'} style={{marginBottom:'100px'}}>
                  <Grid item xs={24}  lg={24}>
                      <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                            marginTop: "100px"
                        }}
                      >
                          <img src={NoPond} alt="There is no Cycle" width="100"/>
                      </Box>
                      <Typography className='auth-page-title heading6'>
                          There is no pond yet
                      </Typography>
                  </Grid>
              </Grid>
              :
              <Grid container columns={6} spacing={2} className={matches ? '' :'pond-list-container'}>
                  {
                      filteredPondList && filteredPondList.map((pond: any) => {
                          return (
                            <Grid item xs={24} lg={2} key={pond.id}>
                                <PondListCard isEditable={true}
                                              title={pond.name}
                                              number={pond.number}
                                              dateTime={pond.updated_at}
                                              temperature={pond.lastWaterQuality?.temperature}
                                              status={pond.lastWaterQuality?.status}
                                              ph={pond.lastWaterQuality?.ph}
                                              oxygen={pond.lastWaterQuality?.oxygen}
                                              waterStatus={pond.lastWaterQuality?.detailed_status.qualities}
                                              handleDeletePond={() => openDeletePondAlertDialog(pond.id)}
                                              handleClickPond={() => onPondClick(pond.id)}
                                />
                            </Grid>
                          )
                      })
                  }
              </Grid>
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
                              New pond
                          </Typography>
                      </Grid>
                      <Grid item  xs={3} >
                          <CloseIcon className='panel-text-primary' onClick={() => setOpen(false)}/>
                      </Grid>
                  </Grid>
                  <CreatePond  closeDialog={onHandleCloseEditDialog} />
              </Dialog>
          }

            <AlertDialog
              open={openAlertDialog}
              dialogTitle ="Are you sure you want to delete this pond?"
              cancelText = "cancel"
              approvedText = "Delete"
              handleClose = {handleCloseAlertDialog}
              handleApproved = {onHandleDeletePond}
            />
          </div>
        </PagesTemplate>
    )
}

export default PondList;
