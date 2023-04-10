import React from 'react'
import { NavLink } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ProductImageSlider = ({ data, txt }) => {


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 11
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 650 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 3
    }
  };


  return (
    <div className="ProductImageSlider">
      <div className="f_df-df bbbb" style={{borderTop:"none"}}>
        <h2 className="res_we">{txt}</h2>
        <div className="related-products-here" style={{ marginTop: '10px' }}>
          {/* <div className="related-slider-box"> */}
          <Carousel responsive={responsive} className="related-slider-box slider">
            {
              data?.map((response) => {
                return (<NavLink to={`/product/${response._id}`} key={response._id}><img src={response?.images[0]} alt="" /></NavLink>)
              })
            }
          </Carousel>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default ProductImageSlider
  // <div className="ProductImageSlider">
  //   <p className='box-title'>{txt}</p>
  //   <div className="amazon-imagge-slider-container-scroller-btn">
  //       <Carousel responsive={responsive} className='slider related-slider-box'>
  //         {
  //           data?.map((response) => {
  //             return (<NavLink to={`/product/${response._id}`} key={response._id}><img src={response?.images[0]} alt="" /></NavLink>)
  //           })
  //         }
  //         </Carousel>
  //   </div>
  // </div>