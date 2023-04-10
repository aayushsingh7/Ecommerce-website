import React, { useContext } from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { BsCartFill, BsHeartFill } from 'react-icons/bs'
import {  IoLogOut } from 'react-icons/io5'
import { AppContext } from '../context/Context'

const OptionsNav = ({ setShow}) => {
  const {cartData } = useContext(AppContext)
  return (
    <div className="OptionsNav">
      <NavLink to={'/cart'} onClick={()=> setShow(false)} style={{position:"relative"}}>
      {cartData.length > 0 ? <p className='notification'>{cartData.length}</p> : null}
        <BsCartFill style={{color:"#555",marginRight:"24px",fontSize:"20px"}}/><p>Cart</p></NavLink>
      <NavLink to={'/wishlist'} onClick={()=> setShow(false)}><BsHeartFill style={{color:"#555",marginRight:"27px",fontSize:"17px"}}/><p>Wishlist</p></NavLink>
      <NavLink to={'/account'} onClick={()=> setShow(false)}><BsPersonFill style={{color:"#555",marginRight:"22px",fontSize:"23px"}}/><p>Account</p></NavLink>
      <NavLink to={'/logout'} onClick={()=> setShow(false)}><IoLogOut style={{color:"#555",marginRight:"18px",marginLeft:"2px",fontSize:"25px",}}/><p>Logout</p></NavLink>
    </div>
  )
}

export default OptionsNav