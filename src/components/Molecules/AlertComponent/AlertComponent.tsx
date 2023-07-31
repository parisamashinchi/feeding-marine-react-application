import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {Alert, Stack} from '@mui/material'

interface AlertProps {
  type: any;
  alertText?: string;

}

const AlertComponent: FC<PropsWithChildren<AlertProps>> = ({type,alertText}) => {
  const [alert, setAlert] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAlert(false);
  //   }, 3000);
  //
  //   return () => clearTimeout(timer);
  // }, []);
  return (
   <Stack sx={{ width: '100%' , marginTop:'10px'}} spacing={2}>
     {alert &&
       <Alert variant="filled" severity={type}>
         {alertText}
       </Alert>
     }
    </Stack>
  )
}
export default AlertComponent;
