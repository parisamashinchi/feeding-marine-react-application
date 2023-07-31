import React, {ComponentPropsWithoutRef, FC, PropsWithChildren} from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText, Divider, useMediaQuery,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import './PondCycleInfoCard.scss';
import moment from 'moment';

interface PondCycleInfoCardCommonProps {
  info: {
    start_date:string,
    finish_date: string,
    target_weight: number,
    total_seeds: number,
    age: number,
    initial_average_weight: number,
    species:{
      initial_weight: number,
      target_weight: number,
      type:string
    }
  }
  openEditDialog: () => void
}

export type PondCycleInfoCardProps = Omit<ComponentPropsWithoutRef<'div'>,
    keyof  PondCycleInfoCardCommonProps> &
  PondCycleInfoCardCommonProps;

const PondCycleInfoCard: FC<PropsWithChildren<PondCycleInfoCardProps>> = ({info, openEditDialog}) => {
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  return (
        <Card className='pond-card'>
            <CardContent style={{padding: '0 16px'}}>
                <Grid container columns={24} spacing={2}>
                    <Grid item xs={24} lg={24} >
                        <List>
                            <ListItem
                              key='CycleInfo'
                              disableGutters
                              secondaryAction={
                                  <IconButton>
                                      <EditIcon onClick={openEditDialog} className='edit-icon' />
                                  </IconButton>
                              }
                            >
                                <ListItemText className="subtitle1 panel-text-primary" primary='Cycle info' />
                            </ListItem>
                            <ListItem
                                key='Species'
                                disableGutters
                                sx={{ width: matches ? '45%' : '100%' , display: matches ? 'inline-flex' : 'flex'}}
                              >
                              <Grid item xs={6} lg={4}>
                                <Typography className="subtitle2" align="left">
                                  Species :
                                </Typography>
                              </Grid>
                              <Grid item xs={12} lg={16}>
                                <Divider style={{ width: '100%' }}/>
                              </Grid>
                              <Grid item xs={6} lg={4}>
                                <Typography className="subtitle2 panel-text-primary" align="right">
                                  { info && info.species.type}
                                </Typography>
                              </Grid>
                            </ListItem>
                            <ListItem
                              key='totalSeeds'
                              disableGutters
                              sx={{ width: matches ? '45%' : '100%' , display: matches ? 'inline-flex' : 'flex', marginLeft:  matches ? '80px' : 0}}
                              >
                              <Grid item xs={8} lg={4}>
                                <Typography className="subtitle2" align="left">
                                  Total Seeds:
                                </Typography>
                              </Grid>
                              <Grid item xs={12} lg={16}>
                                <Divider style={{ width: '100%' }}/>
                              </Grid>
                              <Grid item xs={4} >
                                <Typography className="subtitle2 panel-text-primary" align="right">
                                  {info && info.total_seeds}
                                </Typography>
                              </Grid>
                            </ListItem>
                            <ListItem
                              key='age'
                              disableGutters
                              sx={{ width: matches ? '45%' : '100%' , display: matches ? 'inline-flex' : 'flex'}}
                            >
                              <Grid item xs={3} lg={2}>
                                <Typography className="subtitle2" align="left">
                                  Age:
                                </Typography>
                              </Grid>
                              <Grid item xs={15} lg={18}>
                                <Divider style={{ width: '100%' }}/>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography className="subtitle2 panel-text-primary" align="right">
                                  {info && info.age} days
                                </Typography>
                              </Grid>
                            </ListItem>
                            <ListItem
                              key='initialAvgWeight'
                              disableGutters
                              sx={{ width: matches ? '45%' : '100%' , display: matches ? 'inline-flex' : 'flex', marginLeft:  matches ? '80px' : 0}}
                            >
                              <Grid item xs={10} lg={6}>
                                <Typography className="subtitle2" align="left">
                                  Initial AVG weight:
                                </Typography>
                              </Grid>
                              <Grid item xs={10} lg={14}>
                                <Divider style={{ width: '100%' }}/>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography className="subtitle2 panel-text-primary" align="right">
                                  {info && info.initial_average_weight} g
                                </Typography>
                              </Grid>
                            </ListItem>
                            <ListItem
                              key='TargetCultivation'
                              disableGutters
                              sx={{ width: matches ? '45%' : '100%' , display: matches ? 'inline-flex' : 'flex'}}
                            >
                              <Grid item xs={10} lg={6}>
                                <Typography className="subtitle2" align="left">
                                  Total  Cultivation:
                                </Typography>
                              </Grid>
                              <Grid item xs={8} lg={14}>
                                <Divider style={{ width: '100%' }}/>
                              </Grid>
                              <Grid item xs={6} lg={4}>
                                <Typography className="subtitle2 panel-text-primary" align="right">
                                  {info && moment(info.finish_date).diff(moment(info.start_date), "days")+1} days
                                </Typography>
                              </Grid>
                            </ListItem>
                            <ListItem
                              key="TargetWeight"
                              disableGutters
                              sx={{ width: matches ? '45%' : '100%' , display: matches ? 'inline-flex' : 'flex', marginLeft:  matches ? '80px' : 0}}
                            >
                              <Grid item xs={8} lg={5}>
                                <Typography className="subtitle2" align="left">
                                  Target weight:
                                </Typography>
                              </Grid>
                              <Grid item xs={12} lg={15}>
                                <Divider style={{ width: '100%' }}/>
                              </Grid>
                              <Grid item xs={4}>
                                <Typography className="subtitle2 panel-text-primary" align="right">
                                  {info && info.target_weight} g
                                </Typography>
                              </Grid>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PondCycleInfoCard;
