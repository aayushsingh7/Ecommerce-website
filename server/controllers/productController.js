const Product = require('../models/productModel')
const Fuse = require('fuse.js')

const addProduct = async (req, res) => {
  try {
    const { name, details, originalPrice, discount, discription, productType, tags, inStockQuantity, images, finalPrice, colour, seller } = req.body;
    let saveProduct = new Product({
      name: name,
      details: details,
      images: images,
      originalPrice: originalPrice,
      discount: discount,
      discription: discription,
      tags: tags,
      productType: productType,
      inStockQuantity: inStockQuantity,
      finalPrice: finalPrice,
      colour: colour,
      seller: seller
    })

    await saveProduct.save()

    if (saveProduct) { res.status(200).send({ success: true, msg: "Product added successfully", Data: saveProduct }) }
    else { res.status(400).send({ success: false, msg: "Something went wrong while uploading the product" }) }


  } catch (err) { res.status(500).send(err.message) }
}

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    let deleteProduct = await Product.deleteOne({ _id: productId })
    if (deleteProduct.deletedCount === 1) { res.status(200).send({ success: true, msg: "Product deleted successfully" }) }
    else { res.status(400).send({ success: false, msg: "Something went wrong while deleting the product" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const updatePro = await Product.updateOne({ _id: productId }, { $set: req.body })
    if (updatePro.modifiedCount > 0) { res.status(200).send({ success: true, msg: "Updated successfully" }) }
    else { res.status(400).send({ success: false, msg: "something went wrong" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const searchProduct = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, minRatings, maxRatings, seller, category } = req.query;

    if (minRatings && maxRatings && query ) {
    let data = await Product.find().populate('reviews').then((documents) => {
      let fuse = new Fuse(documents, {
        keys: ["name", "tags", "productType", "finalPrice"],
        threshold: 0.2,
        matchAllTokens: true,
        includeScore: true,
        tokenize: true
      })


      const results = fuse.search(query);

      if (results) {
        let filteredData = results.filter((res) => {
          return res.item?.stars <= maxRatings && res.item?.stars >= minRatings;
        });
        return res.status(200).send(filteredData);
      } else {
        return res.status(404).send({ success: false, msg: "No product found" });
      }
      
    })

    }

    if (minPrice && maxPrice && query) {
      let data = await Product.find().populate('reviews').then((documents) => {
        let fuse = new Fuse(documents, {
          keys: ["name", "tags", "productType", "finalPrice"],
          threshold: 0.2,
          matchAllTokens: true,
          includeScore: true,
          tokenize: true
        })


        const results = fuse.search(query);

        if (results) {
          let filteredData = results.filter((res) => {
            return res.item?.finalPrice < maxPrice && res.item?.finalPrice > minPrice;
          });
          filteredData.sort((a, b) => a.item.finalPrice - b.item.finalPrice);
          return res.status(200).send(filteredData);
        } else {
          return res.status(404).send({ success: false, msg: "No product found" });
        }
        
      })
    }

    if (seller) {
      const results = await Product.find({ seller: seller }).populate('reviews')
      if (results.length > 0) { return res.status(200).send(results) }
    }

    if ((query || category) && !maxPrice && !minPrice && !maxRatings && !minRatings) {    
      let data = await Product.find().populate('reviews').then((documents) => {
        let fuse = new Fuse(documents, {
          keys: ["name", "tags", "productType", "finalPrice", "seller"],
          threshold: 0.2,
          matchAllTokens: true,
          includeScore: true,
          tokenize: true
        });
  
        let q = query ? query : category
        const results = fuse.search(q);

        if (results) {
          return res.status(200).send(results);
        } else {
          return res.status(404).send({ success: false, msg: "No product found" });
        }
      })
    }


  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllProduct = async (req, res) => {
  try {
    let data = await Product.find().populate('reviews')
    if (data.length > 0) { res.status(200).send(data) }
    else { res.status(400).send({ success: false, msg: "Something went wrong" }) }

  } catch (err) { res.status(500).send(err.message) }
}

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    let getProduct = await Product.findOne({ _id: productId }).populate('reviews')
    if (getProduct) { res.status(200).send(getProduct) }
    else { res.status(404).send({ success: false, msg: "No Product found" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const updateAvgReview = async(req,res)=> {
  try {
  const {productId , stars} = req.body;
    let changeRev = await Product.updateOne({_id:productId},{$set:{stars:stars}})
    if(changeRev.modifiedCount === 1){res.status(200).json("Review updated")}
    else{res.status(400).send({success:false,msg:"Something went wrong"})}
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
  getAllProduct,
  getSingleProduct,
  updateAvgReview
}