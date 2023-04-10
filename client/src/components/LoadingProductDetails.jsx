import React from 'react'

const LoadingProductDetails = () => {
  return (
    <div className="ProductDetails">
      <p className='product_name large loading-text'></p>
      <p className='product_name large loading-text' style={{width:"80%"}}></p>
      <p className='product_name large loading-text' style={{width:"40%"}}></p>

      <div className="ratings-component" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "10px 0px 10px 0px", borderBottom: "1px solid #e7e7e7", width: "100%" }}>
        <p style={{ color: "#00798c",width:"80%" }} className="ppp loading-text"></p>
      </div>

      {/* <ProductPrice data={data} />
      <Offers />
      <Features />
      <AboutProduct data={data} />
      <ProductDiscription data={data} /> */}
    </div>
  )
}

export default LoadingProductDetails