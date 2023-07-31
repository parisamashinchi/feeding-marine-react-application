import React, {FC, PropsWithChildren} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@material-ui/core'
import { useMediaQuery } from '@mui/material'

interface CardIconWithTextProps {
    open: boolean;
    dialogTitle: string;
    dialogText?: string;
    cancelText: string;
    approvedText: string;
    handleClose: () => void;
    handleApproved: () => void;
}

const AlertDialog: FC<PropsWithChildren<CardIconWithTextProps>> = ({open,dialogTitle, dialogText, cancelText, approvedText, handleClose, handleApproved}) => {
  const matches = useMediaQuery((theme:any) => theme.breakpoints.up('md'))

  const useStyles = makeStyles({
    dialogPaper: {
      width: matches ? '415px!important' : '296px!important',
      height: matches ? '213px!important' : '190px!important',
    },
  });
  const classes = useStyles();

  return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{
            paper: classes.dialogPaper
          }}
        >
          <DialogTitle id="alert-dialog-title" className="bodyText1" style={{paddingTop: matches ? '66px' : '32px'}}>
            {dialogTitle}
          </DialogTitle>
          {dialogText &&
            <DialogContent style={{margin: '0 auto '}}>
              <DialogContentText id="alert-dialog-description">
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label={dialogText} />
                </FormGroup>
              </DialogContentText>
            </DialogContent>
            }
          <DialogActions style={{margin:'10px auto'}}>
            <Button onClick={handleClose}>{cancelText}</Button>
            <Button onClick={handleApproved} autoFocus>
              {approvedText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default AlertDialog;
