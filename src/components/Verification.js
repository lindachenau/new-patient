import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function Verification({mobile, verified, setVerified}) {
  const [code, setCode] = useState(null)
  const [key, setKey] = useState('')

  const sendVerificationCode = async (phone, setKey) => {
    try {
      const res = await fetch(process.env.REACT_APP_SMSCODE_API, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({     
          phoneNumber: phone
        })
      })
      const {code} = await res.json()
      setKey(code)
      return true
    }
    catch (error) {
      alert(error)
      return false
    }
  }

  const handleVerify = () => {
    if (code === key) {
      setVerified(true)
      alert("Your mobile number has been verified successfully.")
    } else {
      alert("The code you entered is incorrect. Check your code and VERIFY again.")
    }
  }

  return (
    <Container maxWidth='sm' disableGutters style={{marginTop: 20, marginBottom: 20}}>
      <Typography variant='h6'>Verification</Typography>
      <Typography variant='body2' gutterBottom>
        Before you can submit your completed form, we have to verify your mobile number. 
        To do this, we will send a SMS to your mobile phone containing a 6 digit code. 
        Press SEND to receive the code. After you enter the code you received, press VERIFY to enable submission. 
        If you don't receive the code within a few seconds, please check your mobile number.
      </Typography>
      <Button
        color="primary" 
        onClick={() => sendVerificationCode(mobile, setKey)} 
        disabled={verified || mobile.length < 10}       
      >
        Send
      </Button>
      <TextField
        required
        margin="dense"
        label="The verification code you received"
        type="tel"
        fullWidth
        placeholder="xxxxxx"
        value={code}
        onChange={(event) => setCode(event.target.value.trim())}
      />
      <Button
        color="primary" 
        onClick={handleVerify} 
        disabled={verified || mobile.length < 10 || key.length === 0}       
      >
        Verify
      </Button>
    </Container>
  )
}