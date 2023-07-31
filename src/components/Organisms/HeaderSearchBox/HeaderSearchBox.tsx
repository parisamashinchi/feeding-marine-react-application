import React, {FC, PropsWithChildren, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Grid, TextField, Typography, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import './HeaderSearchBox.scss';

interface HeaderSearchBoxProps {
    setSearchInput: (text: string) => void;
    alert?: boolean
}

const HeaderSearchBox: FC<PropsWithChildren<HeaderSearchBoxProps>> = ({setSearchInput, alert}) => {
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))


    const onSearchInputChange = (text: string) => {
        setInputValue(text);
        setSearchInput(text);
    }
    const navigate = useNavigate();
    return (
        <div className={(alert || matches) ? ''   :(!alert && !matches) ? 'header-search-box'  : '' } style={{backgroundColor: searchFocused ? '#fff' : 'transparent'}}>
            {
                searchFocused && !alert
               ? <div style={{display: 'flex'}}>
                    <ArrowBackIosIcon onClick={() => navigate(-1)} className='search-back-icon'/>
                    <TextField autoFocus={true}
                               onChange={(e) => {
                                    onSearchInputChange(e.target.value);
                                }}
                               variant='standard'
                               type='text'
                               className='search-input'
                               placeholder="Search"/>
                </div>
                  : searchFocused && alert
                  ? <TextField autoFocus={true}
                               onChange={(e) => {
                                  onSearchInputChange(e.target.value);
                              }}
                               variant='standard'
                               type='text'
                               className='search-input-alert'
                               placeholder={matches ? ' ' :'Search Alerts'}/>
                  :''
            }
            {!alert
            ?  <span className='search-close-icon'>
                {
                    searchFocused ?
                        <CloseIcon className='close-search-color'
                                   onClick={() => {
                                       setSearchFocused(false);
                                       setSearchInput('');
                                       setInputValue('');
                                   }}/> :
                        <SearchIcon className='close-search-color' onClick={() => setSearchFocused(true)}/>
                }
                </span>
            : <span>
                  {!searchFocused ?
                        <Typography className="subtitle2  panel-text-primary"
                                    onClick={() => setSearchFocused(true)}>
                            <SearchIcon className='search-icon'/>
                            <span style={{ top: '-5px', left:'10px',position: 'relative'}}>Search</span>
                        </Typography>
                        : ''
                  }
             </span>

            }
        </div>
    )
}

export default HeaderSearchBox;
