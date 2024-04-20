import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Context'

const Logout = () => {
    const navigate = useNavigate()
    const { notification } = useContext(AppContext)
    document.title = "Logging out..."
    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        try {
            let lg = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/logout', { method: "GET", credentials: "include" })
            let response = await lg.json()
            if (lg.ok) {
                notification("Logout successfully")
                navigate('/login')
            } else {
                notification("Something went wrong")
                navigate('/account')
            }
        } catch (err) { }
    }

    return (
        <div className="Logout">
            <p>Logging out...</p>
        </div>
    )
}

export default Logout