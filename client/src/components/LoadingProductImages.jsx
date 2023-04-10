import React from 'react'

const LoadingProductImages = () => {
  return (
    <div className="images-Container-and-view-more">
    <div className="more-images">
   <div className='loading-box' style={{marginRight:"5px",marginBottom:"0px"}}></div>
   <div className='loading-box' style={{marginRight:"5px",marginBottom:"0px"}}></div>
   <div className='loading-box' style={{marginRight:"5px",marginBottom:"0px"}}></div>
   <div className='loading-box' style={{marginRight:"5px",marginBottom:"0px"}}></div>
    </div>

    <div className="selected-img">
    <div className='loading-box'></div>
    </div>
  </div>
  )
}

export default LoadingProductImages