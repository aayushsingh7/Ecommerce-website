import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { BsFillLockFill, BsArrowLeft } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from '../context/Context'

const Login = () => {
  const navigate = useNavigate()
  document.title = "Login"
  const [userInput, setUserInput] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const { notification } = useContext(AppContext)

  const handleInput = (e) => {
    setUserInput((old) => {
      return { ...old, [e.target.name]: e.target.value }
    })
  }


  const login = async () => {
    if (userInput.email && userInput.password) {
      try {
        setLoading(true)
        let loginUser = await fetch('https://ecommerce-website-ocdk.onrender.com/api/v1/login', {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput)
        })
        let response = await loginUser.json()
        if (loginUser.ok) {
          setLoading(false)
          navigate('/verify')
          setTimeout(() => {
            notification('Login Successfully')
          }, 3000)
        } else {
          notification(response.msg)
          setLoading(false)
        }
      } catch (err) { }
    } else {
      notification("Please enter the given information")
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="container-center">
      <div className="login-container">
        <BsArrowLeft className="epy-exit" onClick={handleGoBack} />
        <FaUserCircle style={{ fontSize: "120px" }} className="person-1" />
        {/* <p className='person-heading'>User Login</p> */}
        <div className="user-inputs">
          <div className='input-icons-div'>
            <input type="text" placeholder='Email' onChange={handleInput} name="email" autoComplete='off' />
            <MdEmail style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "23%" }} />
          </div>
          <div className='input-icons-div'>
            <input type="password" placeholder='Password' onChange={handleInput} name="password" autoComplete='off' />
            <BsFillLockFill style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "24%" }} />
          </div>
          <NavLink to={'/reset-password'} className="nav-link" style={{ width: "100%", textAlign: "end", marginTop: "5px" }}>
            <span style={{color:"#004179",fontWeight:"600"}}>Forgot password</span>
          </NavLink>
        </div>
        {
          loading ?
            <button style={{ marginTop: "20px" }}><Spinner animation="border" style={{ marginRight: "10px" }} />Verifying...</button> :
            <button onClick={login} style={{ marginTop: "20px" }}>Login</button>
        }
        <NavLink to={'/register'} className="nav-link">
          <span>Create a new account</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Login