import React, { lazy } from 'react'
import ProductDetails from '../components/ProductDetails'
import ProductImages from '../components/ProductImages'
import ProductPriceDetails from '../components/ProductPriceDetails'
import LoadingProductImages from '../components/LoadingProductImages'
import LoadingProductDetails from '../components/LoadingProductDetails'

const ProductInformation = ({ data, loading, reviews}) => {
  return (
    <div className="ProductInformation">
       {loading ? <LoadingProductImages/> :  <ProductImages data={data}/>}
      { loading ? <LoadingProductDetails/> :  <ProductDetails data={data}  reviews={reviews}/>}
      <div className="manage-display">
    {loading ?<div className={`product-price-and-discount`}>
           <div className="price-box-container"></div></div> :  
            <ProductPriceDetails  data={data}/>}
      </div>
    </div>
  )
}

export default ProductInformation;