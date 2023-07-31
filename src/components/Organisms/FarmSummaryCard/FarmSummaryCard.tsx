import React, {FC, PropsWithChildren} from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button, useMediaQuery,
} from '@mui/material'

import './FarmSummaryCard.scss';
import CardIconWithBG from '../../Atoms/CardIconWithBG/CardIconWithBG';

interface FarmSummaryCardProps {
    image: string;
    iconColor: string;
    bgColor: string;
    iconBGColor: string;
    title: string;
    description: string;
}

const FarmSummaryCard: FC<PropsWithChildren<FarmSummaryCardProps>> = ({
                                                                          image,
                                                                          iconColor,
                                                                          bgColor,
                                                                          iconBGColor,
                                                                          title,
                                                                          description
                                                                      }) => {
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  return (
        <Card style={{backgroundColor: bgColor}} className='farm-card'>
            <CardContent>
                <Grid container columns={24} spacing={2}  sx={{marginLeft: '0px'}}>
                    <Grid item xs={6} lg={5} xl={4}>
                        <CardIconWithBG
                            size={'40px'}
                            imageUrl={image}
                            color={iconColor}
                            iconBGColor={iconBGColor}
                            margin={8}
                            radius={15}
                        />
                    </Grid>
                    <Grid item xs={18} lg={19} xl={20}>
                        <Typography className={matches ? 'card-title subtitle1' : 'card-title bodyText2'} style={{lineHeight:'1'}}>
                            {title}
                        </Typography>
                        <Typography className="panel-text-primary">
                          <span className='heading6'>{description}</span>
                            <span className="captionText">&nbsp;kg</span>
                        </Typography>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}

export default FarmSummaryCard;
