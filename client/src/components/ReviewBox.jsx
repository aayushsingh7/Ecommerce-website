import React, { useState } from 'react'
import Ratings from './Ratings'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const ReviewBox = ({ data, productId }) => {
  return (
    <div className="ReviewBox">
      <div className="user-info">
        <img src={data.user?.picture} alt="" />
        <p style={{ marginLeft: "10px" ,fontSize:"1.3rem"}}>{data.user?.name}</p>
      </div>
      <div className="heading">
        <div className="handle-star-animation" style={{ fontSize: "20px" }}>
          {data.stars >= 1 ? <AiFillStar /> : <AiOutlineStar />}
          {data.stars >= 2 ? <AiFillStar /> : <AiOutlineStar />}
          {data.stars >= 3 ? <AiFillStar /> : <AiOutlineStar />}
          {data.stars >= 4 ? <AiFillStar /> : <AiOutlineStar />}
          {data.stars >= 5 ? <AiFillStar /> : <AiOutlineStar />}
        </div>
        <p>{data.heading}</p>
      </div>
      {!data.img ? null : <img src={data.img} alt="" style={{ width: "100px", height: "100px", objectFit: "cover",
      margin:"10px 0px 10px 0px" }} />}
      <div className="review-discription">
        <pre>{data.body}</pre>
      </div>
     </div>
  )
}

export default ReviewBox