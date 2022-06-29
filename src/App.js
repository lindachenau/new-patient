import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import NewPatientForm from './pages/NewPatientForm'
import MobileVerification from './pages/MobileVerification'

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
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<NewPatientForm/>}/>
          <Route path="/mobile" element={<MobileVerification/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
