import React, { FC, useEffect, useState } from 'react'
import PagesTemplate from '../../../components/Templates/PagesTemplate/PagesTemplate';
import Header from '../../../components/Organisms/Header/Header';
import Footer from '../../../components/Organisms/Footer/Footer';
import {
  Grid,
  Typography,
  Alert,
  AlertTitle,
  Chip,
  Divider,
  useMediaQuery,
  Menu, MenuItem, Box,
} from '@mui/material'
import './Alerts.scss';
import CircleIcon from '@mui/icons-material/Circle';
import FilterIcon from '../../../assets/images/filter.png';
import HeaderSearchBox from '../../../components/Organisms/HeaderSearchBox/HeaderSearchBox'
import { get } from '../../../services/api'
import moment from 'moment';
import InfiniteScroll from "react-infinite-scroll-component";
import isEmpty from 'lodash/isEmpty'
import NoPond from '../../../assets/images/no-pond.png'


let Alerts: React.FC
Alerts = () => {
  const [filteredAlertList, setFilteredAlertList] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [searchInput, setSearchInput] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [selectedChip, setSelectedChip] = useState<string>('all')

  useEffect(() => {
      get(`alerts?search=${searchInput}`).then((res: any) => {
        if (res) {
          setFilteredAlertList(res.data)
        }
      })
  }, [searchInput])
  useEffect(() => {
    get('alerts').then((res: any) => {
      if (res) {
        setFilteredAlertList(res.data)
        setNextPageUrl(res.next_page_url)
      }
    })
  }, [])
  const showFilters = () => {
    if (showFilter) {
      setShowFilter(false)
    } else {
      setShowFilter(true)
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
    setShowFilter(false)
  }
  const handleClickFilter = (filterItem:any, dates:Boolean) => {
    setSelectedChip(filterItem)
    if(dates){
      get(`alerts?dates=${filterItem}`).then((res: any) => {
        if (res) {
          setFilteredAlertList(res.data)
        }
      })
    } else {
      get(`alerts?severity=${filterItem}`).then((res: any) => {
        if (res) {
          setFilteredAlertList(res.data)
        }
      })
    }
  }

  const HandleAlert = (props:any) => {
    const alert = props.alert;
    return <Alert icon={false}
           severity={alert?.severity === 'info'
             ? 'info'
             : alert?.severity === 'critical'
               ? 'warning'
               : 'error'
           }
    >
      {!matches
        ? <>
          <AlertTitle>{alert?.message}</AlertTitle>
          <Grid container columns={24} spacing={2}>
            <Grid item xs={16} sm={16}>
              <Typography className='alert-title'>
                {alert?.entity}
              </Typography>
              <Typography className='alert-status'>
                Status:
                <CircleIcon
                  style={{ color: alert?.severity === 'info' ? '#53A7DC' : alert?.severity === 'critical' ? '#FFAC32' : '#F55B5D' }}/>
                <span
                  style={{ color: alert?.severity === 'info' ? '#53A7DC' : alert?.severity === 'critical' ? '#FFAC32' : '#F55B5D' }}>{alert?.severity}</span>
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8} style={{ textAlign: 'right' }}>
              <Typography className='captionText' style={{ marginTop: '2px' }}>
                {moment(alert?.created_at).format("hh:mm ")}
              </Typography>
              <Typography className='captionText' style={{ marginTop: '2px' }}>
                {moment(alert?.created_at).format("YYYY-MM-DD ") === moment(new Date()).format("YYYY-MM-DD ")
                  ? 'Today'
                  : moment(alert?.created_at).format("YYYY-MM-DD ")
                }
              </Typography>
            </Grid>
          </Grid>
        </>
        : <Grid container columns={24} spacing={2}>
          <Grid item md={12} >
            <AlertTitle>{alert?.message}</AlertTitle>
          </Grid>
          <Grid item md={4} >
            <Typography className='alert-title'>
              {alert?.entity}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className='alert-status'>
              Status:
              <CircleIcon
                style={{ color: alert?.severity === 'info' ? '#53A7DC' : alert?.severity === 'critical' ? '#FFAC32' : '#F55B5D' }}/>
              <span
                style={{ color: alert?.severity === 'info' ? '#53A7DC' : alert?.severity === 'critical' ? '#FFAC32' : '#F55B5D' }}>{alert?.severity}</span>
            </Typography>
          </Grid>
          <Grid item md={4} style={{ textAlign: 'right' }}>
            <Typography className='captionText' style={{ marginTop: '2px' }}>
              {moment(alert?.created_at).format("hh:mm ")}
            </Typography>
          </Grid>
        </Grid>
      }
    </Alert>
  }

  const fetchMoreData = () =>{
    if(nextPageUrl === null){
      return;
    } else {
      get(`alerts?severity=${selectedChip}&${nextPageUrl}`).then((res: any) => {
        if (res) {
          const newData = filteredAlertList.concat(res.data);
          setFilteredAlertList(newData)
        }
      })
    }

  }
  return (
    <PagesTemplate header={<Header pageTitle={'Alerts'} hasBackButton={false}/>} footer={<Footer/>}>
      {matches &&
      <Grid container columns={24} spacing={2}>
        <Grid item lg={21}>
          <Typography className='panel-text-primary heading4'>
            Alerts
          </Typography>
        </Grid>
      </Grid>
      }
      <div className="alert">
        <Grid container columns={24} spacing={2} className={matches ? 'filter-lg' : ''}>
          <Grid item xs={16} sm={16} md={16} lg={16}>
            <HeaderSearchBox setSearchInput={setSearchInput} alert={true}/>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} style={{ textAlign: 'right' , paddingRight: '10px' }}>
            <img src={FilterIcon} width="24" onClick={showFilters}/>
          </Grid>
        </Grid>
        {!matches && <Divider/>}
        {showFilter && !matches
          ? <>
              <Chip label="All" variant={selectedChip === 'all' ? 'filled' : 'outlined'} size="small" onClick={() => handleClickFilter('all', false)} />
              <Chip label="Today" variant={selectedChip === 'today' ? 'filled' : 'outlined'} size="small" onClick={() => handleClickFilter('today', true)} />
              <Chip label="Yesterday" variant={selectedChip === 'yesterday' ? 'filled' : 'outlined'} size="small" onClick={() => handleClickFilter('yesterday', true)} />
              <Chip label="Invalid" variant={selectedChip === 'invalid' ? 'filled' : 'outlined'} size="small" onClick={() => handleClickFilter('invalid', false)}/>
              <Chip label="Info" variant={selectedChip === 'info' ? 'filled' : 'outlined'} size="small" onClick={() => handleClickFilter('info', false)}/>
              <Chip label="Critical" variant={selectedChip === 'critical' ? 'filled' : 'outlined'} size="small"  onClick={() => handleClickFilter('critical', false)}/>
              <Chip label="Dangerous" variant={selectedChip === 'dangerous' ? 'filled' : 'outlined'} size="small" onClick={() => handleClickFilter('dangerous', false)}/>
              <Divider/>
            </>
          : <div  className='alert-filter-menu'>
            <Menu
            anchorEl={anchorEl}
            open={showFilter}
            onClose={handleClose}
            className='alert-filter-menu'
          >
            <MenuItem key='All' onClick={() => handleClickFilter('', false)}>All</MenuItem>
            <MenuItem key='Today'  onClick={() => handleClickFilter('today', true)}>Today</MenuItem>
            <MenuItem key='Yesterday'  onClick={() => handleClickFilter('yesterday', true)}>Yesterday</MenuItem>
            <MenuItem key='Invalid'  onClick={() => handleClickFilter('invalid', false)}>Invalid</MenuItem>
            <MenuItem key='Info'  onClick={() => handleClickFilter('info', false)}>Info</MenuItem>
            <MenuItem key='Critical'  onClick={() => handleClickFilter('critical', false)}>Critical</MenuItem>
            <MenuItem key='Dangerous' onClick={() => handleClickFilter('dangerous', false)}>Danger</MenuItem>
          </Menu>
          </div>
        }
        {isEmpty(filteredAlertList)
          ? <Grid container columns={24} spacing={2}  className={matches ? '' :'pond-list-container'} style={{marginBottom:'100px'}}>
            <Grid item xs={24}  lg={24}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: "center",
                  marginTop: "100px"
                }}
              >
                <img src={NoPond} alt="There is no alert" width="100"/>
              </Box>
              <Typography className='auth-page-title heading6'>
                There is no Alert yet
              </Typography>
            </Grid>
          </Grid>
          : <>
          { matches &&
          <>
            <Typography className="heading6">Today</Typography>
            <Divider/>
          </>
        }
        {filteredAlertList && filteredAlertList.map((alert: any) => {
          return  moment(alert?.created_at).format("YYYY-MM-DD ") === moment(new Date()).format("YYYY-MM-DD ") &&
          <HandleAlert alert={alert}  />
        })}
        {matches &&
          <>
          <Typography className="heading6">Yesterday</Typography>
          <Divider/>
          </>
        }
        {filteredAlertList && filteredAlertList.map((alert: any) => {
          return moment(alert?.created_at).format("YYYY-MM-DD ") === moment().subtract(1, 'day').format('YYYY-MM-DD ')  &&
          <HandleAlert alert={alert}  />
        })}
        {matches &&
          <>
          <Typography className="heading6">Last Week</Typography>
          <Divider/>
          </>
        }
          <InfiniteScroll
          dataLength={filteredAlertList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4> No data yet!</h4>}
          >
          {filteredAlertList && filteredAlertList.map((alert: any) => {
            return moment(alert?.created_at).format("YYYY-MM-DD ") < moment().subtract(1, 'day').format('YYYY-MM-DD ') &&
              <HandleAlert alert={alert}/>
          })}
          </InfiniteScroll>
          </>
        }
      </div>
    </PagesTemplate>
  )
}

export default Alerts;
