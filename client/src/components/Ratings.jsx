import React, { useContext, useEffect } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { AppContext } from '../context/Context';

const Ratings = ({ data, productId }) => {
  const { reviews } = useContext(AppContext)
  const totalStars = data?.reduce((acc, { stars }) => acc + stars, 0);
  const avgRating = totalStars / (data?.length || 1);

  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  location.pathname.startsWith('/product') && productId ?
    useEffect(() => {
      updateAvgRev()
    }, [reviews]) : null


  const updateAvgRev = async () => {
    try {
      let update = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/update-review', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productId, stars: avgRating })
      })
      let response = await update.json()
    } catch (err) {}
  }

  return (
    <div className="handle-star-animation">
      {!isNaN(fullStars) && fullStars >= 0 && [...Array(fullStars)].map((_, i) => (
        <BsStarFill key={i} />
      ))}
      {hasHalfStar && <BsStarHalf />}
      {!isNaN(emptyStars) && emptyStars >= 0 && [...Array(emptyStars)].map((_, i) => (
        <BsStar key={i} />
      ))}
    </div>
  )
}

export default Ratings;
