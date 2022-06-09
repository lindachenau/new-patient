import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import NewPatientForm from './components/NewPatientForm'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00a3c1'
    },
    secondary: {
      main: '#e3622f'
    }
  }
})

function App() {
  const [patientInfo, setPatientInfo] = useState({})

  return (
    <ThemeProvider theme={theme}>
      <NewPatientForm patientInfo={patientInfo}/>
    </ThemeProvider>
  )
}

export default App
