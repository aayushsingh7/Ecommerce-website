import React from 'react'
import CategoryBox from '../components/CategoryBox'
import SingleImageBox from '../components/SingleImageBox'
import generateRandomKey from '../utils/generateRandomKey'

const CategoryBoxesContainer = ({ data }) => {

  return (
   <div className="CategoryBoxesContainer">
   {
    data.map((d)=> {
      return (
        d.boxData?.map((r)=> {
          return (
            r.type === "grid" ? 
            <CategoryBox title={r.title} img={r.images} key={generateRandomKey(20)}/> : 
            <SingleImageBox txt={r.searchBy} img={r.img} key={generateRandomKey(20)}/>
          )
        })
      )
    })
   }
   </div>
  )
}

export default CategoryBoxesContainer 