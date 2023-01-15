import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { addPatientToBP, getPatientFromBP, setEmergencyContact, setNextOfKin, updateHealthFund, updateDVA, parseAddress } from '../utils/booking-api'
import Profile from '../components/Profile'
import PatientContact from '../components/PatientContact'
import Medicare from '../components/Medicare'
import DVA from '../components/DVA'
import Pension from '../components/Pension'
import HealthFund from '../components/HealthFund'
import MobileVerification from '../components/MobileVerification'
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
  const [ethnicCode, setEthnicCode] = useState(0)
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
  const [nextOfKinFirstname, setNextOfKinFirstname] = useState('')
  const [nextOfKinSurname, setNextOfKinSurname] = useState('')
  const [nextOfKinPhone, setNextOfKinPhone] = useState('')
  const [nextOfKinRelationship, setNextOfKinRelationship] = useState('')  
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
  //Temporarily bypass mobile verification
  const [verified, setVerified] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const profileComplete = firstName && lastName && dOB && gender > 0 && ethnicCode > 0
  const contactComplete = address && mobile && emergencyContactFirstname && emergencyContactSurname && emergencyContactPhone && emergencyContactRelationship &&
    nextOfKinFirstname && nextOfKinSurname && nextOfKinPhone && nextOfKinRelationship
  const medicareComplete = medicare === "N" || (medicareNo && iRN && expiry)
  const pensionComplete = pension === "N" || (pensionCode > 0 && pensionNo && pensionExpiry)
  const dVAComplete = veteran === "N" || (dVACode > 0 && dVANo)
  const healthFundComplete = healthFund === "N" || (healthFundName && healthFundNo && healthFundExpiry)
  const clause = `Our practice sends SMS communications to patients. Before you can submit your completed form, 
  we have to verify your mobile number. To do this, we will send a SMS to your mobile phone containing a 6 digit code. 
  Press SEND to receive the code. After you enter the code you received, press VERIFY to enable submission. 
  If you don't receive the code within a few seconds, please check your mobile number. 
  For further information about how we use SMS communications, please see our `

  
  
  const handleSubmit = async() => {
    const dobBP = moment(dOB).format("YYYY-MM-DD")
    //Check if the patient already exists first
    const patList = await getPatientFromBP(lastName, firstName, dobBP)
    if (patList.length > 0) {
      setSubmitted(true)
      alert('You are already our patient. No need to register.')
      return
    }

    const {address1, city, postcode} = parseAddress(address)
    const pensionExpiryBP = pensionExpiry ? moment(pensionExpiry).format("YYYY-MM-DD") : null
    const patientID = await addPatientToBP(
      title, 
      firstName.trim(), 
      lastName.trim(), 
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
      pensionExpiryBP,
      ethnicCode
    )

    if (patientID > 0) {
      setSubmitted(true)
      alert("Your registration has completed successfully.")
      setEmergencyContact(patientID, emergencyContactFirstname, emergencyContactSurname, emergencyContactPhone, emergencyContactRelationship)
      setNextOfKin(patientID, nextOfKinFirstname, nextOfKinSurname, nextOfKinPhone, nextOfKinRelationship)
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
        ethnicCode={ethnicCode}
        setEthnicCode={setEthnicCode}
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
        nextOfKinFirstname={nextOfKinFirstname}
        setNextOfKinFirstname={setNextOfKinFirstname}
        nextOfKinSurname={nextOfKinSurname}
        setNextOfKinSurname={setNextOfKinSurname}
        nextOfKinPhone={nextOfKinPhone}
        setNextOfKinPhone={setNextOfKinPhone}
        nextOfKinRelationship={nextOfKinRelationship}
        setNextOfKinRelationship={setNextOfKinRelationship}
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
      {/* <MobileVerification mobile={mobile} verified={verified} setVerified={setVerified} clause={clause}/> */}
      <div className={classes.center}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={!(profileComplete && contactComplete && medicareComplete && dVAComplete && pensionComplete && healthFundComplete && verified && !submitted)} 
        >
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default NewPatientForm
