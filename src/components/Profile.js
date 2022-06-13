import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { patientTitles, patientSexCodes } from "../utils/bp-codes"

export default function Profile({title, setTitle, firstName, setFirstName, lastName, setLastName, dOB, setDOB, gender, setGender}) {

  return (
    <Container maxWidth='sm' disableGutters style={{marginTop: 20, marginBottom: 20}}>
      <Typography variant='h6'>Patient profile</Typography>
      <Typography variant='body2' gutterBottom>Bulk-billing requires patient's name matches with the name on your Medicare card or health fund card. Please enter the name as shown on your Medicare Card, health fund card or passport.</Typography>
      <FormControl fullWidth>
        <InputLabel htmlFor="title-native-simple">Title</InputLabel>
        <Select
          native
          value={title}
          onChange={event => setTitle(parseInt(event.target.value))}
          inputProps={{
            name: 'title',
            id: 'title-native-simple',
          }}
        >
          {patientTitles.map((item, index) => <option key={index} value={item.code}>{item.label}</option>)}              
        </Select>
      </FormControl>          
      <TextField
        required
        margin="dense"
        label="First name"
        type="text"
        fullWidth
        value={firstName}
        onChange={(event) => setFirstName(event.target.value.trim())}
      />
      <TextField
        required
        margin="dense"
        label="Last name"
        type="text"
        fullWidth
        value={lastName}
        onChange={(event) => setLastName(event.target.value.trim())}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required
          fullWidth
          margin="normal"
          id="date-picker-dialog"
          format="dd/MM/yyyy"
          label="DOB(dd/MM/yyyy)"
          value={dOB}
          onChange={setDOB}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <FormControl fullWidth >
        <InputLabel htmlFor="gender-native-simple">Gender*</InputLabel>
        <Select
          native
          value={gender}
          onChange={event => setGender(parseInt(event.target.value))}
          inputProps={{
            name: 'gender',
            id: 'gender-native-simple',
          }}
        >
          {patientSexCodes.map((item, index) => <option key={index} value={item.code}>{item.label}</option>)}              
        </Select>
      </FormControl>                    
    </Container>
  )
}