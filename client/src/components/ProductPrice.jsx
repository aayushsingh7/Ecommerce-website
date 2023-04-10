import React from 'react'
import ProductPriceDetails from './ProductPriceDetails'

const ProductPrice = ({ data }) => {
  return (
    <div className="price-container">
    <div style={{display:"flex",fontSize:"28px",alignItems:"center",marginBottom:"10px",marginTop:"10px",justifyContent:"center"}}>
      <p style={{color:"red",fontWeight:"-100"}}>-{data.discount}%</p>
      <div className="price-1">
      <p style={{fontSize:"14px",position:"relative",top:"3px"}}>₹</p>
      <p>{data.finalPrice?.toLocaleString()}</p>
      </div>
    </div>
    <div className="mrp_1" style={{fontSize:"14px"}}>
      <p>M.R.P:</p>
      <p style={{textDecoration:"line-through",marginLeft:"5px",marginBottom:"10px"}}>₹{data.originalPrice?.toLocaleString()}</p>
    </div>
 
 <p style={{fontSize:"14px"}}>Inclusive of all taxes</p>
 <div className="manage-display-price">
<ProductPriceDetails data={data}/>
</div>
   </div>
  )
}

export default ProductPrice