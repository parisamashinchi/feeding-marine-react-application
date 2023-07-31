import React, { FC } from 'react'
import Box from '@mui/material/Box';
import {
  Typography,
} from '@mui/material';

import PagesTemplate from '../../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../../components/Organisms/Header/Header';
import CycleForm from './CycleForm'

const CreateCycle: FC = () => {
    return (
        <PagesTemplate header={<Header pageTitle={'New Cycle'} hasBackButton={true}/>}>
                <Typography sx={{marginBottom: '10px!important', textAlign: 'left!important', marginTop: '10px'}}
                            className='panel-page-title subtitle2'  >
                    Add the new cycle
                </Typography>
                <CycleForm/>
        </PagesTemplate>
    )
}

export default CreateCycle;
