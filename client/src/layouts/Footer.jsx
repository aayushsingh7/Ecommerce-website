import React from 'react'
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiOutlineTwitter } from 'react-icons/ai'
import {RiInstagramFill} from  'react-icons/ri'
import {GrFacebookOption} from 'react-icons/gr'
import {FaSnapchatGhost} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="Footer">
        <h2>Ecommerce.com</h2>
        <p>At Ecommerce.com , we are committed to providing an exceptional shopping experience to our customers. Our eCommerce platform offers a wide range of high-quality products at competitive prices. With secure checkout and fast delivery, you can shop with confidence knowing that your purchases are safe and reliable. Our customer service team is always available to assist you with any questions or concerns you may have. Thank you for choosing Ecommerce.com for all your shopping needs.</p>

       <div className="follow-us-div">
        <p>Follow us :-</p>
       <div className='platform-icons'>
        <AiOutlineTwitter className='icons-two-navigate' style={{marginRight:"15px"}}/>
        <GrFacebookOption className='icons-two-navigate' style={{marginRight:"15px"}}/>
        <RiInstagramFill className='icons-two-navigate' style={{marginRight:"15px"}}/>
        <FaSnapchatGhost className='icons-two-navigate' />
        </div>
       </div>
    </div>
  )
}

export default Footer