import React, { useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { AppContext } from '../context/Context'

const Alert = () => {
    const {setAlert} = useContext(AppContext)
  return (
    <div className="Alert">
 <p style={{width:"90%"}}>To test the filter, u can type (all) on search, then apply the filter as you will have more products to filter</p>
    <AiOutlineClose style={{fontSize:"25px",color:"white",cursor:"pointer"}} onClick={()=> setAlert(false)}/>
    </div>
  )
}

export default Alert