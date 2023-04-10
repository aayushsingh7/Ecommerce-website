import React from 'react'

const AboutProduct = ({ data }) => {  

    return (
      <div className="about-product">
      {data.details?.map((res, index) => {
        const keys = Object.keys(res)[0];
        const value = Object.values(res)[0];

        return (
          <div key={index} className="blocks">
            <div className='question'>{keys}</div>
            <div className='answer'>{value}</div>
          </div>
        );
      })}
     {/* {data.details?.map((res, index) => (
        <div key={index}>
          {Object.keys(res).map((key) => (
            <div key={key}>
              {key}: {Object.values(res)[0]}
            </div>
          ))}
        </div>
      ))} */}
      </div>
    )
}

export default AboutProduct