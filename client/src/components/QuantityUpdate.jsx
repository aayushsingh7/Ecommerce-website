import React, { useContext } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { AppContext } from '../context/Context'

const QuantityUpdate = ({ product, quantity, setQuantity }) => {
    const { cartData, setCartData, notification } = useContext(AppContext)
    const addQuantity = async (e) => {
        e.preventDefault()
        try {
            setQuantity(quantity + 1)
            const updateData = cartData.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
            setCartData(updateData);

            let data = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/increase-qty', {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id })
            })
            let response = await data.json()
        } catch (err) { notification("Something went wrong") }
    }

    const decreaseQuantity = async (e) => {
        e.preventDefault()
        try {
            setQuantity(quantity - 1)
            const updateData = cartData.map(item => item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item);
            setCartData(updateData);


            let data = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/decrease-qty', {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id })
            })
            let response = await data.json()
        } catch (err) { notification("Something went wrong") }
    }


    return (
        <div className="QuantityUpdate">
            <button onClick={addQuantity}><AiOutlinePlus /></button>
            <p>{quantity}</p>
            <button onClick={decreaseQuantity}><AiOutlineMinus /></button>
        </div>
    )
}

export default QuantityUpdate