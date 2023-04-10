import React, { useContext, useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { BsArrowLeft, BsFillLockFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { AppContext } from '../context/Context'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { notification } = useContext(AppContext)
  document.title = "Reset password"

  const forgotPassword = async () => {
  if(email){
    try {
      document.title = "Loading..."
      setLoading(true)
      let data = await fetch('https://ecommerce-website-ocdk.onrender.com/api/v1/forgot-password', {
        method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
      })
      let response = await data.json()
      if (data.ok) {
        setLoading(false)
        setSuccess(true)
        document.title = `${"Email send successfully"}`
      } else {
        notification(response.msg)
        setLoading(false)
        setSuccess(false)
        document.title = "Reset password"
      }
    } catch (err) {
      setLoading(false)
      notification("Something went wrong")
    }
  }else{
    notification("Please enter your email")
  }
  }

  const handleBack = () => {
    navigate(-1)
  }


  return (
    <div className="Container-Wo">
      {
        success ?
          <div className="email-successfully-send">
            <IoCheckmarkDoneCircleOutline style={{ background: " linear-gradient(to right, #ff6d63, #db1e5e)", borderRadius: "50%", height: "100px", width: "100px", color: "white" }} />
            <p className='email-send-succ'>Email Successfully Send</p>
            <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>A reset password link has been send to <span>{email.slice(0, 4) + "********" + email.slice(email.indexOf("@"))}</span> . Please click on the link and reset your password</p>
            <NavLink to={'/login'}>
              <button>Back to Login</button>
            </NavLink>
          </div>
          :
          <div className="login-container">
            <BsArrowLeft className="epy-exit" onClick={handleBack} />
            <FaUserCircle style={{ fontSize: "120px" }} className="person-1" />
            {/* <p className='person-heading'>User Login</p> */}
            <div className="user-inputs">
              <div className='input-icons-div'>
                <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} name="email" autoComplete='off'/>
                <MdEmail style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "23%" }} />
              </div>
            </div>
            {
              loading ?
                <button><Spinner animation="border" style={{ marginRight: "10px" }} />Sending link...</button> :
                <button onClick={forgotPassword}>Send reset link</button>
            }
          </div>
      }
    </div>
  )
}

export default ResetPassword