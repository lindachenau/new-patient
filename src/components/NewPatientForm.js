import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { addPatientToBP, getPatientFromBP, setEmergencyContact, updateHealthFund, updateDVA } from '../utils/booking-api'
import Profile from './Profile'
import PatientContact from './PatientContact'
import Medicare from './Medicare'
import DVA from './DVA'
import Pension from './Pension'
import HealthFund from './HealthFund'
import moment from 'moment'
import logo from '../images/AMCE_banner.png'

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

function NewPatientForm({}) {
  const classes = useStyles()
  const [title, setTitle] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dOB, setDOB] = useState(null)
  const [gender, setGender] = useState(0)
  const [medicareNo, setMedicareNo] = useState('')
  const [iRN, setIRN] = useState('')
  const [expiry, setExpiry] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [homeNumber, setHomeNumber] = useState('')
  const [workNumber, setWorkNumber] = useState('')
  const [emergencyContactFirstname, setEmergencyContactFirstname] = useState('')
  const [emergencyContactSurname, setEmergencyContactSurname] = useState('')
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('')
  const [pensionCode, setPensionCode] = useState(0)
  const [pensionNo, setPensionNo] = useState('')
  const [pensionExpiry, setPensionExpiry] = useState(null)
  const [dVACode, setDVACode] = useState(0)
  const [dVANo, setDVANo] = useState('')
  const [healthFundNo, setHealthFundNo] = useState('')
  const [healthFundName, setHealthFundName] = useState('')
  const [healthFundExpiry, setHealthFundExpiry] = useState(null)
  const [medicare, setMedicare] = useState("Y")
  const [veteran, setVeteran] = useState("N")
  const [pension, setPension] = useState("N")
  const [healthFund, setHealthFund] = useState("N")
  const profileComplete = firstName && lastName && dOB && gender > 0
  const contactComplete = address && mobile && emergencyContactFirstname && emergencyContactSurname && setEmergencyContactPhone && emergencyContactRelationship
  const medicareComplete = medicare === "N" || (medicareNo && iRN && expiry)
  const pensionComplete = pension === "N" || (pensionCode > 0 && pensionNo && pensionExpiry)
  const dVAComplete = veteran === "N" || (dVACode > 0 && dVANo)
  const healthFundComplete = healthFund === "N" || (healthFundName && healthFundNo && healthFundExpiry)

  const parseAddress = (address) => {
    const comma = address.indexOf(',')
    let address1 = comma === -1 ? address : address.substring(0, comma)
    const stateList = ['NSW', 'QLD', 'VIC', 'WA', 'NT', 'TAS', 'SA', 'ACT', 'JBT']
    const states = stateList.filter(state => address.includes(state))
    let city = ""
    let postcode = ""

    if (states.length === 1) {
      const state = states[0]
      const statePos = address.indexOf(state)
      city = address.substring(comma + 1, statePos).trim()
      postcode = address.substring(statePos + state.length).trim()
    } else {
      // parsing failed. Just save everything to address1
      address1 = address
    }

    return {address1, city, postcode}
  }
  
  const handleSubmit = async() => {
    const dobBP = moment(dOB).format("YYYY-MM-DD")
    //Check if the patient already exists first
    const bpId = await getPatientFromBP(lastName, firstName, dobBP)
    if (bpId) {
      alert('You are already our patient. No need to register.')
      return
    }

    const {address1, city, postcode} = parseAddress(address)
    const pensionExpiryBP = pensionExpiry ? moment(pensionExpiry).format("YYYY-MM-DD") : null
    const patientID = await addPatientToBP(
      title, 
      firstName, 
      lastName, 
      dobBP, 
      gender, 
      address1, 
      city, 
      postcode, 
      email, 
      homeNumber, 
      workNumber, 
      mobile, 
      medicareNo, 
      iRN, 
      expiry,
      pensionCode, 
      pensionNo, 
      pensionExpiryBP
    )

    if (patientID > 0) {
      alert("Your registration has completed successfully.")
      setEmergencyContact(patientID, emergencyContactFirstname, emergencyContactSurname, emergencyContactPhone, emergencyContactRelationship)
      if (veteran === "Y") {
        updateDVA(patientID, dVACode, dVANo)
      }
      if (healthFund === "Y") {
        const healthFundExpiryBP = moment(healthFundExpiry).format("YYYY-MM-DD")
        updateHealthFund(patientID, healthFundNo, healthFundName, healthFundExpiryBP)
      }
    } else {
      alert("Something went wrong. Please contact the practice.")
    }
  }

  const handleMedicare = (event) => {
    setMedicare(event.target.value)
    if (event.target.value === 'N') {
      setVeteran('N')
      setPension('N')
    } else {
      setHealthFund('N')
    }
  }
  
  return (
    <Container maxWidth='sm' style={{marginTop: 20, marginBottom: 40}}>
      <div className={classes.center}>
        <img className={classes.logo} src={logo} alt="Aspire Medical Centre Eastwood logo" />
      </div>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        New Patient Registration Form
      </Typography>      
      <Profile
        title={title}
        setTitle={setTitle}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        dOB={dOB}
        setDOB={setDOB}
        gender={gender}
        setGender={setGender}
      />
      <PatientContact
        address={address}
        setAddress={setAddress}
        email={email}
        setEmail={setEmail}
        mobile={mobile}
        setMobile={setMobile}
        homeNumber={homeNumber}
        setHomeNumber={setHomeNumber}
        workNumber={workNumber}
        setWorkNumber={setWorkNumber}
        emergencyContactFirstname={emergencyContactFirstname}
        setEmergencyContactFirstname={setEmergencyContactFirstname}
        emergencyContactSurname={emergencyContactSurname}
        setEmergencyContactSurname={setEmergencyContactSurname}
        emergencyContactPhone={emergencyContactPhone}
        setEmergencyContactPhone={setEmergencyContactPhone}
        emergencyContactRelationship={emergencyContactRelationship}
        setEmergencyContactRelationship={setEmergencyContactRelationship}
      />
      <Container maxWidth='sm' disableGutters style={{marginTop: 30}}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Do you have Medicare?</FormLabel>
          <RadioGroup aria-label="medicare" value={medicare} onChange={handleMedicare}>
            <FormControlLabel value="Y" control={<Radio />} label="Yes" />
            <FormControlLabel value="N" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>              
      </Container>        
      {
        medicare === 'Y' &&
        <Medicare
          medicareNo={medicareNo}
          setMedicareNo={setMedicareNo}
          iRN={iRN}
          setIRN={setIRN}
          expiry={expiry}
          setExpiry={setExpiry}
        />
      }
      { 
        medicare === 'N' &&
        <Container maxWidth='sm' disableGutters style={{marginTop: 30}}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Do you have a health fund?</FormLabel>
            <RadioGroup aria-label="health fund" value={healthFund} onChange={(event) => setHealthFund(event.target.value)}>
              <FormControlLabel value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel value="N" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>              
        </Container>
      }
      {
        healthFund === 'Y' &&
        <HealthFund
          healthFundNo={healthFundNo}
          setHealthFundNo={setHealthFundNo}
          healthFundName={healthFundName}
          setHealthFundName={setHealthFundName}
          healthFundExpiry={healthFundExpiry}
          setHealthFundExpiry={setHealthFundExpiry}
        />
      }
      {
        medicare === 'Y' &&
        <Container maxWidth='sm' disableGutters style={{marginTop: 30}}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Are you a veteran?</FormLabel>
            <RadioGroup aria-label="veteran" value={veteran} onChange={(event) => setVeteran(event.target.value)}>
              <FormControlLabel value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel value="N" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>              
        </Container>
      }
      {
        veteran === 'Y' &&
        <DVA
          dVACode={dVACode}
          setDVACode={setDVACode}
          dVANo={dVANo}
          setDVANo={setDVANo}
        />
      }
      { 
        medicare === 'Y' && veteran === 'N' &&
        <Container maxWidth='sm' disableGutters style={{marginTop: 30}}>      
          <FormControl component="fieldset">
            <FormLabel component="legend">Are you a pensioner?</FormLabel>
            <RadioGroup aria-label="pension" value={pension} onChange={(event) => setPension(event.target.value)}>
              <FormControlLabel value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel value="N" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>              
        </Container>
      }
      {
        pension === 'Y' &&
        <Pension
          pensionCode={pensionCode}
          setPensionCode={setPensionCode}
          pensionNo={pensionNo}
          setPensionNo={setPensionNo}
          pensionExpiry={pensionExpiry}
          setPensionExpiry={setPensionExpiry}
        />
      }
      <div className={classes.center}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={!(profileComplete && contactComplete && medicareComplete && dVAComplete && pensionComplete && healthFundComplete)} >
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default NewPatientForm
