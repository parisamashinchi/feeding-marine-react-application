import React, { ComponentPropsWithoutRef, FC, PropsWithChildren, useEffect, useState } from 'react'
import { Autocomplete, Grid, TextField, Typography, useMediaQuery } from '@mui/material'
import { GoogleMap, Marker } from '@react-google-maps/api'
import {timeZones} from '../../../constants/TimeZones';
import AutocompleteNew from "react-google-autocomplete";
import { IPositionModel } from './CreateFarm'
import Axios from 'axios'
import { get } from '../../../services/api';
import isEmpty from 'lodash/isEmpty'

interface FarmFormCommonProps {
  markerPosition: any,
  selectedTimeZone: string,
  enableField: boolean,
  errors:any,
  setErrors:any,
  newFarmData: any,
  setNewFarmData:any,
  openEditDialog: boolean,
  setMarkerPosition: any,
  setSelectedTimeZone: any
}
export type FarmFormProps = Omit<ComponentPropsWithoutRef<'div'>,
  keyof  FarmFormCommonProps> &
  FarmFormCommonProps;

const FarmForm: FC<PropsWithChildren<FarmFormProps>> = ({markerPosition,
                                                          selectedTimeZone,
                                                          enableField,
                                                          errors,
                                                          setErrors,
                                                          newFarmData,
                                                          setNewFarmData,
                                                          openEditDialog,
                                                          setMarkerPosition,
                                                          setSelectedTimeZone
                                                          }) => {
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))
  const [address, setAddress] = useState<any>();
  const [farm, setFarm] = useState<any>();
  const [centerPosition, setCenterPosition] = useState<IPositionModel>({lat:  0, lng:  0});
  const containerStyle = {
    width:   matches ? '328px' :'100%',
    height: '280px'
  };
  const timeZoneList = timeZones;

  const onMarkerSet = (e: any) => {
    setMarkerPosition({lat: e.latLng?.toJSON().lat || 0, lng: e.latLng?.toJSON().lng || 0})
    const latlng = new google.maps.LatLng(e.latLng?.toJSON().lat, e.latLng?.toJSON().lng);

    Axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${e.latLng?.toJSON().lat}%2C${e.latLng?.toJSON().lng}&timestamp=1331161200&key=AIzaSyCfsUv3JFxU357EhuUzEHMPC0W3G3GAfWA`).then(res =>
    {
      if (res) {
        setSelectedTimeZone(res.data.timeZoneId);
        updateFarmData(res.data.timeZoneId, 'timezone');
      }
    });

    updateFarmData(e.latLng?.toJSON().lat, 'latitude');
    updateFarmData(e.latLng?.toJSON().lng, 'longitude');
    const geocoder: any = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, (results: any, status: any) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status);
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
        const address = (results && results[0].formatted_address);
        updateFarmData(address, 'address1');
      }
    });
  }
  useEffect(() => {
    get('user').then((res: any) => {
      if (res) {
          setFarm(res.user.farm)
          setCenterPosition({lat:  parseFloat(res.user.farm.latitude), lng:  parseFloat(res.user.farm.longitude) })
          setMarkerPosition({lat: parseFloat(res.user.farm.latitude) , lng:  parseFloat(res.user.farm.longitude)});
      }
    });
  }, []);

  useEffect(() => {
    const func = async () => {
      if(address){
        setCenterPosition(address && address.geometry.location.toJSON());
        updateFarmData(address && address.formatted_address, 'address2');
      }
    };
    func();
  }, [address]);


  const validate: any = (fieldValues = newFarmData) => {
    let temp: any = { ...errors };

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "required";
    if ("timezone" in fieldValues)
      temp.timezone = fieldValues.timezone ? "" : "required";

    setErrors({
      ...temp
    });
  };

  const updateFarmData = (value: any, key: string) => {
    setNewFarmData({
      ...newFarmData,
      [key]: value
    });
    validate({ [key]: value });
  }
  return (
    <Grid container  columns={24}  spacing={2} >
      <Grid item xs={24} lg={22} >
        <TextField
          sx={{width : matches  ? '328px!important' : '100%'}}
          variant="outlined"
          required
          id="name"
          label="Farm Name"
          placeholder='Enter farm name...'
          value={newFarmData ? newFarmData.name :  (e:any) => e.target.value }
          onChange={(e) => updateFarmData(e.target.value, 'name')}
          {...(errors["name"] && {
            error: true,
            helperText: errors["name"]
          })}
          disabled={openEditDialog ? false : enableField}
        />
      </Grid>
      <Grid item xs={24} lg={22}>
        <div style={{ width : matches ? '328px' :'100%'}}>
          <AutocompleteNew
            onPlaceSelected={(place:any) => {
                setAddress(place)
            }}
            defaultValue={farm && farm.address2}
            disabled={openEditDialog ? false : enableField}
          />
        </div>
      </Grid>
      <Grid item xs={24} lg={22}>
        <Typography
          sx={{textAlign: 'left!important', marginBottom: '0!important', lineHeight: '1!important',width : matches ? '328px' :'100%'}}
          className='panel-page-title bodyText2' >
          please add a point as your location using single tap on the map.
        </Typography>
      </Grid>
      <Grid item xs={24} lg={22} style={{pointerEvents: (!openEditDialog && matches && !isEmpty(farm) ) ? 'none' : 'inherit' , opacity: (!openEditDialog && matches  && !isEmpty(farm)) ? .5 : 1}}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerPosition}
          zoom={10}
          onClick={onMarkerSet}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </Grid>
      <Grid item xs={24} lg={22}>
        <TextField
          sx={{width : matches ? '328px!important' :'100%'}}
          className='farm-address-bar'
          variant="outlined"
          multiline
          rows={3}
          type='text'
          id="address1"
          label=""
          placeholder='Full Address'
          required
          defaultValue={farm && farm.address1 }
          value={newFarmData.address1}
          onChange={(e: any) => updateFarmData(e.target.value, 'address1')}
          disabled={openEditDialog ? false : enableField}
        />
      </Grid>
      <Grid item xs={24} lg={22}>
        <Autocomplete
          sx={{width : matches ? '328px!important' :'100%'}}
          disablePortal
          id="timeZone"
          value={selectedTimeZone? selectedTimeZone : newFarmData.timezone}
          options={timeZoneList}
          disabled={openEditDialog ? false : enableField}
          renderInput={(params) => <TextField {...params}
                                              label="Time Zone"
                                              required
                                              error={errors["timeZone"]}
                                              {...(errors["timeZone"] && {
                                                error: true,
                                                helperText: errors["timeZone"]
                                              })}/>}
          onChange={(e: any) => updateFarmData(e.target.innerHTML, 'timezone')}
        />
      </Grid>
    </Grid>

  )}

export default FarmForm;