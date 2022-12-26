import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { fetchPatientInfo, parseAddress, updateAddress } from '../utils/booking-api'
import logo from '../images/AMCE_banner.png'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LocationSearchInput from '../components/LocationSearchInput'

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

const AddressUpdatePage = ({ theme }) => {
  const classes = useStyles(theme)
  const [patientInfo, setPatientInfo] = useState(null)
  const patientName = `${patientInfo?.firstname} ${patientInfo?.surname}`
  const [address, setAddress] = useState('')
  const location = useLocation()
  
  useEffect(() => {
    const fetchPatient = async() => {
      const id = location.search.substring(4)
      fetchPatientInfo(parseInt(id), setPatientInfo)
    }
    fetchPatient()
  }, [location])

  const handleSubmit = async() => {
    const {address1, city, postcode} = parseAddress(address)
    await updateAddress(patientInfo.patientID, address1, city, postcode)
    alert('Your address is updated successfully.')
  }
  
  const onChangeLocation = address => {
    setAddress(address.replace(', Australia', ''))
  }

  return (
    <Container maxWidth='sm' style={{marginTop: 20, marginBottom: 40}}>
      <div className={classes.center}>
        <img className={classes.logo} src={logo} alt="Aspire Medical Centre Eastwood logo" />
      </div>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Patient address update
      </Typography>            
      <TextField
        margin="dense"
        label="Patient name"
        type="text"
        fullWidth
        value={patientName}
      />
      <LocationSearchInput
        address={address} 
        changeAddr={onChangeLocation}
      />
      <div className={classes.center}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={!address} 
        >
          Submit
        </Button>
      </div>
    </Container>
  )
}

export default AddressUpdatePage