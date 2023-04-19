import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import LocationSearchInput from './LocationSearchInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox' 

export default function PatientContact({address, setAddress, email, setEmail, mobile, setMobile, homeNumber, setHomeNumber, workNumber, setWorkNumber, 
  emergencyContactFirstname, setEmergencyContactFirstname, emergencyContactSurname, setEmergencyContactSurname, 
  emergencyContactPhone, setEmergencyContactPhone, emergencyContactRelationship, setEmergencyContactRelationship,
  nextOfKinFirstname, setNextOfKinFirstname, nextOfKinSurname, setNextOfKinSurname, 
  nextOfKinPhone, setNextOfKinPhone, nextOfKinRelationship, setNextOfKinRelationship}) {

  const [sameAsNextOfKin, setSameAsNextOfKin] = useState(false)    

  useEffect(() => {
    if (sameAsNextOfKin) {
      setEmergencyContactFirstname(nextOfKinFirstname)
      setEmergencyContactSurname(nextOfKinSurname)
      setEmergencyContactPhone(nextOfKinPhone)
      setEmergencyContactRelationship(nextOfKinRelationship)
    } else {
      setEmergencyContactFirstname('')
      setEmergencyContactSurname('')
      setEmergencyContactPhone('')
      setEmergencyContactRelationship('')
    }
  }, [sameAsNextOfKin])

  const onChangeLocation = address => {
    setAddress(address.replace(', Australia', ''))
  }

  const handleChange = (event) => setSameAsNextOfKin(event.target.checked)

  return (
    <>
      <Container maxWidth='sm' disableGutters style={{marginTop: 30, marginBottom: 20}}>
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
      </Container>
      <Container maxWidth='sm' disableGutters style={{marginTop: 30, marginBottom: 20}}>
        <Typography variant='h6'>Contact for next of kin (近亲)</Typography>
        <TextField
          required
          margin="dense"
          label="Next of kin's firstname"
          type="text"
          fullWidth
          value={nextOfKinFirstname}
          onChange={(event) => setNextOfKinFirstname(event.target.value.trim())}
        />                              
        <TextField
          required
          margin="dense"
          label="Next of kin's surname"
          type="text"
          fullWidth
          value={nextOfKinSurname}
          onChange={(event) => setNextOfKinSurname(event.target.value.trim())}
        />                              
        <TextField
          required
          margin="dense"
          label="Next of kin's phone"
          type="tel"
          fullWidth
          value={nextOfKinPhone}
          onChange={(event) => setNextOfKinPhone(event.target.value.trim())}
        />                              
        <TextField
          required
          margin="dense"
          label="Next of kin's relationship"
          type="text"
          fullWidth
          value={nextOfKinRelationship}
          onChange={(event) => setNextOfKinRelationship(event.target.value.trim())}
        />       
      </Container>
      <Container maxWidth='sm' disableGutters style={{marginTop: 30, marginBottom: 20}}>
        <Typography variant='h6'>Contact for emergency</Typography>
        <FormControlLabel
          control={<Checkbox checked={sameAsNextOfKin} onChange={handleChange} name="sameAsNextOfKin" />}
          label="Same as next of kin"
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
    </>
  )
}