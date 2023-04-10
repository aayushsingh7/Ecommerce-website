import React from 'react'
import {NavLink} from 'react-router-dom'

const EmptyPageTemplate = ({ img , txt}) => {
  return (
    <div className='flex-center full-screen'>
        <img src={img} alt="" />
         <p>{txt}</p>
         <NavLink to={"/"}> <button className='add-cart' style={{ maxWidth: "300px" }}>Back to shopping</button></NavLink>
          </div> 
  )
}

export default EmptyPageTemplate