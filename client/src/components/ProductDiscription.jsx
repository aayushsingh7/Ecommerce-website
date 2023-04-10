import React from 'react'

const ProductDiscription = ({ data }) => {
  return (
    <div className="ProductDiscription">
        <p style={{fontSize:"1.2rem",fontWeight:"600"}}>Product Discription</p>
        <p style={{fontSize:"1.2rem",fontWeight:"400"}}>{data.discription}</p>
    </div>
  )
}

export default ProductDiscription