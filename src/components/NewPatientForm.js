import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { addPatientToBP, getPatientFromBP } from '../utils/booking-api'
import Profile from './Profile'
import PatientContact from './PatientContact'
import Medicare from './Medicare'
import Pension from './Pension'
import moment from 'moment'
import logo from '../images/AMCE_banner.png'

const useStyles = makeStyles(theme => ({
  center: {
    display: "flex",
    justifyContent: "center"
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
  const [withMedicare, setWithMedicare] = useState(false)
  const [withPension, setWithPension] = useState(false)
  const profileComplete = firstName && lastName && dOB && gender > 0
  const contactComplete = address && mobile && emergencyContactFirstname && emergencyContactSurname && setEmergencyContactPhone && emergencyContactRelationship
  const medicareComplete = !withMedicare || (medicareNo && iRN && expiry)
  const pensionComplete = !withPension || (pensionCode > 0 && pensionNo && pensionExpiry)

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
    const result = await addPatientToBP(
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
      pensionExpiry
    )

    const message = result > 0 ? "Your registration has completed successfully." : "Something went wrong. Please contact the practice."
    alert(message)
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
      <Container maxWidth='sm' style={{marginTop: 30}}>
        <Typography gutterBottom variant="body1" color='primary'>
          Please tick relevant 
        </Typography>            
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={withMedicare} onChange={() => setWithMedicare(!withMedicare)} color='primary' />}
            label="I have Medicare."
          />      
          <FormControlLabel
            control={<Checkbox checked={withPension} onChange={() => setWithPension(!withPension)} color='primary' />}
            label="I'm a pensioner."
          />      
        </FormGroup>
      </Container>
      {
        withMedicare &&
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
        withPension &&
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
          disabled={!(profileComplete && contactComplete && medicareComplete && pensionComplete)} >
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default NewPatientForm
