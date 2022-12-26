import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

export default function Verification({mobile, verified, setVerified, clause}) {
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
      <Typography variant='caption'>
        {clause} 
      </Typography>
      <Link color='primary' variant='caption' href='https://aspiremedicalcentre.com.au/communication-policy/' underline="always" target='_blank'>
        Communication Policy
      </Link>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button
          color="primary" 
          onClick={() => sendVerificationCode(mobile, setKey)} 
          disabled={verified || mobile.length < 10}       
        >
          Send
        </Button>
        <Button
          color="primary" 
          onClick={handleVerify} 
          disabled={verified || mobile.length < 10 || key.length === 0}       
        >
          Verify
        </Button>
      </div>
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
    </Container>
  )
}