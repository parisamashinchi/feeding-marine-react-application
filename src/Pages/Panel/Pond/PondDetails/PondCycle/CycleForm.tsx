import React, { ComponentPropsWithoutRef, FC, PropsWithChildren, useEffect, useState } from 'react'
import {
  Grid,
  TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography,
} from '@mui/material'
import moment from 'moment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import isEmpty from "lodash/isEmpty"
import { get, post, put } from '../../../../../services/api'
import { Cycle, cycleInitialization } from '../../../../../store/pond/models/PondModel'
import { useLocation, useNavigate, useParams } from 'react-router'
import AlertComponent from '../../../../../components/Molecules/AlertComponent/AlertComponent'
import mapKeys from 'lodash/mapKeys';
import AuthTemplate from '../../../../../components/Templates/AuthTemplate/AuthTemplate'
import Box from '@mui/material/Box'

interface CycleFormCommonProps {
  pondId?: string;
  info?: {
    id: number
    age: number
    total_seeds: number
    start_date: string
    finish_date: string
    species_id: number
    initial_average_weight: number
    target_weight: number
    species:{}
  },
  edit?: boolean
  updateCycle?: () => void
  closeDialog?: () => void
}

export type CycleFormProps = Omit<ComponentPropsWithoutRef<'div'>,
  keyof  CycleFormCommonProps> &
  CycleFormCommonProps;

