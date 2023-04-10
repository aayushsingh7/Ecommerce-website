import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductInformation from '../layouts/ProductInformation'
import RelatedProductResults from '../layouts/RelatedProductResults'
import Reviews from '../layouts/Reviews'
import AddReview from '../components/AddReview'
import { AppContext } from '../context/Context'

const Product = () => {
  const params = useParams()
  const { reviews, setReviews } = useContext(AppContext)
  const [productData, setProductData] = useState({})
  const [loading, setLoading] = useState(true)
  document.title = `${loading ? "Loading..." : productData.name}`


  useEffect(() => {
    getSingleProduct()
  }, [params.id])

  const getSingleProduct = async () => {
    try {
      setLoading(true)
      let getData = await fetch(`https://ecommerce-website-9k8k.onrender.com/api/v1/single-product/${params.id}`, { method: "GET", credentials: "include" })
      let response = await getData.json()
      if (getData.ok) {
        setLoading(false)
        setProductData(response)
        document.title = response.name
        setReviews(response.reviews)
      } else {
        setLoading(false)
      }
    } catch (err) { }
  }


  return (
    <div className="Product">
      <ProductInformation data={productData} loading={loading} reviews={reviews} />
      {loading ? null : <RelatedProductResults data={productData} />}
      {loading ? null : <Reviews data={productData} reviews={reviews} />}
      <AddReview setReviews={setReviews} productId={productData._id} />
    </div>
  )
}

export default Product