import React, { useContext, useEffect } from 'react'
import SubtotalBox from '../components/SubtotalBox'
import ColumnBoxContainer from '../layouts/ColumnBoxContainer'
import { AppContext } from '../context/Context'
import EmptyPageTemplate from '../components/EmptyPageTemplate'


const Cart = () => {
  const { cartData } = useContext(AppContext)
  document.title = "Cart"
  let img = "https://static.vecteezy.com/system/resources/previews/005/073/073/original/no-item-in-the-shopping-cart-add-product-click-to-shop-now-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"

  return (
    <div className="Cart">
      {cartData.length <= 0 ?
       <EmptyPageTemplate txt={"Nothing in cart"} img={img}/>:
        <> <ColumnBoxContainer data={cartData} />
          <SubtotalBox />
          </>
      }
    </div>
  )
}

export default Cart