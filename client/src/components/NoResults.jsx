import React, { useContext } from 'react'
import Alert from './Alert'
import { AppContext } from '../context/Context'
import { NavLink } from 'react-router-dom'

const NoResults = () => {
  const {alert} = useContext(AppContext)
  return (
<div className="NoResults" style={{position:"relative"}}>
   <img src="https://static.vecteezy.com/system/resources/thumbnails/006/208/684/small/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" alt="" />
    <p className='dd-dd-dd-dd-1'>Sorry, product not found</p>
    <p className='clone-limited-resorces'>As a clone product, we operate with limited resources. If you are browsing our website, we recommend searching for products such as <span>headphones</span>, <span>toys</span>, <span>beauty</span>, and <span>fitness</span>.</p>
   <NavLink to={'/'} style={{textDecoration:"none"}}> <button>Back to Home</button></NavLink>
</div>
  )
}

export default NoResults