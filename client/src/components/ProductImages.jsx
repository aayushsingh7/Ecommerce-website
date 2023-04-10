import React, { useEffect, useState } from 'react'
import generateRandomKey from '../utils/generateRandomKey'

const ProductImages = ({ data }) => {
  const [selectedImg, setSelectedImg] = useState()
  const [imageHeight , setImageHeight] = useState(0)

  const handleHeight = (event)=> {
    const img = event.target;
    setImageHeight(img.height);
  }

  return (
    <div className="images-Container-and-view-more">
      <div className="more-images">
        {
          data.images?.map((img) => {
            return (
              <img key={generateRandomKey(20)}  src={img} alt="" onMouseEnter={() => setSelectedImg(img)}
                onClick={() => setSelectedImg(img)} onLoad={handleHeight} />
            )
          })
        }
      </div>

      <div className="selected-img">
        {
          data.images?.length > 0 ?
            <img src={!selectedImg ? data?.images[0] : selectedImg} alt="" onLoad={handleHeight}/> : <p>loading</p>
        }
      </div>
    </div>
  )
}

export default ProductImages