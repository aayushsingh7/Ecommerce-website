import React from 'react'
import generateRandomKey from '../utils/generateRandomKey'

const CategoryBoxContainerLoading = () => {
    const loadingBox = ["loading","loading","loading","loading"]
    return (
        <div className="CategoryBoxesContainer">
            {
            loadingBox.map((load)=> {
                return (
                    <div className={`CategoryBox`} key={generateRandomKey(20)}>
                <p className='box-title'></p>
                <div className="category-image-grid-type" key={generateRandomKey(20)}>
                    <div className="image-and-title">
                        <img src="" alt="" style={{position:"relative",zIndex:"-100"}}/>
                        <p></p>
                    </div>
                    <div className="image-and-title" key={generateRandomKey(20)}>
                        <img src="" alt=""style={{position:"relative",zIndex:"-100"}} />
                        <p></p>
                    </div>
                    <div className="image-and-title" key={generateRandomKey(20)}>
                        <img src="" alt=""style={{position:"relative",zIndex:"-100"}} />
                        <p></p>
                    </div>
                    <div className="image-and-title" key={generateRandomKey(20)}>
                        <img src="" alt="" style={{position:"relative",zIndex:"-100"}} />
                        <p></p>
                    </div>
                </div>
            </div>
                )
            })
            }
        </div>
    )
}

export default CategoryBoxContainerLoading