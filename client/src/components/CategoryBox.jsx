import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryBox = ({ cl, title, img }) => {

  let text = title;
  let words = text?.toLowerCase().split(" ");

  for (let i = 0; i < words?.length; i++) {
    words[i] = words[i]?.charAt(0)?.toUpperCase() + words[i]?.slice(1);
  }

  let capitalizedText = words.join(" ");


  return (
    <div className={`CategoryBox ${cl}`}>
      <p className='box-title'>{capitalizedText}</p>
      <div className="category-image-grid-type">
        {img.map((data) => {
          return (
            <NavLink style={{ textDecoration: "none", color: "black" }} to={`/search?query=${data.searchBy}`} onClick={()=> scrollTo(0,0)}>
              <div className="image-and-title">
                <img src={data.img} alt="" />
                <p>{data.title}</p>
              </div>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryBox