import React, { FC, useEffect, useState } from 'react'
import PagesTemplate from '../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../components/Organisms/Header/Header';
import Footer from '../../../components/Organisms/Footer/Footer';
import { Grid, Typography, Divider, List, ListItem, ListItemText, useMediaQuery, Box, Tab } from '@mui/material'
import './Profile.scss';
import { post, get } from '../../../services/api'
import { useNavigate } from 'react-router'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AlertDialog from '../../../components/Molecules/AlertDialog/AlertDialog'
import TabContext from '@mui/lab/TabContext/TabContext'
import TabList from '@mui/lab/TabList'
import { TabPanelProps } from '@mui/lab'
import Dialog from '@mui/material/Dialog/Dialog'
import EditProfile from './EditProfile'
import Language from './Language/Language'
import { makeStyles } from '@material-ui/core'
import Units from './Units/Units'
import Alert from './Alert/Alert'
import Farm from '../Farm/CreateFarm'

const Profile: FC = () => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [selectedTab, setSelectedTab] = useState<string>('0');
    const [user, setUser] = useState<any>();
    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    let navigate = useNavigate();

    useEffect(() => {
        get('user').then((res: any) => {
            if (res) {
                setUser(res.user)
            }
        });
    },[]);
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        get('user').then((res: any) => {
            if (res) {
                setUser(res.user)
            }
        });
    };
    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
    };
    const openLogOutAlertDialog = () => {
        setOpenAlertDialog(true);
    }
    const onHandleLogOut = () => {
        post( `logout`).then((res: any) => {
            if (res) {
                localStorage.setItem('token', '');
                setOpenAlertDialog(false);
                navigate('/auth/login');
            }
        });
    }

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
        }
    }

    const changeSelectedTab = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    }
    const handleDownload = () => {
        var axios = require('axios');
        var config = {
            method: 'post',
            url: 'https://api-staging-ifeed.ilabmarine.com/export',
            responseType: 'arraybuffer',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        };
        axios(config)
          .then(function (res:any) {
              const path= window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement('a');
              link.href = path;
              link.setAttribute('download', 'data.zip');
              document.body.appendChild(link);
              link.click();
          })
    }
    const useStyles = makeStyles({
        topScrollPaper: {
            alignItems: 'flex-center'
        },
        topPaperScrollBody: {
            verticalAlign: "top"
        },
        dialogPaper: {
            width:  '450px!important',
            borderRadius:  '15px!important',
            padding: '0 0 40px 0px!important'
        },
    });
    const classes = useStyles();
    const Data  = () =>{
        return <List className={matches ? 'data-items-desktop' : 'data-items'}>
            <ListItem onClick={ ()=>window.location.replace('http://www.ilabmarine.com')} >
                <ListItemText  primary="Terms & Conditions"/>
            </ListItem>
            <ListItem onClick={ ()=>window.location.replace('http://www.ilabmarine.com')} >
                <ListItemText primary="Privacy Terms" />
            </ListItem>
            <ListItem onClick={()=>handleDownload()}>
                <ListItemText  primary="Request Data Download" />
            </ListItem>
            {!matches &&
            <ListItem onClick={() => openLogOutAlertDialog()} style={{cursor:'pointer'}} >
                <ListItemText primary="Log out"/>
            </ListItem>
            }
        </List>
    }
     return (
        <PagesTemplate header={<Header pageTitle={'Profile'} hasBackButton={false}/>} footer={<Footer/>}>
            {!matches
              ? <Grid container columns={2} spacing={2}  className='profile-container' >
                  <Grid item xs={2} sm={2} md={2} lg={2}>
                      <Typography className='auth-page-title heading6' style={{marginTop: '10px'}}>
                          {user?.fullName}
                          <EditIcon  style={{ color: '#045C77', height:'16px' }}  onClick={()=>navigate('/edit-profile',{ state: { name: user?.fullName }} )}/>
                      </Typography>
                      <Typography className='auth-page-title bodyText2' >
                          {user?.email}
                      </Typography>
                      <Divider />
                      <List>
                          <ListItem
                            onClick={()=>navigate('/create-farm' ,{ state: { edit: true }})}
                            secondaryAction={
                                <IconButton edge="end" aria-label="Forward" >
                                    <ArrowForwardIosIcon  style={{height: '12px'}} />
                                </IconButton>
                            }
                          >
                              <ListItemText primary="My Farm"/>
                          </ListItem>
                          <ListItem
                            onClick={()=>navigate('/language')}
                            secondaryAction={
                                <IconButton edge="end" aria-label="Forward">
                                    <ArrowForwardIosIcon style={{height: '12px'}} />
                                </IconButton>
                            }
                          >
                              <ListItemText primary="Language"/>
                          </ListItem>
                          <ListItem
                            onClick={()=>navigate('/units')}
                            secondaryAction={
                                <IconButton edge="end" aria-label="Forward" >
                                    <ArrowForwardIosIcon style={{height: '12px'}} />
                                </IconButton>
                            }
                          >
                              <ListItemText primary="Units"/>
                          </ListItem>
                          <ListItem
                            onClick={()=>navigate('/profile-alert')}
                            secondaryAction={
                                <IconButton edge="end" aria-label="Forward"  >
                                    <ArrowForwardIosIcon style={{height: '12px'}} />
                                </IconButton>
                            }
                          >
                              <ListItemText primary="Alerts Setting"/>
                          </ListItem>
                      <Divider />
                      <ListItem>
                          <ListItemText primary="Data & Privacy"/>
                      </ListItem>
                      </List>
                     <Data/>
                  </Grid>
                </Grid>
              :  <TabContext value={selectedTab} >
                  <Box  className='profile-tab' >
                      <TabList onChange={ changeSelectedTab}>
                          <Tab style={{width: matches ? 'auto' : '50%'}} label="Account Info" value='0'  {...a11yProps(0)} className={matches? 'heading6' : 'subtitle1'} />
                          <Tab style={{width: matches ? 'auto' : '50%'}} label="My Farm" value='1'  {...a11yProps(1)}  className={matches? 'heading6' : 'subtitle1'} />
                          <Tab style={{width: matches ? 'auto' : '50%'}} label="Language" value='2'  {...a11yProps(1)}  className={matches? 'heading6' : 'subtitle1'} />
                          <Tab style={{width: matches ? 'auto' : '50%'}} label="Units" value='3'  {...a11yProps(1)}  className={matches? 'heading6' : 'subtitle1'} />
                          <Tab style={{width: matches ? 'auto' : '50%'}} label="Alert Setting" value='4'  {...a11yProps(1)}  className={matches? 'heading6' : 'subtitle1'} />
                          <Tab style={{width: matches ? 'auto' : '50%'}} label="Data & privacy" value='5'  {...a11yProps(1)}  className={matches? 'heading6' : 'subtitle1'} />
                      </TabList>
                  </Box>
                  <TabPanel  value={selectedTab} tabIndex={0} className='profile-tab-panel subtitle1'>
                      <Typography className='panel-text-primary subtitle1' style={{marginTop: '10px'}}>
                          {user?.fullName}
                          <EditIcon  style={{ color: '#045C77', height:'16px' ,cursor:'pointer'}}
                                     onClick={()=>setOpenEditDialog(true )}/>
                      </Typography>
                      <Typography className='panel-text-primary subtitle1' >
                          {user?.email}
                      </Typography>
                      <Typography onClick={()=>openLogOutAlertDialog()} className='subtitle1' style={{color:'#00a5a5', cursor:'pointer'}}>
                          Log out
                      </Typography>
                  </TabPanel>
                  <TabPanel value={selectedTab} tabIndex={1}>
                      <Farm edit={true} />
                  </TabPanel>
                  <TabPanel value={selectedTab} tabIndex={2}>
                      <Language />
                  </TabPanel>
                  <TabPanel value={selectedTab} tabIndex={3}>
                      <Units />
                  </TabPanel>
                  <TabPanel value={selectedTab} tabIndex={4}>
                      <Alert />
                  </TabPanel>
                  <TabPanel value={selectedTab} tabIndex={5}>
                      <Data/>
                  </TabPanel>
              </TabContext>

            }
            <Dialog
                  title="Dialog With Actions"
                  open={openEditDialog}
                  fullWidth
                  classes={{
                      scrollPaper: classes.topScrollPaper,
                      paperScrollBody: classes.topPaperScrollBody,
                      paper: classes.dialogPaper
                  }}
                  onClose={handleCloseEditDialog}
                >
                <EditProfile closeEditDialog={handleCloseEditDialog}  user={user?.fullName} />
            </Dialog>
            <AlertDialog
              open={openAlertDialog}
              dialogTitle ="Log out of ilab?"
              dialogText= "Remember my login info"
              cancelText = "CANCEL"
              approvedText = "LOG OUT"
              handleClose = {handleCloseAlertDialog}
              handleApproved = {onHandleLogOut}
            />

        </PagesTemplate>

    )
};

export default Profile;
