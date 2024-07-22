import React from 'react'
import AboutProduct from './AboutProduct'
import Features from './Features'
import Offers from './Offers'
import ProductDiscription from './ProductDiscription'
import ProductHead from './ProductHead'
import ProductPrice from './ProductPrice'
import ProductPriceDetails from './ProductPriceDetails'
import Ratings from './Ratings'

const ProductDetails = ({ data,  reviews }) => {
  return (
    <div className="ProductDetails">
      <p className='product_name large'>{data.name}</p>

      <div className="ratings-component" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "10px 0px 10px 0px", borderBottom: "1px solid #e7e7e7", width: "100%" }}>
        <Ratings data={data} productId={data?._id} />
        <p style={{ color: "#00798c", marginLeft: "20px",fontSize:"1.2rem"}} className="ppp">{reviews?.length} ratings</p>
      </div>

      <ProductPrice data={data} />
      <Offers />
      <Features />
      <AboutProduct data={data} />
      <ProductDiscription data={data} />
    </div>
  )
}

export default ProductDetails