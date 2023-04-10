import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Context'

const Verifying = () => {
    const navigate = useNavigate()
    const {setUser, setCartData,setFevorates} = useContext(AppContext)
    document.title = "Verifying..."

      useEffect(()=> {
             setTimeout(()=> {
        verifyUser()
             },2000)
      },[])

      const verifyUser = async()=> {
        try {
             let user  = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/check-user',{method:"GET",credentials:"include"})
             let response = await user.json()
             if(user.ok){
                setUser(response)
                navigate('/')
                setCartData(response.cart)
                setFevorates(response.fevorates)
             }else{
              navigate('/')
             }
        } catch (err) {}
      }

  return (
    <div className="Verifying">
        <img src="/logo.png" alt="logo" />
    </div>
  )
}

export default Verifying