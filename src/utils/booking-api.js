import axios from "axios"
import { receptionID } from './bp-codes'

const addPatientURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/add-patient`
const getPatientURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/get-patient`
const addMessageURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/add-message`
const getNumVisitsURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/get-numvisits`
const setEmergencyContactURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/set-emergency-contact`
const updateHealthFundURL = `${process.env.REACT_APP_ASPIRE_BP_SERVER}/update-healthfund`

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
    console.error('BP_ArriveAppointment error', err)
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
  pensionCode=0, pensionNo="", pensionExpiry=null) => {
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
        pensionExpiry
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

export const setEmergencyContact = async (patientID, emergencyContactFirstname, emergencyContactSurname, emergencyContactPhone, emergencyContactRelationship) => {
  try {
    const config = {
      method: 'post',
      headers: {"Content-Type": "application/json"},
      url: setEmergencyContactURL,
      data: {
        patientID, 
        emergencyContactFirstname, 
        emergencyContactSurname, 
        emergencyContactPhone, 
        emergencyContactRelationship
      }
    }
    await axios(config)
  } catch(err) {
    console.error('BP_SetEmergencyContact error', err)
  }
}