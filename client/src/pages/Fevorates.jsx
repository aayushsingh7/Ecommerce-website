import React, { useContext } from 'react'
import ProductPriceDetails from '../components/ProductPriceDetails'
import SubtotalBox from '../components/SubtotalBox'
import ColumnBoxContainer from '../layouts/ColumnBoxContainer'
import { AppContext } from '../context/Context'
import EmptyPageTemplate from '../components/EmptyPageTemplate'

const Fevorates = () => {
  const {fevorates} = useContext(AppContext)
  document.title = "Wishlist"
  return (
    <div className="Fevorates">
     {
      fevorates.length <= 0 ? <EmptyPageTemplate txt={"Nothing in wishlist"} img={"https://www.saugatonline.com/images/emptywishlist.jpg"}/> :  <ColumnBoxContainer data={fevorates}/>
     }
    </div>
  )
}

export default Fevorates