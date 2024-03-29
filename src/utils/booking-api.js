import axios from "axios"
import { receptionID } from './bp-codes'

const addPatientURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/add-patient`
const getPatientURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/get-patient`
const getPatientInfoURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/get-patientinfo`
const addMessageURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/add-message`
const getNumVisitsURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/get-numvisits`
const setEmergencyContactURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/set-emergency-contact`
const setNextOfKinURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/set-next-of-kin`
const updateHealthFundURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/update-healthfund`
const updateDVAURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/update-DVA`
const updateAddressURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/update-address`
const updateEmailURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/update-email`

const addMessageToBP = async (userID, subject, message, patID) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: addMessageURL,
      data: {
        userID,
        subject,
        message,
        patID
      }
    }
    const result = await axios(config)

    return result.data
  } catch(err) {
    console.error('BP_AddMessage error', err)
  }
}

export const getPatientFromBP = async (surname, firstname, dob) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: getPatientURL,
      data: {
        surname: surname,
        dob: dob
      }
    }
    const result = await axios(config)
    const patList = result.data

    let id = null
    let normalisedName = firstname.toUpperCase().replace(/-| /g,'')
    if (patList.length > 0) {
      patList.forEach(element => {
        const firstnameFromBP = element.firstname.toUpperCase().replace(/-| /g,'')
        if (normalisedName === firstnameFromBP)
          id = element.id
        else if (normalisedName.includes(firstnameFromBP) || firstnameFromBP.includes(normalisedName)) {
          const message = `New patient ${firstname} ${surname} ${dob} may be a duplicate of existing patient ${element.firstname} ${surname}.`
          addMessageToBP(receptionID, "Check duplicated patients", message, element.id)
        }
      })
    }

    return id
  } catch(err) {
    console.error('BP_GetPatientByPartSurnameDOB error', err)
  }
}

export const addPatientToBP = async (titleCode, firstname, surname, dob, sexCode, address1="", city="", postcode="", 
  email="", homePhone="", workPhone="", mobilePhone="", medicareNo="", medicareLineNo="", medicareExpiry="", 
  pensionCode=0, pensionNo="", pensionExpiry=null, ethnicCode=0) => {
  console.log("The URL", addPatientURL)    
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: addPatientURL,
      data: {
        titleCode,
        firstname,
        surname,
        dob,
        sexCode,
        address1, 
        city, 
        postcode, 
        email, 
        homePhone, 
        workPhone, 
        mobilePhone, 
        medicareNo, 
        medicareLineNo, 
        medicareExpiry, 
        pensionCode, 
        pensionNo, 
        pensionExpiry,
        ethnicCode
      }
    }
    const result = await axios(config)

    return result.data
  } catch(err) {
    console.error('BP_AddPatient error', err)
  }
}

export const getNumVisitsFromBP = async (bpPatientId) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: getNumVisitsURL,
      data: {
        patientID: bpPatientId
      }
    }
    const result = await axios(config)
    const numVisits = result.data

    return numVisits
  } catch(err) {
    console.error('BP fetching number of visits error', err)
  }
}

export const setEmergencyContact = async (patientID, firstname, surname, contactPhone, relationship) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: setEmergencyContactURL,
      data: {
        patientID, 
        firstname, 
        surname, 
        contactPhone, 
        relationship
      }
    }
    return axios(config)
  } catch(err) {
    console.error('BP_SetEmergencyContact error', err)
  }
}

export const setNextOfKin = async (patientID, firstname, surname, contactPhone, relationship) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: setNextOfKinURL,
      data: {
        patientID, 
        firstname, 
        surname, 
        contactPhone, 
        relationship
      }
    }
    return axios(config)
  } catch(err) {
    console.error('BP_SetNextOfKin error', err)
  }
}

export const updateHealthFund = async (patientID, healthFundNo, healthFundName, healthFundExpiry) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updateHealthFundURL,
      data: {
        patientID, 
        healthFundNo, 
        healthFundName, 
        healthFundExpiry
      }
    }
    return axios(config)
  } catch(err) {
    console.error('BP_UpdateHealthFund error', err)
  }
}

export const updateDVA = async (patientID, dVACode, dVANo) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updateDVAURL,
      data: {
        patientID, 
        dVACode,
        dVANo
      }
    }
    return axios(config)
  } catch(err) {
    console.error('BP_UpdatePatientDVA error', err)
  }
}

export const fetchPatientInfo = async (patientID, setPatientInfo) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: getPatientInfoURL,
      data: {
        patientID       
      }
    }
    const result = await axios(config)
    setPatientInfo(result.data)
  } catch(err) {
    console.error('BP_GetPatientByInternalID error', err)
  }
}

export const updateAddress = async (patientID, address1, city, postcode) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updateAddressURL,
      data: {
        patientID, 
        address1, 
        city, 
        postcode
      }
    }
    return axios(config)
  } catch(err) {
    console.error('BP_UpdateAddress error', err)
  }
}

export const updateEmail = async (patientID, email) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: updateEmailURL,
      data: {
        patientID, 
        email
      }
    }
    return axios(config)
  } catch(err) {
    console.error('BP_UpdateEmail error', err)
  }
}

export const parseAddress = (address) => {
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