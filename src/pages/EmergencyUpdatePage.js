import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { fetchPatientInfo, setEmergencyContact, setNextOfKin } from '../utils/booking-api'
import logo from '../images/AMCE_banner.png'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20
  },
  logo: {
    height: 150,
    [theme.breakpoints.down('sm')]: {
      height: 100
    },
    marginBottom: 20,
  }
}))

const EmergencyUpdatePage = ({ theme }) => {
  const classes = useStyles(theme)
  const [patientInfo, setPatientInfo] = useState(null)
  const patientName = `${patientInfo?.firstname} ${patientInfo?.surname}`
  const location = useLocation()
  const [emergencyContactFirstname, setEmergencyContactFirstname] = useState('')
  const [emergencyContactSurname, setEmergencyContactSurname] = useState('')
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('')
  const [nextOfKinFirstname, setNextOfKinFirstname] = useState('')
  const [nextOfKinSurname, setNextOfKinSurname] = useState('')
  const [nextOfKinPhone, setNextOfKinPhone] = useState('')
  const [nextOfKinRelationship, setNextOfKinRelationship] = useState('')    
  
  useEffect(() => {
    const fetchPatient = async() => {
      const id = location.search.substring(4)
      fetchPatientInfo(parseInt(id), setPatientInfo)
    }
    fetchPatient()
  }, [location])

  const handleSubmit = async() => {
    await setEmergencyContact(patientInfo.patientID, emergencyContactFirstname, emergencyContactSurname, emergencyContactPhone, emergencyContactRelationship)
    await setNextOfKin(patientInfo.patientID, nextOfKinFirstname, nextOfKinSurname, nextOfKinPhone, nextOfKinRelationship)
    alert('Your emergency and next of kin contacts are updated successfully.')
  }

  return (
    <Container maxWidth='sm' style={{marginTop: 20, marginBottom: 40}}>
      <div className={classes.center}>
        <img className={classes.logo} src={logo} alt="Aspire Medical Centre Eastwood logo" />
      </div>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Patient emergency & next of kin contact update
      </Typography>            
      <TextField
        margin="dense"
        label="Patient name"
        type="text"
        fullWidth
        value={patientName}
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
      <div className={classes.center}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={!(emergencyContactFirstname && emergencyContactSurname && emergencyContactPhone && emergencyContactRelationship &&
            nextOfKinFirstname && nextOfKinSurname && nextOfKinPhone && nextOfKinRelationship)} 
        >
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default EmergencyUpdatePage