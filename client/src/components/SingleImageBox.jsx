import React from 'react'
import { NavLink } from 'react-router-dom'

const SingleImageBox = ({ cl, txt, img }) => {

    let text = txt;
    let words = text?.toLowerCase().split(" ");

    for (let i = 0; i < words?.length; i++) {
        words[i] = words[i]?.charAt(0)?.toUpperCase() + words[i]?.slice(1);
    }

    let capitalizedText = words.join(" ");

    return (
        <NavLink to={`/search?query=${txt}`} onClick={()=> scrollTo(0,0)}  className={'CategoryBox'} style={{ textDecoration: "none", color: "black" }}>
            <p className='box-title'>{capitalizedText}</p>
            <div className="singleImage">
                <img src={img} alt="" />
            </div>
            <p className='seemore'>see more</p>
        </NavLink>
    )
}

export default SingleImageBox