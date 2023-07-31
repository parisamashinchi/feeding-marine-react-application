import React, { ComponentPropsWithoutRef, FC, PropsWithChildren, useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography, useMediaQuery, Divider, ListItem,
} from '@mui/material'

import './PondSummaryCard.scss';
import EditIcon from '@mui/icons-material/Edit';

interface PondSummaryCardCommonProps {
    pond: any;
    handleEditPondInfo: () => void;
}

export type PondSummaryCardProps = Omit<ComponentPropsWithoutRef<'div'>,
    keyof PondSummaryCardCommonProps> &
    PondSummaryCardCommonProps;

const PondSummaryCard: FC<PropsWithChildren<PondSummaryCardProps>> = ({   pond,
                                                                          handleEditPondInfo
                                                                      }) => {
  const [summaryData, setSummaryData] = useState(pond);
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  useEffect(() => {
    setSummaryData(pond)
  },[pond]);

  return (
        <Card className='pond-card'>
            <CardContent style={{padding: '16px'}}>
                <Grid container columns={24} spacing={2}>
                  {
                    !matches
                    ? <>
                        <Grid item xs={10} sm={8} md={8} >
                          <Typography className='subtitle1 panel-text-primary'
                                      style={{marginBottom: '0px'}}>{summaryData?.name}-{summaryData?.number}</Typography>
                        </Grid>
                        <Grid item xs={11} sm={12} md={12}>
                          <span className='subtitle2' style={{marginBottom: '0px'}}>Volume: {summaryData && summaryData.volume}</span>
                          <span className="overlineText">&nbsp;m3</span>
                        </Grid>
                        <Grid item xs={3} sm={4} md={4}>
                          <EditIcon onClick={handleEditPondInfo}  className='edit-icon'/>
                        </Grid>
                    </>
                      :
                      <>
                        <Grid item lg={22} >
                          <Typography className='subtitle1 panel-text-primary' style={{marginBottom: '0px'}}>
                            {summaryData?.name}-{summaryData?.number}
                          </Typography>
                        </Grid>
                        <Grid item lg={2}>
                          <EditIcon onClick={handleEditPondInfo}  className='edit-icon'/>
                        </Grid>

                        <Grid item xs={4}>
                          <Typography className="subtitle2" align="left">
                            Volume:
                          </Typography>
                        </Grid>
                        <Grid item xs={16}>
                          <Divider style={{ marginTop:'18px' }}/>
                        </Grid>
                        <Grid item xs={4} >
                          <Typography color='secondary.dark' align="right" style={{ lineHeight: '1.5' }}>
                            <span className='subtitle2'>  {summaryData && summaryData.volume}</span>
                            <span className="overlineText">&nbsp;m3</span>
                          </Typography>
                        </Grid>
                      </>
                  }

                </Grid>
            </CardContent>
        </Card>
    )
}

export default PondSummaryCard;
