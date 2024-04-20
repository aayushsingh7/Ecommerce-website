import React, { useContext } from 'react'
import { BsShieldLockFill } from 'react-icons/bs'
import { AppContext } from '../context/Context'
import getExpectedDeliveryDate from '../utils/getExpectedDiliveryDate'
import { NavLink } from 'react-router-dom'


const ProductPriceDetails = ({ data }) => {
  let socket;
  const { cartData, setCartData, fevorates, setFevorates, notification, user } = useContext(AppContext)

  const addToCart = async () => {
    setCartData([...cartData, data])
    try {
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

  const removeFromCart = async () => {
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

  const addToFevorates = async () => {
    try {
      setFevorates([...fevorates, data])
      let apiData = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/add-to-fevorates', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: data })
      })
      let response = await apiData.json()
      if (apiData.ok) {
        notification("Item added to wishlist")
      }
    } catch (err) { notification("Something went wrong") }
  }

  const removeFromFevorates = async () => {
    try {
      setFevorates((prevFevData) => {
        return prevFevData.filter((item) => item._id !== data._id)
      })
      let apiData = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/remove-from-fevorates', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: data })
      })
      let response = await apiData.json()
      if (apiData.ok) {
        notification("Item removed from wishlist")
      }
    } catch (err) {
      notification("Something went wrong")
    }
  }


  return (
    <div className={`product-price-and-discount`}>
      <>
        <div className="price-box-container">

          <div style={{ display: "flex", fontSize: "30px", alignItems: "center", marginBottom: "10px", marginTop: "10px", justifyContent: "center" }}>
            <div className="price-1" style={{ marginLeft: "0px" }}>
              <p style={{ fontSize: "14px", position: "relative", top: "4px" }}>₹</p>
              <p>{data.finalPrice?.toLocaleString()}</p>
              <p style={{ fontSize: "14px", position: "relative", top: "4px" }}>00</p>
            </div>
          </div>

          <div className="dilivery-info">
            <p><span className='e'>Free delivery</span> <span className='w'>{getExpectedDeliveryDate(data.expectedDeliveryDuration)} </span></p>
          </div>

          <div>
            <p className='stock-status' style={data.inStockQuantity >= 10 ? { color: "green" } : { color: "red" }}>
              {data.inStockQuantity >= 10 ? "In Stock" : data.inStockQuantity <= 9 ? "Hurry! only few left" : "Sold out"}</p>

            <p className='in'>Sold by <span className='e'>{data.seller}</span> and Delivered by Ecommerce.</p>
          </div>

          <div className="btn-options">
            {
              !user._id ? <NavLink to={'/login'} style={{ width: "100%" }}><button className="add-cart">Add to Cart</button></NavLink> :
                cartData.map((res) => res._id).includes(data._id) ?
                  <button className="add-cart" onClick={removeFromCart}>Remove from cart</button> :
                  <button className="add-cart" onClick={addToCart}>Add to Cart</button>
            }
            {
              !user._id ? <NavLink to={'/login'} style={{ width: "100%" }}><button className='buy-now'>Buy Now</button></NavLink> : <NavLink to={'/order'} style={{ textDecoration: "none", width: "100%" }}> <button className='buy-now'>Buy Now</button></NavLink>
            }
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: "15px", marginTop: "10px" }}>
            <BsShieldLockFill style={{ fontSize: "18px", marginRight: "10px", color: "#808080" }} />
            <p className='e '> Secure transaction</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: "15px", marginTop: "10px", padding: "5px 6px 10px 6px", borderBottom: "1px solid #e4e4e4", width: "100%" }}>
            <input type="checkbox" color='blue' style={{ marginRight: "8px", color: "blue" }} id="gift" />
            <label htmlFor="gift">
              <p style={{ cursor: "pointer" }}>Add gift options</p>
            </label>
          </div>

          {
            !user._id ? <NavLink to={'/login'} style={{ width: "100%" }}> <button className='wish-list'>Add to Wish List</button></NavLink> :
              fevorates.map((res) => res._id).includes(data._id) ?
                <button className='wish-list' onClick={removeFromFevorates}>Remove from Wish List</button> :
                <button className='wish-list' onClick={addToFevorates}>Add to Wish List</button>
          }
        </div>
      </>
    </div>
  )
}

export default ProductPriceDetails