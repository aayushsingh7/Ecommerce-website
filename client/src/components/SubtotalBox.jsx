import React, { useContext, useEffect } from 'react'
import { MdVerified } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import { AppContext } from '../context/Context'

const SubtotalBox = () => {
    const location = useLocation()
    const { cartData, fevorates, notification } = useContext(AppContext)

    const buyNow = async () => {
        // Not available
    }

    const addToCart = async () => {
        try {
            let data = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/add-to-cart', {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data })
            })
            let response = await data.json()
            if (data.ok) {
                notification("Item added to wishlist")
            }
        } catch (err) { }
    }


    return (
        <div className="product-price-and-discoun increase-width-height">
            <div className="price-box-container">

                <div style={{ display: "flex", fontSize: "30px", alignItems: "center", marginBottom: "10px", marginTop: "10px", justifyContent: "flex-end" }}>
                    <p style={{ marginRight: "5px", fontSize: "1.4rem" }}>Subtotal:</p>
                    <div className="price-1" style={{ marginLeft: "0px" }}>
                        <p style={{ fontSize: "14px", position: "relative", top: "4px" }}>₹</p>
                        <p>{(location.pathname.startsWith('/cart') ?
                            cartData : fevorates).reduce((total, res) => total + res.finalPrice * res.quantity, 0).toLocaleString("en-IN")}</p>
                        <p style={{ fontSize: "14px", position: "relative", top: "4px" }}>00</p>

                    </div>
                </div>

                <div className="product-eligible">
                    <MdVerified style={{ color: " #00798c", fontSize: "20px", marginRight: "5px" }} />
                    <p><span>Your order is eligible for Free Delivery</span> select this option at checkout</p>
                </div>

                <NavLink to={'/order'} style={{ textDecoration: "none", width: "100%" }}>
                    <div className="btn-options">
                        <button className="buy-now" style={{ background: "#ffd000ee" }}
                            onClick={location.pathname.startsWith('/cart') ? buyNow : addToCart}>{location.pathname.startsWith('/cart') ?
                                `Proceed to buy (${cartData.length})` : "Add to cart"}</button>
                    </div>
                </NavLink>


            </div>
        </div>
    )
}

export default SubtotalBox