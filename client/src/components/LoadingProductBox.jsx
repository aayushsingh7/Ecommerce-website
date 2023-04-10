import React from 'react'

const LoadingProductBox = () => {
  return (
    <div className="Product--box">
      <div className="loading-box product-image">

      </div>

      <div className="product-information_ko">
        <p className="product_name wrap-add loading-text"></p>
        <p className="product_name wrap-add loading-text" style={{ width: "60%" }}></p>
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8px" }} >
          <span
            style={{ marginLeft: "7px", color: "#007981", fontSize: "14px" }}
          >
            {/* ({ratings.length}) */}
          </span>
        </div>

        <div className="price-Container-pro">
          <div className="after-discount-price" style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <p className='loading-text' style={{ width: "200px" }}></p>
            <p className='loading-text' style={{ width: "100px" }}></p>

          </div>

          <div
            style={{
              position: "relative",
              bottom: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="real_mrp">
            </div>

            <div className="disocunt" style={{ marginLeft: "7px" }}>
              <p>

              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default LoadingProductBox