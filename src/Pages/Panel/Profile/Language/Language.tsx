import React, { FC, useState } from 'react'
import PagesTemplate from '../../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../../components/Organisms/Header/Header';
import Footer from '../../../../components/Organisms/Footer/Footer';
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography, useMediaQuery } from '@mui/material'
import isEmpty from "lodash/isEmpty"

const Language: FC = () => {
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
    const [languageList, setLanguageList] = useState([{key:'English', value: 'english'}]);
    const [enableField, setEnableField] = useState(true);
    const [iconType, setIconType] = useState('edit');

    const handleEdit = () => {
        setEnableField(false)
        setIconType('checked')
    }
    const handleChangeLanguage = (newValue:any) => {}
    return (
        <PagesTemplate header={matches ? '' :<Header pageTitle={'Language'} hasBackButton={true} handleEdit={handleEdit}  icon={iconType} />} footer={matches ? '' :<Footer/>}>
            <Grid container columns={24} spacing={2}  className='profile-container' style={{marginTop: '10px'}}>
                {matches &&
                <Grid item lg={24}>
                    <Typography className='panel-text-primary subtitle1'>
                        Select your language
                    </Typography>
                </Grid>
                }
                <Grid item xs={24} lg={8}>
                    <FormControl sx={{width : matches ? '328px!important' :'100%'}}>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                          label="Language"
                          onChange={handleChangeLanguage}
                          disabled={matches ? false :enableField}
                          defaultValue={'english'}

                        >
                            {!isEmpty(languageList) && languageList.map((item: any, index: number) => {
                                return <MenuItem value={item.value} key={item.key}  >{item.key}</MenuItem>
                            })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </PagesTemplate>
    )
};

export default Language;
