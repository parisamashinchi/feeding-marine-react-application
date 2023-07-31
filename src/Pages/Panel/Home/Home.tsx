import React, { FC, useEffect, useState } from 'react'
import PagesTemplate from '../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../components/Organisms/Header/Header';
import Footer from '../../../components/Organisms/Footer/Footer';
import BioMassIcon from '../../../assets/images/biomass.png';
import FishIcon from '../../../assets/images/fish.png';
import FishFoodIcon from '../../../assets/images/fish-food.png';
import FarmSummaryCard from '../../../components/Organisms/FarmSummaryCard/FarmSummaryCard';
import { Grid, Typography, useMediaQuery } from '@mui/material'
import './Home.scss';
import { get } from '../../../services/api'
import isEmpty from "lodash/isEmpty"
import { useNavigate } from 'react-router'

const Home: FC = () => {
    const [farm, setFarm] = useState<any>();
    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
    let navigate = useNavigate();

    useEffect(() => {
        get('farms').then((res: any) => {
            if (res) {
                setFarm(res.farm)
            }
        });
        get('user').then((res: any) => {
            if (res) {
                if(isEmpty(res.user.farm)){
                    navigate('/create-farm');
                }
            }
        });
    },[]);
    return (
        <PagesTemplate header={<Header pageTitle={'Home'} hasBackButton={false}/>} footer={<Footer/>}>
            <Grid container columns={24} spacing={2} style={{marginTop: !matches? '10px' : ''}}>
                <Grid item lg={21}>
                    <Typography className={matches ? 'panel-text-primary heading4' : 'panel-text-primary subtitle1 '}>
                        Farm Summary
                    </Typography>
                </Grid>
            </Grid>
            <Grid container columns={3} spacing={3} sx={{marginTop: '5px'}}>
                <Grid item xs={24} lg={1}>
                    <FarmSummaryCard image={BioMassIcon} iconColor={'#58D6D7'} bgColor={'rgba(88,214,215,0.1)'}
                                     iconBGColor={'rgba(88,214,215,0.3)'} title={'Total Biomass'}
                                     description={farm && farm.summary.totalBiomass}/>
                </Grid>
                <Grid item xs={24} lg={1}>
                    <FarmSummaryCard image={FishFoodIcon} iconColor={'#53A7DC'} bgColor={'rgba(83,167,220,0.1)'}
                                     iconBGColor={'rgba(83,167,220,0.3)'} title={'Total Feed Consumption'}
                                     description={farm && farm.summary.totalFeed}/>
                </Grid>
                <Grid item xs={24} lg={1}>
                    <FarmSummaryCard image={FishIcon} iconColor={'#F55B5D'} bgColor={'rgba(245,91,93,0.1)'}
                                     iconBGColor={'rgba(245,91,93,0.1)'} title={'Total Monthly Harvested'}
                                     description={farm && farm.summary.totalMonthlyHarvest}/>
                </Grid>
            </Grid>
        </PagesTemplate>
    )
};

export default Home;
