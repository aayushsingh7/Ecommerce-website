import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import MobileCategorySlider from '../components/MobileCategorySlider'
import CategoryBoxContainerLoading from '../layouts/CategoryBoxContainerLoading'
import CategoryBoxesContainer from '../layouts/CategoryBoxesContainer'
import ProductImageSlider from '../layouts/ProductImageSlider'
import ProductImageSliderLoading from '../layouts/ProductImageSliderLoading'
import Footer from '../layouts/Footer'


const Home = () => {
  const [data, setData] = useState([])
  const [sliderData, setSliderData] = useState([])
  const [loadingBox, setLoadingBox] = useState(true)
  const [loadingSlider, setLoadingSlider] = useState(true)

  useEffect(() => {
    getBoxData()
    getSliderData()
  }, [])

  const getBoxData = async () => {
    try {
      setLoadingBox(true)
      let apiData = await fetch('https://ecommerce-website-ocdk.onrender.com/api/v1/getData', { method: "GET", credentials: "include" })
      let response = await apiData.json()
      if (apiData.ok) {
        setData(response)
        setLoadingBox(false)
      } else {
        setData([])
        setLoadingBox(false)
      }
    } catch (err) {}
  }

  const getSliderData = async () => {
    setLoadingSlider(true)
    try {
      let data = await fetch('https://ecommerce-website-ocdk.onrender.com/api/v1/all-product', { method: "GET", credentials: "include" })
      let response = await data.json()
      if (data.ok) {
        setLoadingSlider(false)
        setSliderData(response)
      } else {
        setLoadingSlider(false)
      }
    } catch (err) {}
  }
  document.title  = "Ecommerce"

  return (
    <div className="Home">
      <Hero />
      <div className="display-items">
      
        <MobileCategorySlider />
        {loadingBox ?  <CategoryBoxContainerLoading />: <CategoryBoxesContainer data={data.slice(0, 1)} />}
        {loadingSlider ? <ProductImageSliderLoading /> : <ProductImageSlider data={sliderData.slice(0, 10)} txt={"Find Your Favorites"}/> }
        {loadingBox ?   <CategoryBoxContainerLoading /> : <CategoryBoxesContainer data={data.slice(1, 2)} />}
        {loadingSlider ?  <ProductImageSliderLoading /> : <ProductImageSlider data={sliderData.slice(11, 20)} txt={"Check Out More Products"}/> }
      </div>
      <Footer/>
    </div>
  )
}

export default Home