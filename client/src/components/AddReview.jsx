import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/Context'
import { AiFillStar, AiOutlineClose, AiOutlineCloudUpload, AiOutlineStar, AiOutlineUpload } from 'react-icons/ai'

const AddReview = ({ setReviews, productId }) => {
  const { openReview, setOpenReview } = useContext(AppContext)
  const { notification } = useContext(AppContext)
  const [previewUrl, setPreviewUrl] = useState(null);
  const [star, setStar] = useState(1)
  const [heading, setHeading] = useState("")
  const [loading, setLoading] = useState(false)
  const formRef = useRef()


  function handleTextareaHeight(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  useEffect(() => {
    if (openReview) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "none"
    }
  }, [openReview])


  function handleFileInput(event) {
    const { files } = event.target;

    // Check if a file was selected
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };

      reader.readAsDataURL(files[0]);
    }
  }


  const AddReview = async (e) => {
    e.preventDefault()
    if (heading) {
      try {
        setLoading(true)
        let formData = new FormData(formRef.current)

        formData.append('stars', star)
        formData.append('productId', productId)
        let data = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/add-review', {
          method: "PUT",
          credentials: "include",
          body: formData,
        })
        let response = await data.json()
        if (data.ok) {
          notification("Thanks for your feedback")
          setLoading(false)
          setReviews((old) => {
            return [...old, response.review]
          })
        } else {
          setLoading(false)
        }
      } catch (err) {
        notification("Something went wrong")
        setLoading(false)
      }
    } else {
      notification("Please enter the given information")
    }
  }

  return (
    <form ref={formRef} className="AddReview" style={openReview ? { display: "flex" } : { display: "none" }} enctype="multipart/form-data" onSubmit={AddReview} >
      <div className="add-review-box">
        <AiOutlineClose className='close' onClick={() => setOpenReview(false)} />
        <div style={{ width: "100%" }}>
          <h3>Add a Review</h3>
          <div className="review-options-input">
            <div className='flex-center cc'>

              <div className="handle-star-animation" style={{ fontSize: "29px" }}>
                {star >= 1 ? <AiFillStar onClick={() => setStar(1)} /> : <AiOutlineStar onClick={() => setStar(1)} />}
                {star >= 2 ? <AiFillStar onClick={() => setStar(2)} /> : <AiOutlineStar onClick={() => setStar(2)} />}
                {star >= 3 ? <AiFillStar onClick={() => setStar(3)} /> : <AiOutlineStar onClick={() => setStar(3)} />}
                {star >= 4 ? <AiFillStar onClick={() => setStar(4)} /> : <AiOutlineStar onClick={() => setStar(4)} />}
                {star >= 5 ? <AiFillStar onClick={() => setStar(5)} /> : <AiOutlineStar onClick={() => setStar(5)} />}
              </div>
            </div>
            <input type="text" placeholder='Add Review Title' name='heading' onChange={(e) => setHeading(e.target.value)} />
            <div className='upload-img-review'>
              <input type="file" onChange={handleFileInput} style={{ display: "none" }} id='image' name='img' />
              {previewUrl ? null : <AiOutlineCloudUpload style={{ fontSize: "80px" }} />}
              {previewUrl !== null ? <img src={previewUrl} style={{ width: "100%", height: "150px", objectFit: "contain", background: "#444", borderRadius: "10px" }} /> : null}
              {previewUrl ?
                <label htmlFor="image"><p className='selectOther'>Choose another image</p></label> :
                <label htmlFor="image"><p>Upload Image</p></label>}
            </div>
            <textarea onChange={handleTextareaHeight} type="text" placeholder="Add Review" name="body"></textarea>
          </div>
        </div>
        <button onClick={AddReview} className={loading ? 'add-review loading' : 'add-review'}>
          {loading ? "Uploading review..." : "Add Review"}</button>
      </div>
    </form>
  )
}

export default AddReview