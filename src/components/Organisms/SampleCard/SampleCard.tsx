import React, {ComponentPropsWithoutRef, FC, PropsWithChildren} from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Switch
} from '@mui/material';

import './SampleCard.scss';
import CloseIcon from '@mui/icons-material/Close';

interface PondListCardCommonProps {
    schedule?: boolean;
    date: string;
    weight: number;
    disabled?: boolean;
    handleDeletePond?: () => void;
    handleChangeSwitch?: (arg0: any) => void;
}

export type PondListCardProps = Omit<ComponentPropsWithoutRef<'div'>,
    keyof PondListCardCommonProps> &
    PondListCardCommonProps;

const SampleCard: FC<PropsWithChildren<PondListCardProps>> = ({     schedule,
                                                                    date,
                                                                    weight,
                                                                    disabled,
                                                                    handleDeletePond,
                                                                    handleChangeSwitch
                                                                }) => {
  return (
        <Card className={(disabled && schedule) ? 'sample-card-disable'  : 'sample-card'}>
            <CardContent>
                <Grid container columns={24} spacing={2}>
                    <Grid item xs={6} sm={12} md={12} lg={4}>
                        <Typography className='subtitle1 panel-text-primary' >{weight} g</Typography>
                    </Grid>
                    <Grid item xs={8} sm={12} md={12} lg={4}>
                      <Typography className='subtitle1' style={{lineHeight: 1}}>{date}</Typography>
                    </Grid>
                    <Grid item xs={10} sm={12} md={12} lg={16} style={{ textAlign: 'right'}} >
                      {schedule &&
                        <Switch
                          checked={!disabled}
                          onChange={handleChangeSwitch}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                        <CloseIcon onClick={handleDeletePond} className=' panel-text-primary'/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}

export default SampleCard;
