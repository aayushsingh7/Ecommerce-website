import React, { useContext } from 'react'
import { AppContext } from '../context/Context'

const Notification = () => {
    const {showNotification ,notiMessage} = useContext(AppContext)
  return (
    <div className={showNotification ? "Notification pop-show" : "Notification pop-hide"}>
        {notiMessage}
    </div>
  )
}

export default Notification