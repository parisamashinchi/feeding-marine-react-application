import React, { FC, PropsWithChildren, useState } from 'react'
import Box from '@mui/material/Box';
import {
    Button,
    Grid,
    TextField, Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails, useMediaQuery,
} from '@mui/material'

import {post} from '../../../../services/api';
import {useNavigate} from "react-router-dom";
import PagesTemplate from '../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../components/Organisms/Header/Header';
import {pondInitialization, PondModel} from '../../../../store/pond/models/PondModel';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import './CreatePond.scss';
import AlertComponent from '../../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';
import { CycleFormProps } from '../PondDetails/PondCycle/CycleForm'
const QrReader = require('modern-react-qr-reader');

interface CreatePondCommonProps {
    closeDialog?: () => void
}
const CreatePond: FC<PropsWithChildren<CycleFormProps>> = ({ closeDialog }) => {
    const [errors, setErrors] = useState({} as any);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [newPondData, setNewPondData] = useState<PondModel>(pondInitialization);
    const [qrExpanded, setQrExpanded] = useState<boolean>(false);
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    let navigate = useNavigate();
    const updatePondData = (value: string, key: string) => {
        setNewPondData({
            ...newPondData,
            [key]: value
        });
        validate({ [key]: value });
    }
    const validate: any = (fieldValues = newPondData) => {
        let temp: any = { ...errors };
        if ("number" in fieldValues)
            temp.number = fieldValues.number ? "" : "required";
        if ("volume" in fieldValues)
            temp.volume = fieldValues.volume ? "" : "required";
        setErrors({
            ...temp
        });
    };
    const formIsValid = (fieldValues = newPondData) => {
        const isValid =
          fieldValues.number &&
          fieldValues.volume &&
          Object.values(errors).every((x) => x === "");
        return isValid;
    };

    const onCreatePond = (e:any) => {
        e.preventDefault();
        const isValid = Object.values(errors).every((x) => x === "") && formIsValid();
        if (isValid) {
            post('ponds', newPondData).then((res: any) => {
                if (res) {
                    if (res.status && res.status !== 200) {
                        setShowAlert(true)
                        let messageText = res.data.message + ' '
                        mapKeys(res.data.detail, function(value, key) {
                            messageText += value.toString()
                        });
                        setAlertMessage(messageText)
                    } else {
                        closeDialog && closeDialog();
                        navigate('/pond-list');
                    }
                }
            });
        }
    }
    const  handleScan = (data:any) => {
        if(data !== null){
            const seperate_string = data.split(';')
            const ifeed = seperate_string[0].split('/')
            const wt = seperate_string[1].split('/')
            setNewPondData({
                ...newPondData,
                ['core_id']: wt[0] === 'NP' ?  '' : wt[0],
                ['ifeed_core_id']: ifeed[0] === 'NP' ? '' : ifeed[0]
            });
        }

    }
   const  handleError =(err:any) =>{
        console.error(err)
    }

    return (
        <PagesTemplate header={matches ?  '' : <Header pageTitle={'New Pond'} hasBackButton={true}/>}>
            {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{marginBottom: matches? '2vh' :'38vh'}}
            >
                <Typography sx={{marginBottom: '10px!important', textAlign: 'left!important', marginTop: '10px'}}
                            className='panel-page-title subtitle2'  >
                    Create Your Pond
                </Typography>
                <Grid container columns={2} spacing={2} className='form'>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                            variant="outlined"
                            id="name"
                            label="Pond Name"
                            placeholder='Enter pond name...'
                            onChange={(e) => updatePondData(e.target.value, 'name')}
                        />
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                            variant="outlined"
                            required
                            type='text'
                            id="number"
                            label="Pond Number"
                            placeholder='Pond Number'
                            onChange={(e) => updatePondData(e.target.value, 'number')}
                            error={errors["number"]}
                            {...(errors["number"] && {
                                error: true,
                                helperText: errors["number"]
                            })}
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                            variant="outlined"
                            required
                            type='number'
                            id="volume"
                            label="Pond Volume"
                            placeholder='Pond Volume (m3)'
                            onChange={(e) => updatePondData(e.target.value, 'volume')}
                            error={errors["volume"]}
                            {...(errors["volume"] && {
                                error: true,
                                helperText: errors["volume"]
                            })}
                        />
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Accordion expanded={qrExpanded} onClick={() => setQrExpanded(!qrExpanded)}>
                            <AccordionSummary
                                expandIcon={<QrCodeScannerOutlinedIcon color='primary'/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography color='primary'>Scan QR Code</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className='panel-page-title bodyText2' style={{marginTop: '-26px!important'}}
                                            color='primary' variant="h5" component="h5">Place the QR code inside the
                                    area</Typography>
                                <Typography className='panel-page-title captionText' style={{marginTop: '-30px!important'}}
                                            color='primary' variant="h6" component="h6">Scanning will start
                                    automatically</Typography>
                                <div className='qr-container'>
                                    { qrExpanded &&
                                    <QrReader
                                      delay={300}
                                      facingMode={"environment"}
                                      onError={handleError}
                                      onScan={handleScan}
                                      className='qr-camera'
                                    />
                                    }
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                            variant="outlined"
                            type='text'
                            id="qrCode"
                            label="Water quality device Id"
                            placeholder='Water quality device Id'
                            onChange={(e) => updatePondData(e.target.value, 'core_id')}
                            value={newPondData.core_id }
                        />
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <TextField
                          variant="outlined"
                          type='text'
                          id="qrCode"
                          label=" ifeed device Id"
                          placeholder='ifeed device Id'
                          onChange={(e) => updatePondData(e.target.value, 'ifeed_core_id')}
                          value={newPondData.ifeed_core_id }
                        />
                    </Grid>
                </Grid>
            </Box>

            <div  className='auth-footer'>
                <Button variant="contained" className='full-width app-button'
                        onClick={onCreatePond} disabled={!formIsValid()}>Create Pond</Button>
            </div>
        </PagesTemplate>
    )
}

export default CreatePond;
