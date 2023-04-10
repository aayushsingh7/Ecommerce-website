import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { NavLink} from 'react-router-dom'
import {BsFillLockFill , BsArrowLeft} from 'react-icons/bs'
import {MdEmail, MdPerson} from 'react-icons/md'
import {FaGalacticSenate, FaUserCircle} from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner';
import {MdLocationCity} from 'react-icons/md'
import { AppContext } from '../context/Context'

const Register = () => {
  const navigate = useNavigate()
  const {notification} = useContext(AppContext)
  const [loading , setLoading] = useState(false)
  document.title = "Register"
  const [userInput , setUserInput] = useState({email:"",password:"",name:""})
  
  const handleInput = (e)=> {
    setUserInput((old)=> {
      return {...old , [e.target.name]:e.target.value}
    })
  }

  const handleGoBack = ()=> {
 navigate(-1)
  }

  const register = async()=> {
    if(userInput.email && userInput.password && userInput.name){
      try {
        setLoading(true)
        let registerUser = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/register',{
          method:"POST",
         credentials:"include",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(userInput)
        })
        let response = await registerUser.json()
        if(registerUser.ok){
          setLoading(false)
        notification('Registered Successfully')
        navigate('/')
        }else{
          setLoading(false)
          notification(response.msg)
        }
      } catch (err) {}
    }else{
      notification("Please enter the given information")
    }
  }

  return (
    <div className="container-center">
        <div className="login-container">
        <BsArrowLeft className="epy-exit" onClick={handleGoBack} />
        <FaUserCircle style={{ fontSize: "120px" }} className="person-1" />
        {/* <p className='person-heading'>User Login</p> */}
        <div className="user-inputs">

        <div className='input-icons-div'>
            <input type="text" placeholder='Name' onChange={handleInput} name="name"  autoComplete='off'/>
            <MdPerson style={{ color: "#a0a0a0", fontSize: "30px", position: "absolute", left: "3%", bottom: "17%" }} />
          </div>

          <div className='input-icons-div'>
            <input type="text" placeholder='Address' onChange={handleInput} name="address"  autoComplete='off'/>
            <MdLocationCity style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "23%" }} />
          </div>

          <div className='input-icons-div'>
            <input type="text" placeholder='Email' onChange={handleInput} name="email" autoComplete='off' />
            <MdEmail style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "23%" }} />
          </div>

          <div className='input-icons-div'>
            <input type="password" placeholder='Password' onChange={handleInput} name="password"  autoComplete='off'/>
            <BsFillLockFill style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "24%" }} />
          </div>


        </div>
        {
          loading ?
            <button style={{marginTop:"20px"}}><Spinner animation="border" style={{ marginRight: "10px" }} />Registering...</button> :
            <button onClick={register} style={{marginTop:"20px"}}>Register</button>
        }
        <NavLink to={'/login'} className="nav-link">
          <span>Already have an account? Login</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Register