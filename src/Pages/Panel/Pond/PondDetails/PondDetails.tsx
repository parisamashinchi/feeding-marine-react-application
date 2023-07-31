import React, {FC, useEffect, useState} from 'react';
import {
    Button,
    Grid,
    Tab,
    Box,
    Typography,
    useMediaQuery,
    Breadcrumbs,
  Link,
} from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PagesTemplate from '../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../components/Organisms/Header/Header';
import './PondDetails.scss';
import Footer from '../../../../components/Organisms/Footer/Footer';
import PondSummary from './PondSummary/PondSummary';
import PondCycle from './PondCycle/PondCycle';
import {TabPanelProps} from '@mui/lab';
import { get } from '../../../../services/api';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog/Dialog'
import CloseIcon from '@mui/icons-material/Close';
import CycleForm from './PondCycle/CycleForm'
import { makeStyles } from '@material-ui/core'
import isEmpty from "lodash/isEmpty"

function TabPanel(props: TabPanelProps) {
    const {children, value,tabIndex, ...other} = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== tabIndex?.toString()}
            id={`simple-tabpanel-${tabIndex}`}
            aria-labelledby={`simple-tab-${tabIndex}`}
            {...other}
        >
            {value === tabIndex?.toString() && (
                <Box >
                    <div>{children}</div>
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PondDetails: FC = () => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [disable, setDisable] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>('0');
    const [pond, setPond] = useState<any>();
    const params = useParams();
    const [pondList, setPondList] = useState<any>();
    const [pondCycle, setPondCycle] = useState<any>();
    const location = useLocation();
    interface CustomizedState {
        cycle: boolean
    }
    const state = location.state as CustomizedState;
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
    useEffect(() => {
     if(state){
         setSelectedTab('1');
     }
    },[]);
    useEffect(() => {
        get(`ponds`).then((res: any) => {
            if (res) {
                setPondList(res.ponds)
                const pondIndex = res.ponds.findIndex((pond: any) => pond.id.toString() === params.id);
                if (pondIndex >= 0) {
                    setPond(res.ponds[pondIndex]);
                }
            }
        });
    },[]);


    useEffect(() => {
        get(`ponds/${params.id}/cycle`).then((res: any) => {
            if (res) {
                setPondCycle(res)
                setDisable(res && res.cycle && res.cycle.status === 3 ||  res && isEmpty(res.cycle) ? true : false)
            }
        });
    },[]);

    const updateCycle = ()=> {
        get(`ponds/${params.id}/cycle`).then((res: any) => {
            if (res) {
                setPondCycle(res)
                setDisable(res && res.cycle && res.cycle.status === 3 ||  res && isEmpty(res.cycle) ? true : false)
            }
        });
    }

    const onHandleTerminate = () => {
        setDisable(true)
    }

    const changeSelectedTab = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    }
    const onHandleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <PagesTemplate header={<Header pageTitle={'Pond Details'} hasBackButton={true}/>} footer={<Footer/>}>
            {matches &&
              <Grid container columns={24} spacing={2}>
                <Grid item  lg={20}>
                    <Breadcrumbs aria-label="breadcrumb"  separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="hover" color="inherit" href="/pond-list">
                            Pond list
                        </Link>
                        <Typography color="secondary.dark"> {pond?.name}-{pond?.number}</Typography>
                    </Breadcrumbs>
                    <Typography className='panel-text-primary heading4'>
                        {pond?.name}-{pond?.number}
                    </Typography>
                </Grid>
                  {selectedTab === '1' &&
                      <Grid item lg={4}>
                          <Button onClick={()=>setOpen(true) }
                                  className=' app-button' variant="contained" startIcon={<AddIcon/>}
                                  disabled={!disable }
                                  style={{float:'right'}}
                          >
                              NEW CYCLE
                          </Button>
                      </Grid>
                  }
              </Grid>
              }
            <TabContext value={selectedTab}>
                <Box sx={{ boxShadow: matches ? 'none ' : '0px 0px 8px #979797', width: 'calc( 100% + 32px )', marginLeft:  matches ? '0' :'-16px'}}>
                    <TabList onChange={ changeSelectedTab}>
                        <Tab style={{width: matches ? '120px' : '50%', marginRight: matches ? '60px' : ''}} label="Summary" value='0'  {...a11yProps(0)} className={matches? 'heading6 tab-btn' : 'subtitle1'} />
                        <Tab style={{width: matches ? '120px' : '50%', marginRight: matches ? '60px' : ''}} label="Cycle" value='1'  {...a11yProps(1)}  className={matches? 'heading6 tab-btn' : 'subtitle1'} />
                    </TabList>
                </Box>
                <TabPanel  value={selectedTab} tabIndex={0}>
                    {pondList && <PondSummary pondList={pondList}/>}
                </TabPanel>
                <TabPanel value={selectedTab} tabIndex={1}>
                    {pondCycle && <PondCycle pond={pond} cycle={pondCycle} disable={disable} updateCycle={updateCycle} handleTerminate={onHandleTerminate}/>}
                </TabPanel>
            </TabContext>
            {matches &&
                <Dialog
                  title="Dialog With Actions"
                  open={open}
                  fullWidth
                  classes={{
                      scrollPaper: classes.topScrollPaper,
                      paperScrollBody: classes.topPaperScrollBody,
                      paper: classes.dialogPaper
                  }}
                  onClose={onHandleCloseDialog}
                >
                    <Grid container columns={24} spacing={2} sx={{marginBottom: '20px'}}>
                        <Grid item xs={21} >
                            <Typography className='subtitle1 panel-text-primary'>
                                New cycle
                            </Typography>
                            <Typography className='subtitle1 panel-text-primary' style={{marginTop: '10px'}}>
                                Add the  New cycle
                            </Typography>
                        </Grid>
                        <Grid item  xs={3} >
                            <CloseIcon className='panel-text-primary' onClick={() => setOpen(false)}/>
                        </Grid>

                    </Grid>
                    <CycleForm pondId={pond && pond.id} edit={false} updateCycle={updateCycle} closeDialog={onHandleCloseDialog} />
                </Dialog>
            }
        </PagesTemplate>
    )
}

export default PondDetails;
