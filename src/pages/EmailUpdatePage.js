import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { fetchPatientInfo, updateEmail } from '../utils/booking-api'
import logo from '../images/AMCE_banner.png'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import * as EmailValidator from "email-validator"

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

const EmailUpdatePage = ({ theme }) => {
  const classes = useStyles(theme)
  const [patientInfo, setPatientInfo] = useState(null)
  const patientName = `${patientInfo?.firstname} ${patientInfo?.surname}`
  const [email, setEmail] = useState('')
  const location = useLocation()
  
  useEffect(() => {
    const fetchPatient = async() => {
      const id = location.search.substring(4)
      fetchPatientInfo(parseInt(id), setPatientInfo)
    }
    fetchPatient()
  }, [location])

  const handleSubmit = async() => {
    await updateEmail(patientInfo.patientID, email)
    alert('Your email is updated successfully.')
  }

  return (
    <Container maxWidth='sm' style={{marginTop: 20, marginBottom: 40}}>
      <div className={classes.center}>
        <img className={classes.logo} src={logo} alt="Aspire Medical Centre Eastwood logo" />
      </div>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Patient email update
      </Typography>            
      <TextField
        margin="dense"
        label="Patient name"
        type="text"
        fullWidth
        value={patientName}
      />
      <TextField
        margin="dense"
        label="email"
        type="email"
        fullWidth
        value={email}
        onChange={(event) => setEmail(event.target.value.trim())}
      />
      <div className={classes.center}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={!EmailValidator.validate(email)} 
        >
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default EmailUpdatePage