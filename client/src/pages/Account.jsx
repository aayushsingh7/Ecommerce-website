import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Context'
import { FaUserCircle } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Account = () => {
  const { user , notification , setUser} = useContext(AppContext)
  const [edit, setEdit] = useState(false)
  const [loading , setLoading ] = useState(false)
  document.title = "Account"
  const [userData, setUserData] = useState({
    name: "",
    address: ""
  })

  useEffect(() => {
    setUserData((data) => {
      return { ...data, name: user.name, address: user.address, email:user.email }
    })
  }, [])
  
  
  const handleInput = (e) => {
    setEdit(true)
    setUserData((old) => {
      return { ...old, [e.target.name]: e.target.value }
    })
  }

  const saveChanges = async () => {
    try {
      setLoading(true)
      setUser((u)=> {
        return {...u, name:userData.name, address:userData.address}
      })
      let data = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/edit-details', {
       method: "PUT",
      credentials: "include", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({
        name:userData.name,
        address:userData.address
      })
    })
      let response = await data.json()
      if (data.ok) {
        setLoading(false)
        notification("Changes saved successfully")
      }else{
        setLoading(false)
        notification('Something went wrong')
      }
    } catch (err) {}
  }

  return (
    <div className="Account">
      <div className="acount-information">
        <FaUserCircle style={{ fontSize: "8rem" }} className="person-1" />
        <input type="text" placeholder='Your name' name='name'  defaultValue={userData.name} onChange={handleInput} />
        <input type="text" placeholder='Your email' defaultValue={userData.email} readOnly />
        <input type="text" placeholder='Your address' name='address'  defaultValue={userData.address} onChange={handleInput} />
        <div className='user-password-and-forgot'> 
         <NavLink to={'/reset-password'}><p>Forgot password</p></NavLink>
        <input type="password" placeholder='Your password' defaultValue={"Secured Password"} readOnly /></div>
        {edit ? <button onClick={loading ? null : saveChanges}>{loading ? "Loading..." : "Save changes"}</button> : <button className='loading'>Save changes</button>}
      </div>
    </div>
  )
}

export default Account