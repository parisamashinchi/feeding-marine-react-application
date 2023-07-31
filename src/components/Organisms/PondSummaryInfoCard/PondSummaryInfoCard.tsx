import React, { FC, PropsWithChildren} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    Typography,
} from '@mui/material';

import './PondSummaryInfoCard.scss';
import isEmpty from 'lodash/isEmpty';

interface PondSummaryInfoCardProps {
  summary: any;
}

const PondSummaryInfoCard: FC<PropsWithChildren<PondSummaryInfoCardProps>> = ({ summary }) => {
    return (
      <>
        <Grid item xs={12}  lg={4} >
          <Card className='pond-summary-info-card'>
             <CardContent>
                  <Typography className='captionText' >Feed conversion rate</Typography>
                  {!isEmpty(summary?.feedConversionRate)
                    ? <Typography className=' panel-text-primary'>
                        <span className='heading6'> {summary?.feedConversionRate}</span>
                      </Typography>
                    : <Typography className='heading6 panel-text-primary'> 0 </Typography>
                  }

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}  lg={4}>
          <Card className='pond-summary-info-card'>
            <CardContent>
              <Typography className='captionText' >Average daily growth</Typography>
                    {!isEmpty(summary?.dailyGrowth)
                    ? <Typography className=' panel-text-primary'>
                        <span className='heading6'> {summary?.dailyGrowth}</span>
                        <span className='captionText'>&nbsp; gram/days</span>
                      </Typography>
                    : <Typography className='heading6 panel-text-primary'> 0 </Typography>
                  }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}  lg={4}>
          <Card className='pond-summary-info-card'>
            <CardContent >
                  <Typography className='captionText' >Weight gain</Typography>
                  {!isEmpty(summary?.weightGain)
                    ? <Typography className=' panel-text-primary'>
                      <span className='heading6'> {summary?.weightGain}</span>
                      <span className='captionText'>&nbsp; %</span>
                    </Typography>
                    : <Typography className='heading6 panel-text-primary'> 0 </Typography>
                  }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className='pond-summary-info-card'>
            <CardContent >
                  <Typography className='captionText'>Total Feed Consumption</Typography>
                  {!isEmpty(summary?.totalFeedConsumption)
                    ? <Typography className=' panel-text-primary'>
                      <span className='heading6'> {summary?.totalFeedConsumption}</span>
                      <span className='captionText'>&nbsp; kg</span>
                    </Typography>
                    : <Typography className='heading6 panel-text-primary'> 0 </Typography>
                  }
            </CardContent>
          </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card className='pond-summary-info-card'>
              <CardContent >
                    <Typography className='captionText'>Daily Feed Consumption</Typography>
                    {!isEmpty(summary?.totalDailyFeed)
                      ? <Typography className=' panel-text-primary'>
                        <span className='heading6'> {summary?.totalDailyFeed}</span>
                        <span className='captionText'>&nbsp; kg</span>
                      </Typography>
                      : <Typography className='heading6 panel-text-primary'> 0 </Typography>
                    }
              </CardContent>
            </Card>
          </Grid>
        </>

    )
}

export default PondSummaryInfoCard;
