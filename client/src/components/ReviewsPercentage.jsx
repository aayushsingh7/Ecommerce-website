import React, { useContext } from 'react';
import Ratings from './Ratings';
import { AiOutlinePlus } from 'react-icons/ai';
import { AppContext } from '../context/Context';
import { NavLink } from 'react-router-dom';

const ReviewsPercentage = ({ data }) => {
      const { setOpenReview , user } = useContext(AppContext);

        const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        data?.forEach(review => {
            ratingCount[review.stars]++;
        });

        const totalReviews = data.length;
        const fiveStarPercent = totalReviews > 0 ? (ratingCount[5] / totalReviews * 100).toFixed(0) : 0;
        const fourStarPercent = totalReviews > 0 ? (ratingCount[4] / totalReviews * 100).toFixed(0) : 0;
        const threeStarPercent = totalReviews > 0 ? (ratingCount[3] / totalReviews * 100).toFixed(0) : 0;
        const twoStarPercent = totalReviews > 0 ? (ratingCount[2] / totalReviews * 100).toFixed(0) : 0;
        const oneStarPercent = totalReviews > 0 ? (ratingCount[1] / totalReviews * 100).toFixed(0) : 0;

        return (
            <div className="ReviewsPercentage">
                <h2 style={{ marginBottom: "5px" }}>Customers Reviews</h2>
                <div className="result-reviews">
                    <Ratings data={data} />
                </div>

                <div className="review-percentage-calculate">
                    <div className="percentage-animation-yellow">
                        <p>5 star</p>
                        <div className="percentage-bar"><span style={{ width: `${fiveStarPercent}%` }}></span></div>
                        <p style={{width:"40px"}}>{`${fiveStarPercent <= 0 ? 0 : fiveStarPercent}%`}</p>
                    </div>

                    <div className="percentage-animation-yellow">
                        <p>4 star</p>
                        <div className="percentage-bar"><span style={{ width: `${fourStarPercent}%` }}></span></div>
                        <p style={{width:"40px"}}>{`${fourStarPercent <= 0 ? 0 : fourStarPercent}%`}</p>
                    </div>

                    <div className="percentage-animation-yellow">
                        <p>3 star</p>
                        <div className="percentage-bar"><span style={{ width: `${threeStarPercent}%` }}></span></div>
                        <p style={{width:"40px"}}>{`${threeStarPercent <= 0 ? 0 : threeStarPercent}%`}</p>
                    </div>

                    <div className="percentage-animation-yellow">
                        <p>2 star</p>
                        <div className="percentage-bar"><span style={{ width: `${twoStarPercent}%` }}></span></div>
                        <p style={{width:"40px"}}>{`${twoStarPercent <= 0 ? 0 : twoStarPercent}%`}</p>
                    </div>

                    <div className="percentage-animation-yellow">
                        <p>1 star</p>
                        <div className="percentage-bar"><span style={{ width: `${oneStarPercent}%` }}></span></div>
                        <p style={{width:"40px"}}>{`${oneStarPercent <= 0 ? 0 : oneStarPercent}%`}</p>
                    </div>
                </div>

                <div className="add-reviews-input">
                  {!user._id ? <NavLink to={'/login'} style={{textDecoration:"none",width:"100%"}}> <button type="text">Add a customer review</button></NavLink> :   <button type="text" onClick={() => setOpenReview(true)}>Add a customer review</button>}
                </div>
            </div>
        )
    }

    export default ReviewsPercentage