import React, { FC, useEffect, useState } from 'react'
import PagesTemplate from '../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../components/Organisms/Header/Header';
import Footer from '../../../../components/Organisms/Footer/Footer';
import {
  Autocomplete,
  Box,
  Button, Divider,
  Grid,
  List, ListItem,
  TextField,
  Typography, useMediaQuery,
} from '@mui/material'
import { get, post } from '../../../../services/api'
import Counter from '../../../../components/Molecules/Counter/Counter'
import SmSActive from '../../../../assets/images/smsActive.png';
import InputMask from 'react-input-mask';
import isEmpty from 'lodash/isEmpty'
import mapKeys from "lodash/mapKeys"
import MuiPhoneNumber from 'material-ui-phone-number';


const Alert: FC = () => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertCounter, setAlertCounter] = useState<number>(Date.now() + 120000);
    const [user, setUser] = useState<any>();
    const [phone, setPhone] = useState<string>();
    const [code, setCode] = useState<string>('');
    const [showCounter, setShowCounter] = useState<boolean>(false);
    const [activateCode, setActivateCode] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [changeNumber, setChangeNumber] = useState<boolean>(false);
    const [hasPhone, setHasPhone] = useState<boolean>();

    useEffect(() => {
        get('user').then((res: any) => {
            if (res) {
                setUser(res.user);
                if(!isEmpty(res.user?.phone)){
                  setHasPhone(true);
                }
            }
        });
    },[]);

    const onHandleSendPhone = () => {
      post( `phone/verify`, {phone: phone})
        .then((res: any) => {
          setActivateCode(true)
          setShowCounter(true)
        });
    }
    const handleCompleteCounter = () => {
      setShowCounter(false)
    }

    const onHandleChangeNumber = () => {
      setHasPhone(false)
      setShowMessage(false)
      setActivateCode(false)
      setChangeNumber(true)
    }
    const onHandleSendActivationCode = () => {
      post( `phone/confirm`, {phone: phone, code: code && code.replace( /\s/g, '')})
        .then((res: any) => {
          if (res.status && res.status !== 200) {
            setShowAlert(true)
            let messageText = res.data.message + ' '
            mapKeys(res.data.detail, function(value: any) {
              messageText += value.toString()
            });
            setAlertMessage(messageText)
          } else {
            setShowMessage(true)
          }
        });
    }
    const handleOnChange = (value:any) => {
      setPhone(value)
    }
    return (
        <PagesTemplate header={matches ? ' ' : <Header pageTitle={'Alert Setting'} hasBackButton={true} />} footer={matches? '' :<Footer/>}>
          {hasPhone
          ? <Grid container columns={24} spacing={2} className='profile-container' style={{ marginTop: '10px' }}>
              <Grid item xs={24}>
                <Typography className='subtitle1 panel-text-primary'>
                  The SMS is active
                </Typography>
              </Grid>
              <Grid item xs={24} lg={8} xl={6} spacing={2}>
                <List>
                  <ListItem
                    key='Phone number'
                    disableGutters
                  >
                    <Grid item xs={10}>
                      <Typography className="subtitle2" align="left" style={{color:'#666666'}}>
                        Phone number :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Divider style={{ width: '100%' }}/>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography className="subtitle2 panel-text-primary" align="right">
                        { user && user.phone}
                      </Typography>
                    </Grid>
                  </ListItem>
                </List>
                <Button variant="outlined" className=' app-button' style={{ float:  'right' }} onClick={onHandleChangeNumber}>CHANGE NUMBER</Button>
              </Grid>
            </Grid>
          : !activateCode && !showMessage
            ? <>
              <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ margin: '3vh 0 4vh 0' }}
            >
              <Grid container columns={24} spacing={2} className='profile-container' style={{ marginTop: '10px' }}>
                <Grid item xs={24}>
                  <Typography
                    className='subtitle1 panel-text-primary'>
                    {!activateCode && !changeNumber
                       ? 'Activate SMS Alerts'
                        : !activateCode && changeNumber
                        ? 'change your phone number'
                          : ''
                    }
                  </Typography>
                </Grid>


                <Grid item xs={24}  lg={7} xl={12}>
                  <MuiPhoneNumber
                    defaultCountry={'om'}
                    label="Phone Number"
                    variant="outlined"
                    sx={{ borderColor: 'secondary.main',width : matches ? '328px!important' :'100%'}}
                    onChange={handleOnChange}
                  />
                </Grid>
              </Grid>
            </Box>
             <Grid item xs={24} lg={7} xl={5} >
                  <Button variant = "contained" className='full-width app-button buttonText' onClick={onHandleSendPhone}  >
                  Next
                  </Button>
                  <Typography className='bodyText1 panel-text-primary' style={{textAlign: 'center', marginTop: '10px'}}>
                  We will send you an "Activation Code"
                  </Typography>
              </Grid>
            </>
            : activateCode && !showMessage
            ? <>
              <Grid container columns={24} spacing={2} className='profile-container' style={{ marginTop: '10px' }}>
                <Grid item xs={24} >
                  <Typography className='subtitle1 panel-text-primary'>
                    Enter your Activate code
                  </Typography>
                </Grid>
                <Grid item xs={24}  lg={7}>
                  <InputMask
                    mask="       9     9     9     9     9     9    9    9"
                    onChange={(e) => setCode(e.target.value.replace( /\s/g, ''))}
                  >
                    {() => <TextField   label="Activation code"  sx={{width : matches ? '328px!important' :'100%'}}/>}
                  </InputMask>
                </Grid>
              </Grid>
              <Grid item xs={24} lg={7} xl={5} >
              <Button variant ="contained"
                      className='full-width app-button buttonText'
                      onClick={onHandleSendActivationCode}
                      style={{ marginTop: '20px'}}
              >
                Send
              </Button>
                {showCounter
                  ? <Typography className="counter"  style={{ marginTop: '10px' }}>
                    <Counter  alertCounter = {alertCounter} completeCounter={handleCompleteCounter}/>
                  </Typography>
                  : <>
                    <Typography className='subtitle1 panel-text-primary'
                                style={{ textAlign: 'center', marginTop: '10px' }}>
                      Didn't receive the code?
                    </Typography>
                    < Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                  }}
                    >
                      <Button variant="text" className='subtitle2' style={{textTransform: 'none'}} onClick={onHandleSendPhone}>
                        Resend
                      </Button>
                       <Button variant="text" className='subtitle2' style={{textTransform: 'none'}} onClick={onHandleChangeNumber} >
                        Change number
                      </Button>
                  </Box>
                    </>
                }
              </Grid>
            </>
              :  <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: '70px'
                  }}
                >
                  <img src={SmSActive} style={{ margin: '0 auto' }}/>
                </Box>
                <Typography className='heading5 panel-text-primary' style={{textAlign: 'center'}}> The SMS is active </Typography>
              </>
          }
        </PagesTemplate>
    )
};

export default Alert;
