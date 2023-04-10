import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsCart,BsPersonFill} from "react-icons/bs";
import {AiOutlineMenu, AiOutlineSearch} from "react-icons/ai";
import { AppContext } from "../context/Context";
import OptionsNav from "./OptionsNav";


const Navbar = () => {
  const navigate = useNavigate()
  const [search , setSearch ] = useState("")
  const {cartData,user} = useContext(AppContext)
  const [show , setShow] = useState(false)
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const query = q.get('query')

  useEffect(()=> {
    setSearch(query)
  },[location.search])

  const doSearch = (e)=> {
    if(e.key === "Enter"){
        if(search){
      navigate(`/search?query=${search}`)
    }else{
      navigate('/')
     }
     }
  }

  const clickToSearch = ()=> {
   if(!search){
    navigate("/")
   }else{
    navigate(`/search?query=${search}`)
   }
  }
  

  return (
    <>
      <div className="mainHeader">
    <NavLink to={'/'} style={{textDecoration:"none"}}><h2 className="main-heading-navbar">Ecommerce</h2></NavLink>
     <div className="search-component">
      <input type="text" placeholder="Search Ecommerce.com" onKeyDown={doSearch} value={search}  onChange={(e)=> setSearch(e.target.value)}/>
      <button onClick={clickToSearch}><AiOutlineSearch style={{fontSize:"26px",color:"white"}}/></button>
     </div>
    <div style={{position:"relative"}}>
      {
        !user._id ? <NavLink to={'/login'} style={{textDecoration:"none"}}><button className="sign-in-btn">Login</button></NavLink> : 
        <img className="mob-hide-img"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGMRC_3Lw0W1Nyws36Hy_oeoeCdzGTIjXXQ&usqp=CAU" style={{height:"42px",width:"42px",borderRadius:"50%",cursor:"pointer"}} onMouseEnter={()=> setShow(true)}  onClick={()=> setShow(!show)} />
      }
   
    {
      show ?   <div className="account-option" onMouseLeave={()=> setShow(false)} >
      <OptionsNav setShow={setShow}/>
     </div> : null
    }
      </div>
    </div>
    </>
  );
};

export default Navbar;
