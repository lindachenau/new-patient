import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import NewPatientForm from './pages/NewPatientForm'
import EmergencyUpdatePage from './pages/EmergencyUpdatePage'
import AddressUpdatePage from './pages/AddressUpdatePage'
import EmailUpdatePage from './pages/EmailUpdatePage'

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
          <Route path="/emergency" element={<EmergencyUpdatePage/>}/>
          <Route path="/address" element={<AddressUpdatePage/>}/>
          <Route path="/email" element={<EmailUpdatePage/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
