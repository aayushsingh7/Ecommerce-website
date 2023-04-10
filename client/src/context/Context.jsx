import React from 'react'
import { useState, useContext, createContext } from 'react'

export const AppContext = createContext()

const AppFunction = ({ children }) => {

  const [searchResults, setSearchResults] = useState([])
  const [cartData, setCartData] = useState([])
  const [fevorates, setFevorates] = useState([])
  const [user, setUser] = useState({})
  const [openReview , setOpenReview] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filterShow ,setFilterShow] = useState(false)
  const [alert, setAlert] = useState(true)
  const [reviews , setReviews] = useState([])
  const [showNotification , setShowNotification] = useState(false)
  const [notiMessage , setNotiMessage] = useState("")

  const notification = ( txt )=>  {
    setShowNotification(true)
    setNotiMessage(txt)
    setTimeout(()=> {
setShowNotification(false)
    },3000)
  }


  return (
    <AppContext.Provider 
    value={{
      searchResults, setSearchResults, cartData, setCartData, setUser, user, fevorates, setFevorates,openReview , setOpenReview,windowWidth,setWindowWidth,filterShow ,setFilterShow, alert,setAlert, reviews, setReviews,showNotification, setNotiMessage, notiMessage,  notification
    }}>
      {children}
    </AppContext.Provider>)
}

export default AppFunction