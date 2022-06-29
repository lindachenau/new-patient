import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { fetchPatientInfo } from '../utils/booking-api'
import logo from '../images/AMCE_banner.png'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useLocation } from 'react-router-dom'
import Verification from '../components/Verification'

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

const MobileVerification = ({ theme }) => {
  const classes = useStyles(theme)
  const [patientInfo, setPatientInfo] = useState(null)
  const [verified, setVerified] = useState(false)
  const patientName = `${patientInfo?.firstname} ${patientInfo?.surname}`
  const [mobile, setMobile] = useState('')
  const location = useLocation()
  const clause = `Our practice sends SMS communications to patients so we have to verify your mobile number. 
  To do this, we will send a SMS to your mobile phone containing a 6 digit code. 
  Press SEND to receive the code. After you enter the code you received, press VERIFY to enable submission. 
  If you don't receive the code within a few seconds, please check your mobile number. 
  For further information about how we use SMS communications, please see our&nbsp; `


  useEffect(() => {
    const fetchPatient = async() => {
      const id = location.search.substring(4)
      fetchPatientInfo(parseInt(id), setPatientInfo)
    }
    fetchPatient()
  }, [location])

  useEffect(() => {
    if (patientInfo)
      setMobile(patientInfo.mobilePhone)
  }, [patientInfo])

  return (
    <Container maxWidth='sm' style={{marginTop: 20, marginBottom: 40}}>
      <div className={classes.center}>
        <img className={classes.logo} src={logo} alt="Aspire Medical Centre Eastwood logo" />
      </div>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Mobile Number Verification for Existing Patient
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
        label="Mobile number"
        type="tel"
        fullWidth
        value={mobile}
      />
      <Verification mobile={mobile} verified={verified} setVerified={setVerified} clause={clause}/>
    </Container>
  )
}

export default MobileVerification