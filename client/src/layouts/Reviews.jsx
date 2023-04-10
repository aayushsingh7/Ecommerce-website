import React from 'react'
import ReviewBox from '../components/ReviewBox'
import ReviewsPercentage from '../components/ReviewsPercentage'

const Reviews = ({ data , reviews }) => {
  return (
   <div className="Reviews">
    <ReviewsPercentage data={reviews}/>
    <div className="Reviews-Container">
      {
        reviews?.map((res)=>{
          return   <ReviewBox data={res} productId={data?._id} key={data?._id}/>
        })
      }
    </div>
   </div>
  )
}

export default Reviews