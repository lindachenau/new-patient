import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { pensionCodes } from "../utils/bp-codes"

export default function Pension({pensionCode, setPensionCode, pensionNo, setPensionNo, pensionExpiry, setPensionExpiry}) {

  return (
    <Container maxWidth='sm' style={{marginTop: 20, marginBottom: 20}}>
      <Typography variant='h6'>Pension</Typography>
        <FormControl fullWidth>
          <InputLabel htmlFor="pension-card-type">Pension card type*</InputLabel>
          <Select
            native
            value={pensionCode}
            onChange={event => setPensionCode(event.target.value)}
            inputProps={{
              name: 'pension-code',
              id: 'pension-code',
            }}
          >
            {pensionCodes.map((item, index) => <option key={index} value={item.code}>{item.label}</option>)}              
          </Select>
        </FormControl>
        <TextField
          required
          margin="dense"
          label="Card number"
          type="text"
          fullWidth
          value={pensionNo}
          onChange={(event) => setPensionNo(event.target.value.trim())}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required
            fullWidth
            margin="normal"
            id="date-picker-dialog"
            format="dd/MM/yyyy"
            label="Expiry(dd/MM/yyyy)"
            value={pensionExpiry}
            onChange={(date) => setPensionExpiry(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>            
  </Container>
  )
}