const CycleForm: FC<PropsWithChildren<CycleFormProps>> = ({
                                                            pondId,
                                                            info,
                                                            edit,
                                                            updateCycle,
                                                            closeDialog
}) => {
  const [errors, setErrors] = useState({} as any);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [newCycleData, setNewCycleData] = useState<Cycle>(cycleInitialization);
  const [speciesList, setSpeciesList] = useState([]);
  const [specie, setSpecie] = useState(info ? info.species : {} );
  const params = useParams()
  let navigate = useNavigate();
  const location = useLocation();
  interface CustomizedState {
    id: string
  }
  const state = location.state as CustomizedState;
  const [dateValue, setDateValue] = React.useState(new Date(info ? info.start_date : moment().toDate() ));

  useEffect(() => {
    get(`species`).then((res: any) => {
      if (res) {
        setSpeciesList(res.species)
      }
    });
  },[]);

  useEffect(() => {
    if (info){
      setNewCycleData({
        ...newCycleData,
        ['cultivation_days']: info && moment(info.finish_date).diff(moment(info.start_date), "days")+1,
        ['initial_average_weight']:  info.initial_average_weight,
        ['target_weight']:  info.target_weight,
        ['start_date']:  info.start_date,
        ['species_id']:  info.species_id,
        ['total_seeds']:  info.total_seeds,
        ['age']:  info.age,
      });
    }else {
      const date = moment(new Date())
      setNewCycleData({
        ...newCycleData,
        ['start_date']: date.format("YYYY-MM-DD HH:mm:ss"),
      });
    }
  },[]);
  const validate: any = (fieldValues = newCycleData) => {
    let temp: any = { ...errors };
    if ("species_id" in fieldValues)
      temp.species_id = fieldValues.species_id ? "" : "required";
    if ("total_seeds" in fieldValues)
      temp.total_seeds = fieldValues.total_seeds ? "" : "required";
    if ("age" in fieldValues)
      temp.age = fieldValues.age ? "" : "required";
    if ("initial_average_weight" in fieldValues)
      temp.initial_average_weight = fieldValues.initial_average_weight ? "" : "required";
    if ("cultivation_days" in fieldValues)
      temp.cultivation_days = fieldValues.cultivation_days ? "" : "required";
    if ("target_weight" in fieldValues)
      temp.target_weight = fieldValues.target_weight ? "" : "required";

    setErrors({
      ...temp
    });
  };
  const formIsValid = (fieldValues = newCycleData) => {
    const isValid =
      fieldValues.species_id &&
      fieldValues.total_seeds &&
      fieldValues.age &&
      fieldValues.initial_average_weight &&
      fieldValues.cultivation_days &&
      fieldValues.target_weight &&
      Object.values(errors).every((x) => x === "");
    return isValid;
  };
  const onCreateCycle = (e:any) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      let data = Object.assign(newCycleData, { 'pond_id':  pondId !== undefined ?  Number(pondId) :  state && Number(state.id) })
      post('cycles', data).then((res: any) => {
        if (res) {
          if (res.status && res.status !== 200) {
            setShowAlert(true)
            let messageText = res.data.message + ' '
            mapKeys(res.data.detail, function(value: any) {
              messageText += value.toString()
            });
            setAlertMessage(messageText);
          } else {
            navigate(`/pond-list/${state === null ? params.id : state.id}`,{ state: { cycle: true } });
            updateCycle && updateCycle()
            closeDialog && closeDialog()
          }
        }
      });
    }
  }
  const onEditCycle = () => {
   const data = Object.assign(newCycleData,{ 'pond_id':Number(params.id)})
    {info &&
      put(`cycles/${info.id}`, data).then((res: any) => {
        if (res) {
          if (res.status && res.status !== 200) {
            setShowAlert(true)
            let messageText = res.data.message + ' '
            mapKeys(res.data.detail, function(value: any) {
              messageText += value.toString()
            });
            setAlertMessage(messageText)
          } else {
            updateCycle && updateCycle()
            closeDialog && closeDialog()
          }
        }
      });
    }
  }
  const updateCycleData = (value: string, key: string) => {
    setNewCycleData({
      ...newCycleData,
      [key]: value
    });
    validate({ [key]: value });
    if(key === "initial_average_weight"){
      if(specie === 1){
        if(Number(value) !== 30){
          const Total_cultivation_days = 180 * (250 -  Number(value))/(250 - 30)
          setNewCycleData({
            ...newCycleData,
            ['cultivation_days']: Math.round(Total_cultivation_days),
            ['initial_average_weight']: value,
          });
        }else {
          setNewCycleData({
            ...newCycleData,
            ['cultivation_days']: 180,
            ['initial_average_weight']: value,
          });
        }
      } else if(specie=== 2){
        if(Number(value) !== 10){
          const Total_cultivation_days = 330 * (500 -  Number(value))/(500 - 10)
          setNewCycleData({
            ...newCycleData,
            ['cultivation_days']: Math.round(Total_cultivation_days),
            ['initial_average_weight']: value,
          });
        } else {
          setNewCycleData({
            ...newCycleData,
            ['cultivation_days']: 330,
            ['initial_average_weight']: value,
          });
        }
      } else {

        if(Number(value) !== 0.02){
          const Total_cultivation_days = 120 * (30 -  Number(value))/(30 - 0.02)
          setNewCycleData({
            ...newCycleData,
            ['cultivation_days']: Math.round(Total_cultivation_days),
            ['initial_average_weight']:  value,
          });
        } else {
          setNewCycleData({
            ...newCycleData,
            ['cultivation_days']: 120,
            ['initial_average_weight']:  value,
          });
        }
      }
    }
  }
  const handleChangeSpecies = (newValue:any) => {
    setSpecie(newValue.target.value);
    if(newValue.target.value === 1){
      setNewCycleData({
        ...newCycleData,
        ['species_id']: newValue.target.value,
        ['target_weight']: 250,
        ['cultivation_days']: 180,
        ['initial_average_weight']: 0,
      });
    } else if(newValue.target.value === 2){
      setNewCycleData({
        ...newCycleData,
        ['species_id']: newValue.target.value,
        ['target_weight']: 500,
        ['cultivation_days']: 330,
        ['initial_average_weight']: 0,
      });
    } else {
      setNewCycleData({
        ...newCycleData,
        ['species_id']: newValue.target.value,
        ['target_weight']: 30,
        ['cultivation_days']: 120,
        ['initial_average_weight']: 0,
      });
    }
  };
  const handleChangeDatePicker = (newValue:any) => {
    setDateValue(newValue);
    const time = moment(newValue).format("YYYY-MM-DD HH:mm:ss")
    setNewCycleData({
      ...newCycleData,
      ['start_date']: time
    });
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{marginBottom: '5vh'}}
      >
      <Grid container columns={2} spacing={2} style={{marginBottom: '100px'}} className='form'>
        {showAlert && <AlertComponent type="error"  alertText={alertMessage} />}
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Start date"
              inputFormat="MM/dd/yyyy"
              value={dateValue}
              onChange={handleChangeDatePicker}
              renderInput={(params:any) => <TextField {...params}/>}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Species</InputLabel>
            <Select
              defaultValue={info && info.species_id }
              label="Species"
              onChange={handleChangeSpecies}
              required
              {...(errors["species_id"] && {
                error: true,
                helperText: errors["species_id"]
              })}
            >
              {!isEmpty(speciesList) && speciesList.map((item: any, index: number) => {
                return <MenuItem value={item.id} key={index}>{item.type}</MenuItem>
              })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <TextField
            defaultValue={info && info.total_seeds}
            variant="outlined"
            type="number"
            required
            id="total_seeds"
            label="Total seeds"
            onChange={(e) =>updateCycleData(e.target.value, 'total_seeds')}
            {...(errors["total_seeds"] && {
              error: true,
              helperText: errors["total_seeds"]
            })}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <TextField
            type='number'
            defaultValue={info && info.age}
            variant="outlined"
            required
            id="age"
            label="Age"
            onChange={(e) =>updateCycleData(e.target.value, 'age')}
            {...(errors["age"] && {
              error: true,
              helperText: errors["age"]
            })}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <TextField
            type='number'
            variant="outlined"
            required
            value={newCycleData ? newCycleData.initial_average_weight : (e:any) => e.target.value }
            id="initial_average_weight"
            label="Initial Avg weight "
            onChange={(e) =>updateCycleData(e.target.value, 'initial_average_weight')}
            {...(errors["initial_average_weight"] && {
              error: true,
              helperText: errors["initial_average_weight"]
            })}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <TextField
            type='number'
            variant="outlined"
            required
            value={newCycleData ? newCycleData.cultivation_days : (e:any) => e.target.value }
            id="cultivation_days"
            label="Total cultivation days "
            onChange={(e) =>updateCycleData(e.target.value, 'cultivation_days')}
            {...(errors["cultivation_days"] && {
              error: true,
              helperText: errors["cultivation_days"]
            })}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <TextField
            type='number'
            variant="outlined"
            required
            value={newCycleData ? newCycleData.target_weight : (e:any) => e.target.value }
            id="target_weight"
            label="Target weight "
            onChange={(e) =>updateCycleData(e.target.value, 'target_weight')}
            {...(errors["target_weight"] && {
              error: true,
              helperText: errors["target_weight"]
            })}
          />
        </Grid>
      </Grid>
      </Box>
      <div className='auth-footer'>
        { edit
          ? <Button variant="contained" className='full-width app-button' onClick={onEditCycle} disabled={!formIsValid()}>Save</Button>
          : <Button variant="contained" className='full-width app-button' onClick={onCreateCycle} disabled={!formIsValid()}>Create Cycle</Button>
        }
      </div>
      </>
  )
}

export default CycleForm;
