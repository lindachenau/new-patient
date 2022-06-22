import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

export default function Medicare({medicareNo, setMedicareNo, iRN, setIRN, expiry, setExpiry}) {

  const limit = (val, max) => {
    if (val.length === 1 && val[0] > max[0]) {
      val = '0' + val
    }
  
    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01'
  
      //this can happen when user paste number
    } else if (val > max) {
        val = max
      }
    }
  
    return val
  }
  
  const monthExpiry = (val) => {
    const num = val.replace("/", "")
    const month = limit(num.substring(0, 2), '12')
    const year = num.length >= 2 ? num.substring(2, 6) : ''
    
    return num.length > 2 ? (month + '/' + year) : month
  }
  
  return (
    <Container maxWidth='sm' disableGutters style={{marginTop: 20, marginBottom: 20}}>
      <Typography variant='h6'>Medicare</Typography>
      <TextField
        required
        margin="dense"
        label="Medicare number"
        placeholder="xxxx xxxxx x"
        type="tel"
        fullWidth
        value={medicareNo}
        onChange={(event) => setMedicareNo(event.target.value.replace(/ /g, ""))}
      />
      <TextField
        required
        margin="dense"
        label="IRN(the no. before the patient's name)"
        placeholder="x"
        type="tel"
        fullWidth
        value={iRN}
        onChange={(event) => setIRN(event.target.value.trim())}
      />
      <TextField
        required
        margin="dense"
        label="Expiry"
        placeholder="MM/YYYY"
        type="tel"
        fullWidth
        value={expiry}
        onChange={(event) => setExpiry(monthExpiry(event.target.value))}
      />
    </Container>
  )
}