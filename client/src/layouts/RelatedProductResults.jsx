import React, { useEffect, useState, useRef } from 'react';
import HorizontalProductBox from '../components/HorizontalProductBox';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const RelatedProductResults = ({ data }) => {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const targetRef = useRef(null);

  const fetchMoreData = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ecommerce-website-9k8k.onrender.com/api/v1/search?query=${"a"}&page=${pageNumber}`
        );
        const data = await response.json();
        setRelatedProduct((prevData) => [...prevData, ...data]);
      } catch (err) {}
    };

    fetchData();
  }, [pageNumber]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const callback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      fetchMoreData();
    }
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetRef.current]);


   const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 11
    },
    desktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 7
    },
    desktop2: {
      breakpoint: { max: 1500, min: 1200 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1200, min: 950 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 950, min: 700 },
      items: 4
    },
    mobile2:{
      breakpoint: { max: 700, min: 500 },
      items: 3
    },
    mobile3:{
      breakpoint: { max:500, min: 320 },
      items: 2
    },
     mobile4:{
      breakpoint: { max:320, min: 0 },
      items: 1
    }
  };
  

  
  return (
    <div className="RelatedProductSlider">
      <div className="f_df-df">
        <h2 className="res_we">Explore more products</h2>
        <div className="related-products-here" style={{ marginTop: '10px' }}>
          {/* <div className="related-slider-box"> */}
          <Carousel responsive={responsive}  className="related-slider-box">
            {relatedProduct
              .filter((i) => i.item?._id !== data._id)
              .map((res, index) => {
                if (relatedProduct.length === index + 1) {
                  return (
                    <div key={res.item._id} ref={targetRef}>
                      <HorizontalProductBox data={res.item} key={res.item._id}/>
                    </div>
                  );
                } else {
                  return (
                    <div key={res.item._id}>
                      <HorizontalProductBox data={res.item} />
                    </div>
                  );
                }
              })}
              </Carousel>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default RelatedProductResults;
