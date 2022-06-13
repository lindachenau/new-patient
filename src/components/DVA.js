import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { dVACodes } from "../utils/bp-codes"

export default function DVA({dVACode, setDVACode, dVANo, setDVANo}) {

  return (
    <Container maxWidth='sm' disableGutters style={{marginTop: 20, marginBottom: 20}}>
      <Typography variant='h6'>DVA</Typography>
      <FormControl fullWidth>
        <InputLabel htmlFor="DVA-card-type">DVA card type*</InputLabel>
        <Select
          native
          value={dVACode}
          onChange={event => setDVACode(event.target.value)}
          inputProps={{
            name: 'DVA-code',
            id: 'DVA-code',
          }}
        >
          {dVACodes.map((item, index) => <option key={index} value={item.code}>{item.label}</option>)}              
        </Select>
      </FormControl>
      <TextField
        required
        margin="dense"
        label="Card number"
        type="text"
        fullWidth
        value={dVANo}
        onChange={(event) => setDVANo(event.target.value.trim())}
      />
    </Container>
  )
}