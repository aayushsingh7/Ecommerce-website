import React, { useContext } from 'react'
import { AiTwotoneHome, AiOutlineHome } from 'react-icons/ai'
import { BsCart, BsCartFill, BsHeart, BsHeartFill } from 'react-icons/bs'
import { IoPersonOutline, IoPerson } from 'react-icons/io5'
import { NavLink, useLocation } from 'react-router-dom'
import { AppContext } from '../context/Context'

const BottomNavbar = () => {
    const location = useLocation();
    const { cartData } = useContext(AppContext)


    return (
        <div className="BottomNavbar">

            <NavLink to={'/'} style={{ color: "black" }}>
                <div className="Option">
                    {location.pathname === "/" ? <AiTwotoneHome style={{ color: " #008ea4", fontSize: "26px" }} /> : <AiOutlineHome style={{ fontSize: "26px" }} />}
                </div>
            </NavLink>

            <NavLink to={'/wishlist'} style={{ color: "black" }}>
                <div className="Option">
                    {location.pathname === '/wishlist' ? <BsHeartFill style={{ color: " #008ea4", fontSize: "22px" }} /> : <BsHeart style={{ fontSize: "22px" }} />}
                </div>
            </NavLink>

            <NavLink to={'/cart'} style={{ color: "black" }}>
                <div className="Option" style={{ position: "relative" }}>
                    {cartData.length > 0 ? <p className='notification'>{cartData.length}</p> : null}
                    {location.pathname === '/cart' ? <BsCartFill style={{ color: " #008ea4", fontSize: "25px", position: "relative", top: "-1px" }} /> : <BsCart style={{ fontSize: "25px", position: "relative", top: "-1px" }} />}
                </div>
            </NavLink>


            <NavLink to={'/account'} style={{ color: "black" }}>
                <div className="Option">
                    {location.pathname === '/account' ? <IoPerson style={{ color: " #008ea4", fontSize: "24px" }} /> : <IoPersonOutline style={{ fontSize: "24px" }} />}
                </div>

            </NavLink>
        </div>
    )
}

export default BottomNavbar