import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Ratings from './Ratings'
import QuantityUpdate from './QuantityUpdate'
import { AppContext } from '../context/Context'
import getExpectedDeliveryDate from '../utils/getExpectedDiliveryDate'

const ProductBox = ({ data }) => {
  const [quantity, setQuantity] = useState(data.quantity)
  const { cartData, notification, setCartData, setFevorates } = useContext(AppContext)
  let socket;


  const deleteCart = async (e) => {
    e.preventDefault()
    try {
      setCartData((prevCartData) => {
        return prevCartData.filter((cart) => cart._id !== data._id)
      })
      let apiData = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/remove-from-cart', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: data })
      })
      let response = await apiData.json()
      if (apiData.ok) {
        notification("Item removed from cart")
      }
    } catch (err) { notification("Something went wrong") }
  }

  const addToCart = async (e) => {
    e.preventDefault()
    try {
      setCartData([...cartData, data])
      let apiData = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/add-to-cart', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: data })
      })
      let response = await apiData.json()
      if (apiData.ok) {
        notification("Item added to cart")
      }
    } catch (err) { notification("Something went wrong") }
  }

  console.log(data)

  return (
    <NavLink to={`/product/${data._id}`} onClick={() => scrollTo(0, 0)} style={{ textDecoration: "none", color: "black", width: "100%" }}>
      <div className="Product--box">
        <div className="product-image">
          <img src={data.images[0]} alt="" />
        </div>

        <div className="product-information_ko">
          <p className="product_name wrap-add">{data.name}</p>
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px" }} >
            <Ratings data={data} productId={data._id} />
            {/* <p style={{ marginLeft: "5px", fontSize: "16px" }}>5</p>{" "} */}
            <span
              style={{ marginLeft: "7px", color: "#007981", fontSize: "14px" }}
            >
              ({data.reviews?.length})
            </span>
          </div>

          <div className="price-Container-pro">
            <div className="after-discount-price">
              <p style={{ position: "relative", top: "-8px" }}>₹</p>
              <p className='mrp'>{data.finalPrice.toLocaleString()}</p>
              {!location.pathname.startsWith('/wishlist') ? null : <p style={{ fontSize: "14px", position: "relative", top: "-4px" }}>00</p>}
            </div>

            {
              !location.pathname.startsWith('/wishlist') ? <div
                style={{
                  position: "relative",
                  bottom: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="real_mrp">
                  <p
                    style={{
                      marginLeft: "7px",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{data.originalPrice.toLocaleString()}
                  </p>
                </div>

                <div className="disocunt" style={{ marginLeft: "7px" }}>
                  <p>
                    ({data.discount}% off)
                  </p>
                </div>
              </div> : null
            }
          </div>

          {
            location.pathname.startsWith('/cart') ?
              <div className='quanity-counter-and-remove'>
                <QuantityUpdate product={data} quantity={quantity} setQuantity={setQuantity} />
                <button className='remove' onClick={deleteCart}>Delete</button>
              </div>
              :
              location.pathname.startsWith('/wishlist') ?
                <div className='flex-center' style={{ justifyContent: "flex-start" }}>
                  {
                    cartData.map((res) => res._id).includes(data._id) ?
                      <button className='remove' onClick={deleteCart} style={{ margin: "10px 0px 10px 0px", marginLeft: "0px" }}>Remove from cart</button> :
                      <button className='add-cart' onClick={addToCart} style={{ marginLeft: "0px", maxWidth: "400px", margin: "10px 0px 10px 0px" }}>Add to cart</button>
                  }
                </div>
                :
                <div className="dilivery-details" style={{ marginTop: "10px" }}>
                  <p style={{ marginBottom: "3px", fontWeight: "400", color: "#878787" }} className="j">Get it by
                    <span style={{ fontWeight: "600", color: "black" }} className="j"> {getExpectedDeliveryDate(data.expectedDeliveryDuration)}</span></p>
                  {
                    data.finalPrice > 500 ? <p style={{ fontWeight: "400", marginTop: "5px", color: "#878787" }} className="qw">FREE Delivery by Ecommerce</p> :
                      <p style={{ fontWeight: "100", marginTop: "5px", color: "#878787" }} className="qw">FREE Delivery over ₹499. Fulfilled by Ecommerce</p>
                  }
                </div>
          }
        </div>
      </div>
    </NavLink>
  )
}

export default ProductBox