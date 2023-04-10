import React from 'react'
import { NavLink } from 'react-router-dom'
import Ratings from './Ratings'

const HorizontalProductBox = ({ data }) => {
  return (
    <NavLink to={`/product/${data._id}`} style={{textDecoration:"none"}} onClick={()=> scrollTo(0,0)}>
      <div className="Horizontal-product-box">
    <div className="img-container-re">
     <img src={data.images[0]} alt="" />
    </div>

    <div className="product-info-two">
     <p className='r-name wrap-add-four'>{data.name}</p>
   
   <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
   <Ratings data={data.reviews}/>
   <span style={{marginLeft:"6px",position:"relative",top:"1px",color:"#00798c",fontSize:"15px"}}>{data.reviews?.length}</span>
   </div>
   
   <div  style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"5px"}}>
   <span className='r-price'>₹{data.finalPrice}</span>
   <span className='r-discount'>({data.discount}% off)</span>
   </div>
    </div>
  </div>
    </NavLink>
  )
}

export default HorizontalProductBox