import React from 'react'

const ProductHead = () => {
  return (
    <div className="price-container">
    <div style={{display:"flex",fontSize:"28px",alignItems:"center",marginBottom:"10px",marginTop:"10px",justifyContent:"center"}}>
      <p style={{color:"red",fontWeight:"-100"}}>-{12}%</p>
      <div className="price-1">
      <p style={{fontSize:"14px",position:"relative",top:"3px"}}>₹</p>
      <p>{23}</p>
      </div>
    </div>
    <div className="mrp_1" style={{fontSize:"14px"}}>
      <p>M.R.P:</p>
      <p style={{textDecoration:"line-through",marginLeft:"5px",marginBottom:"10px"}}>₹{120}</p>
    </div>
 
 <p style={{fontSize:"14px"}}>Inclusive of all taxes</p>
   </div>
  )
}

export default ProductHead