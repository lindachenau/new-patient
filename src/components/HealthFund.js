import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

export default function HealthFund({healthFundNo, setHealthFundNo, healthFundName, setHealthFundName, healthFundExpiry, setHealthFundExpiry}) {
  return (
    <Container maxWidth='sm' disableGutters style={{marginTop: 20, marginBottom: 20}}>
      <Typography variant='h6'>Health Fund</Typography>
        <TextField
          required
          margin="dense"
          label="Health fund name"
          type="text"
          fullWidth
          value={healthFundName}
          onChange={(event) => setHealthFundName(event.target.value.trim())}
        />
        <TextField
          required
          margin="dense"
          label="Member number"
          type="text"
          fullWidth
          value={healthFundNo}
          onChange={(event) => setHealthFundNo(event.target.value.trim())}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required
            fullWidth
            margin="normal"
            id="date-picker-dialog"
            format="dd/MM/yyyy"
            label="Expiry(dd/MM/yyyy)"
            value={healthFundExpiry}
            onChange={(date) => setHealthFundExpiry(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>            
  </Container>
  )
}