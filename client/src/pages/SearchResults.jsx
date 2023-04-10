import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductFilter from '../components/ProductFilter'
import ColumnBoxContainer from '../layouts/ColumnBoxContainer'
import { AppContext } from '../context/Context'
import NoResults from '../components/NoResults'
import { BsFilterRight } from 'react-icons/bs'

const SearchResults = () => {
  const [result, setResult] = useState(["search"])
  const [loading, setLoading] = useState(true)
  const { searchResults, setSearchResults, setFilterShow, filterShow } = useContext(AppContext)
  const location = useLocation();
  const q = new URLSearchParams(location.search);
  const query = q.get('query')
  const minPrice = q.get('minPrice');
  const maxPrice = q.get('maxPrice');
  const minRatings = q.get('minRatings');
  const maxRatings = q.get('maxRatings');
  const seller = q.get('seller');
  const category = q.get('category')

  document.title = `${loading ? "Loading..." : query ? query : category ? category : seller}`

  useEffect(() => {
    setFilterShow(false)
    if(!minPrice && !maxPrice && !maxRatings && !minRatings && query?.includes("all")){
    getAllProducts()
    }else{
      getSearchResults()
    }
  }, [location.search]);


  const getSearchResults = async () => {
    try {
      let url;
      if (query && !maxPrice && !minPrice && !minRatings && !maxRatings) {
        url = `https://ecommerce-website-9k8k.onrender.com/api/v1/search?query=${query}`;
      } else if (query && minPrice && maxPrice) {
       
        url = `https://ecommerce-website-9k8k.onrender.com/api/v1/search?query=${
          query ? query.includes("all") ? "a" : query : category ? category : seller}&maxPrice=${maxPrice}&minPrice=${minPrice}`;
      } else if (minRatings && maxRatings) {
      
        url = `https://ecommerce-website-9k8k.onrender.com/api/v1/search?query=${query ? query.includes("all") ? "a" : query : category ? category : seller}&maxRatings=${maxRatings}&minRatings=${minRatings}`;
      } else if (category) {
        url = `https://ecommerce-website-9k8k.onrender.com/api/v1/search?category=${category}`;
      } else {
        url = `https://ecommerce-website-9k8k.onrender.com/api/v1/search?seller=${seller}`;
      }      

      setResult(["search"])
      setLoading(true)
      let data = await fetch(url, { method: "GET", credentials: "include" })
      let response = await data.json()
      if (data.ok) {
        setLoading(false)
        setResult(response)
        setSearchResults(response)
      } else {
        setLoading(false)
      }
    } catch (err) {}
  }

  const getAllProducts = async()=> {
    try {
      setResult(["search"])
      setLoading(true)
      let data = await fetch('https://ecommerce-website-9k8k.onrender.com/api/v1/all-product',{
        method:"GET",
        credentials:"include",
        headers:{"Content-Type":"application/json"}
      })
      let response = await data.json()
      if(data.ok){
        setSearchResults(response)
        setLoading(false)
      }else{
        setSearchResults([])
        setLoading(false)
      }
    } catch (err) {}
  }

  return (
    <>
      <div className="SearchResults">
        {filterShow ? <div className="rgb" onClick={() => setFilterShow(false)}></div> : null}
        <div className="filter-option-mob-view-add" onClick={() => setFilterShow(true)}>
          <BsFilterRight style={{ fontSize: "30px" }} />
          <p>search by filter</p>
        </div>
        <ProductFilter setLoading={setLoading} loading={loading} />
        {result.length <= 0 ? <NoResults /> : <ColumnBoxContainer loading={loading} data={searchResults} />}
      </div>
    </>
  )
}

export default SearchResults