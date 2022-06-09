import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import LocationSearchInput from './LocationSearchInput'

export default function PatientContact({address, setAddress, email, setEmail, mobile, setMobile, homeNumber, setHomeNumber, workNumber, setWorkNumber, 
  emergencyContactFirstname, setEmergencyContactFirstname, emergencyContactSurname, setEmergencyContactSurname, 
  emergencyContactPhone, setEmergencyContactPhone, emergencyContactRelationship, setEmergencyContactRelationship}) {

  const onChangeLocation = address => {
    setAddress(address.replace(', Australia', ''))
  }

  return (
    <Container maxWidth='sm' style={{marginTop: 20, marginBottom: 20}}>
      <Typography variant='h6' gutterBottom>Address, Contact & Email</Typography>
      <LocationSearchInput
        address={address} 
        changeAddr={onChangeLocation}
      />
      <TextField
        required
        margin="dense"
        label="Mobile phone number"
        type="tel"
        fullWidth
        value={mobile}
        onChange={(event) => setMobile(event.target.value.trim())}
      />
      <TextField
        margin="dense"
        label="email"
        type="email"
        fullWidth
        value={email}
        onChange={(event) => setEmail(event.target.value.trim())}
      />
      <TextField
        margin="dense"
        label="Home phone number"
        type="tel"
        fullWidth
        value={homeNumber}
        onChange={(event) => setHomeNumber(event.target.value.trim())}
      />
      <TextField
        margin="dense"
        label="Work phone number"
        type="tel"
        fullWidth
        value={workNumber}
        onChange={(event) => setWorkNumber(event.target.value.trim())}
      />                              
      <TextField
        required
        margin="dense"
        label="Emergency contact's firstname"
        type="text"
        fullWidth
        value={emergencyContactFirstname}
        onChange={(event) => setEmergencyContactFirstname(event.target.value.trim())}
      />                              
      <TextField
        required
        margin="dense"
        label="Emergency contact's surname"
        type="text"
        fullWidth
        value={emergencyContactSurname}
        onChange={(event) => setEmergencyContactSurname(event.target.value.trim())}
      />                              
      <TextField
        required
        margin="dense"
        label="Emergency contact's phone"
        type="tel"
        fullWidth
        value={emergencyContactPhone}
        onChange={(event) => setEmergencyContactPhone(event.target.value.trim())}
      />                              
      <TextField
        required
        margin="dense"
        label="Emergency contact's relationship"
        type="text"
        fullWidth
        value={emergencyContactRelationship}
        onChange={(event) => setEmergencyContactRelationship(event.target.value.trim())}
      />                              
    </Container>
  )
}