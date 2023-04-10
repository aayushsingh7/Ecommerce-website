import React, { useContext, useState } from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/Context';



const ProductFilter = ({ setLoading, loading }) => {
  const params = useParams()
  const navigate = useNavigate()
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const { searchResults, setSearchResults, setSearching, filterShow, setFilterShow } = useContext(AppContext)
  const query = q.get('query')
  const category = q.get('category')
  const seller = q.get('seller')


  const searchByPrice = async (min, max) => {
    navigate(`/search?query=${query}&minPrice=${min}&maxPrice=${max}`)
  }


  return (
    <div className={filterShow ? "filter-products-options show-mob" : "filter-products-options hide-mob"}>
      <div className="review-filter">
        <h4 style={{ marginBottom: "5px", fontSize: "17px" }}>Customer Review</h4>

        <NavLink to={`/search?query=${query ? query : category ? category : seller}&minRatings=${5}&maxRatings=${5}`} style={{ textDecoration: "none", color: "black" }}>
          <div className="f_x_1" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
          </div>
        </NavLink>


        <NavLink to={`/search?query=${query ? query : category ? category : seller}&minRatings=${4}&maxRatings=${4}`} style={{ textDecoration: "none", color: "black" }}>
          <div className="f_x_1" style={{ display: "flex", alignItems: "flex-start" }}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            {/* <p>& up</p> */}
          </div>
        </NavLink>

        <NavLink to={`/search?query=${query ? query : category ? category : seller}&minRatings=${3}&maxRatings=${3}`} style={{ textDecoration: "none", color: "black" }}>
          <div className="f_x_1">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
            {/* <p>& up</p> */}
          </div>
        </NavLink>


        <NavLink to={`/search?query=${query ? query : category ? category : seller}&minRatings=${2}&maxRatings=${2}`} style={{ textDecoration: "none", color: "black" }}>
          <div className="f_x_1">
            <div>
              {" "}
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
            {/* <p>& up</p> */}
          </div>
        </NavLink>

        <NavLink to={`/search?query=${query ? query : category ? category : seller}&minRatings=${1}&maxRatings=${1}`} style={{ textDecoration: "none", color: "black" }}>
          <div className="f_x_1">
            <div>
              {" "}
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
            {/* <p>& up</p> */}
          </div>
        </NavLink>
      </div>

      <div className="brands-filter">
        <h4 style={{ marginBottom: "5px", fontSize: "17px" }}>Price</h4>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?query=${query ? query : category ? category : seller}&minPrice=${0}&maxPrice=${200}`}><p>Under ₹200</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?query=${query ? query : category ? category : seller}&minPrice=${200}&maxPrice=${400}`}> <p>₹200 - ₹400</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?query=${query ? query : category ? category : seller}&minPrice=${400}&maxPrice=${800}`}><p>₹400 - ₹800</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?query=${query ? query : category ? category : seller}&minPrice=${800}&maxPrice=${1600}`}><p >₹800 - ₹1600</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?query=${query ? query : category ? category : seller}&minPrice=${1600}&maxPrice=${1000000}`}> <p>₹1600 & above </p></NavLink>
      </div>
      <div className="in-max">
        <div className="nk">
          <p style={{ fontSize: "18px" }}>₹</p>
          <input type="number" placeholder="Min" onChange={(e) => setMinPrice(e.target.value)} min={1} max={10000000} />
        </div>
        <div className="nk">
          <p style={{ fontSize: "18px" }}>₹</p>
          <input type="number" placeholder="Max" onChange={(e) => setMaxPrice(e.target.value)} max={1000000} min={1} />
        </div>
        <button onClick={() => searchByPrice(minPrice, maxPrice)}>Search</button>
      </div>


      <div className="brands-filter">
        <h4 style={{ marginBottom: "5px", fontSize: "17px" }}>Brands</h4>
        {!loading && searchResults.length > 0 ?
          searchResults
            .filter((res, index, self) => self.findIndex((r) => r.item ? r.item.seller === res.item.seller : r.seller === res.seller) === index)
            .map((res) => <NavLink key={res.item ? res.item._id : res._id} style={{ textDecoration: "none", color: "black" }} to={`/search?seller=${res.item ? res.item.seller : res.seller}`}><p>{res.item ? res.item.seller : res.seller}</p></NavLink>
            )
          : loading ? <p>Loading results...</p> : <p>No results found</p>}
      </div>

      <div className="brands-filter">
        <h4 style={{ marginBottom: "8px", fontSize: "17px" }}>Search by category</h4>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=headphones`}><p>Headphones</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=Beauty`}><p>Beauty</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=toy`}><p>Toys</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=shirts`}><p>Men's shirts</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=cups`}><p>Cups</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=keyboard`}><p>Keyboards</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=action figures`}><p>Action figures</p></NavLink>
        <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?category=mobiles`}><p>Mobiles</p></NavLink>


      </div>
    </div>
  )
}

export default ProductFilter