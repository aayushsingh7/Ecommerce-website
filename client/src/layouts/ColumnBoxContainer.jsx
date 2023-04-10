import React, { useContext, useEffect } from 'react'
import LoadingProductBox from '../components/LoadingProductBox'
import ProductBox from '../components/ProductBox'
import { AppContext } from '../context/Context'
// import io from 'socket.io-client'
import Alert from '../components/Alert'
import { useLocation } from 'react-router-dom'

const ColumnBoxContainer = ({ loading, data }) => {
  const { setCartData, setFevorates, alert } = useContext(AppContext)
  const location = useLocation();
  const q = new URLSearchParams(location.search);

  const query = q.get('query')
  let socket;

  // useEffect(() => {
  //   socket = io('https://ecommerce-website-ocdk.onrender.com')

  //   socket.on('newData', (response) => {
  //     setCartData(prevCartData => {
  //       const existingItem = prevCartData.find(item => item._id === response._id);
  //       return existingItem ? prevCartData : [...prevCartData, response];
  //     });
  //   });

  //   socket.on('remove-item', (response) => {
  //     setCartData((prevCartData) => prevCartData.filter((d) => d._id !== response._id))
  //   })

  //   socket.on('add-item-fevorates', (response) => {
  //     setFevorates((prevFevData) => {
  //       const existingItem = prevFevData.find((item) => item._id === response._id)
  //       return existingItem ? prevFevData : [...prevFevData, response]
  //     })
  //   })

  //   socket.on('remove-item-fevorates', (response) => {
  //     setFevorates((prevFevData) => prevFevData.filter((r) => r._id !== response._id))
  //   })

  // }, [])


  return (
    <div className="Product---Here ">
      {location.pathname.startsWith('/search') && alert && query !== "all" ? <Alert /> : null}

      {
        loading ?
          <>
            <LoadingProductBox />
            <LoadingProductBox />
            <LoadingProductBox />
            <LoadingProductBox />
            <LoadingProductBox />
          </> :
          data.length > 0 ? data.map((res) => {
            return <ProductBox data={res.item ? res.item : res} key={res.item ? res.item._id : res._id} />
          }) : <p>NO results found</p>
      }
    </div>
  )
}

export default ColumnBoxContainer