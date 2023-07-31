import React, {ComponentPropsWithoutRef, FC, PropsWithChildren, useState} from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography, useMediaQuery,
} from '@mui/material'

import './PondListCard.scss';
import CardIconWithText from '../../Molecules/CardIconWithText/CardIconWithText';
import ThermostatGreenIcon from '../../../assets/images/thermostat-green.svg';
import ThermostatGrayIcon from '../../../assets/images/thermostat-gray.svg';
import PHGreenIcon from '../../../assets/images/ph-green.svg';
import PHGrayIcon from '../../../assets/images/ph-gray.svg';
import HDRGreenIcon from '../../../assets/images/hdr-green.svg';
import ThermostatOrangeIcon from '../../../assets/images/thermostat-orange.svg';
import PHOrangeIcon from '../../../assets/images/ph-orange.svg';
import HDROrangeIcon from '../../../assets/images/hdr-orange.svg';
import ThermostatRedIcon from '../../../assets/images/thermostat-red.svg';
import PHRedIcon from '../../../assets/images/ph-red.svg';
import HDRRedIcon from '../../../assets/images/hdr-red.svg';
import HDRGrayIcon from '../../../assets/images/hdr-gray.svg';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'


interface PondListCardCommonProps {
    title: string;
    number?: string;
    dateTime: string;
    temperature: number;
    status: number;
    ph: number;
    oxygen: number;
    waterStatus:{
      DO: number
      Temperature: number
      pH: number
    };
    handleDeletePond?: () => void;
    handleClickPond?: ()=> void;
    handleEditWaterQuality?: () => void
    isEditable: boolean;
}

export type PondListCardProps = Omit<ComponentPropsWithoutRef<'div'>,
    keyof PondListCardCommonProps> &
    PondListCardCommonProps;

const PondListCard: FC<PropsWithChildren<PondListCardProps>> = ({
                                                                    title,
                                                                    number,
                                                                    dateTime,
                                                                    temperature,
                                                                    status,
                                                                    ph,
                                                                    oxygen,
                                                                    waterStatus,
                                                                    handleDeletePond,
                                                                    handleClickPond,
                                                                    handleEditWaterQuality,
                                                                    isEditable
                                                                }) => {
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))

  return (
        <Card className='pond-card'>
            <CardContent style={{padding: '16px'}}>
                <Grid container columns={24} spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography className='subtitle1 panel-text-primary'
                                    style={{marginBottom: '0px'}}
                                    onClick={handleClickPond}
                        >
                          {title !== 'Water Quality'
                            ? title  + '-'  + number
                            : title
                          }
                        </Typography>
                      { title !== 'Water Quality' &&
                      <Typography className='captionText' style={{ marginTop: '2px' }}>
                        Status:
                        <span style={{
                          color: (status === 0 || status === undefined ) ? ' gray' : status === 1 ? '#27AE60' : status === 2 ? '#FFAC32' : '#F55B5D',
                          fontWeight: 600
                        }}>
                          {(status === 0 || status === undefined) ? ' Invalid' : status === 1 ? ' Normal' : status === 2 ? ' Critical' : ' Danger'}
                          </span>
                      </Typography>
                      }
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ textAlign: 'right'}} >
                      {title === 'Water Quality'
                        ? <EditIcon onClick={handleEditWaterQuality} className='edit-icon'/>
                        : <>
                        <DeleteIcon onClick={handleDeletePond} style={{color: '#B3B3B3'}} />
                          <Typography className='captionText' style={{ marginTop: '2px' }}>{dateTime && moment(dateTime).format("hh:mm ")}</Typography>
                        </>
                      }
                    </Grid>
                </Grid>
                <Grid container columns={24} spacing={1} sx={{marginTop: '0px'}}>
                  {matches && title === 'Water Quality' &&
                    <Grid item  lg={6}  onClick={handleClickPond}>
                      <Typography className='captionText' style={{ marginTop: '20px' }}>
                        Status:
                        <span style={{
                          color: status === 0 ? ' gray' : status === 1 ? '#27AE60' : status === 2 ? '#FFAC32' : '#F55B5D',
                          fontWeight: 600
                        }}>
                            {status === 0 ? ' Invalid' : status === 1 ? ' Normal' : status === 2 ? ' Critical' : ' Danger'}
                            </span>
                      </Typography>
                    </Grid>
                  }
                    <Grid item xs={ 8 } lg={title === 'Water Quality' ? 6 : 8 } onClick={handleClickPond}>
                        <CardIconWithText
                            iconBGColor={(waterStatus?.Temperature === 0 || isEmpty(waterStatus) ) ? 'lightGray' : waterStatus?.Temperature === 1 ? '#27AE6026' : waterStatus?.Temperature === 2 ? '#FFAC3233' : '#F55B5D33'}
                            color={(waterStatus?.Temperature === 0 || isEmpty(waterStatus) ) ? 'gray' : waterStatus?.Temperature === 1 ? '#27AE60' : waterStatus?.Temperature === 2 ? '#FFAC32' : '#F55B5D'}
                            imageUrl={(waterStatus?.Temperature === 0 || isEmpty(waterStatus) ) ? ThermostatGrayIcon : waterStatus?.Temperature === 1 ? ThermostatGreenIcon : waterStatus?.Temperature === 2 ? ThermostatOrangeIcon : ThermostatRedIcon}
                            unitText={'°C'}
                            value={temperature}
                        />
                    </Grid>
                    <Grid item xs={ 8 } lg={title === 'Water Quality' ? 6 : 8 }  onClick={handleClickPond}>
                        <CardIconWithText
                            iconBGColor={(waterStatus?.pH === 0 || isEmpty(waterStatus) ) ? 'lightGray' : waterStatus?.pH === 1 ? '#27AE6026' : waterStatus?.pH  === 2 ? '#FFAC3233' : '#F55B5D33'}
                            color={(waterStatus?.pH === 0 || isEmpty(waterStatus) ) ? 'gray' : waterStatus?.pH  === 1 ? '#27AE60' : waterStatus?.pH  === 2 ? '#FFAC32' : '#F55B5D'}
                            imageUrl={(waterStatus?.pH === 0 || isEmpty(waterStatus) ) ? PHGrayIcon : waterStatus?.pH  === 1 ? PHGreenIcon : waterStatus?.pH  === 2 ? PHOrangeIcon : PHRedIcon}
                            unitText={'PH'}
                            value={ph}
                        />
                    </Grid>
                    <Grid item xs={ 8 } lg={title === 'Water Quality' ? 6 : 8 }  onClick={handleClickPond}>
                        <CardIconWithText
                            iconBGColor={(waterStatus?.DO === 0 || isEmpty(waterStatus) ) ? 'lightGray' : waterStatus?.DO  === 1 ? '#27AE6026' : waterStatus?.DO === 2 ? '#FFAC3233' : '#F55B5D33'}
                            color={(waterStatus?.DO === 0 || isEmpty(waterStatus) ) ? 'gray' : waterStatus?.DO === 1 ? '#27AE60' : status === 2 ? '#FFAC32' : '#F55B5D'}
                            imageUrl={(waterStatus?.DO === 0 || isEmpty(waterStatus) ) ? HDRGrayIcon : waterStatus?.DO === 1 ? HDRGreenIcon : waterStatus?.DO === 2 ? HDROrangeIcon : HDRRedIcon}
                            unitText={'mg/L'}
                            value={oxygen}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}

export default PondListCard;
