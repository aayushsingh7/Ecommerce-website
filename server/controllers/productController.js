const Product = require("../models/productModel");
const Fuse = require("fuse.js");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      details,
      originalPrice,
      discount,
      discription,
      productType,
      tags,
      inStockQuantity,
      images,
      finalPrice,
      colour,
      seller,
    } = req.body;
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
      seller: seller,
    });

    await saveProduct.save();

    if (saveProduct) {
      res.status(200).send({
        success: true,
        msg: "Product added successfully",
        Data: saveProduct,
      });
    } else {
      res.status(400).send({
        success: false,
        msg: "Something went wrong while uploading the product",
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    let deleteProduct = await Product.deleteOne({ _id: productId });
    if (deleteProduct.deletedCount === 1) {
      res
        .status(200)
        .send({ success: true, msg: "Product deleted successfully" });
    } else {
      res.status(400).send({
        success: false,
        msg: "Something went wrong while deleting the product",
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const updatePro = await Product.updateOne(
      { _id: productId },
      { $set: req.body }
    );
    if (updatePro.modifiedCount > 0) {
      res.status(200).send({ success: true, msg: "Updated successfully" });
    } else {
      res.status(400).send({ success: false, msg: "something went wrong" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const searchProduct = async (req, res) => {
  try {
    const {
      query,
      minPrice,
      maxPrice,
      minRatings,
      maxRatings,
      seller,
      category,
    } = req.query;

    let searchOptions = [
      { name: { $regex: query || category, $options: "i" } },
      { productType: { $regex: query || category, $options: "i" } },
      { tags: { $regex: query || category, $options: "i" } },
    ];

    let products;

    if (minRatings && maxRatings && query) {
      products = await Product.find({
        $or: searchOptions,
        avgStar: { $gte: parseFloat(minRatings), $lte: 5 },
      }).populate("reviews");

      if (products) {
        return res.status(200).send(products);
      } else {
        return res
          .status(404)
          .send({ success: false, msg: "No product found" });
      }
    }

    if (minPrice && maxPrice && query) {
      products = await Product.find({
        $or: searchOptions,
        finalPrice: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
      }).populate("reviews");

      if (products) {
        return res.status(200).send(products);
      } else {
        return res
          .status(404)
          .send({ success: false, msg: "No product found" });
      }
    }

    if (seller) {
      products = await Product.find({ seller: seller }).populate("reviews");

      if (products) {
        return res.status(200).send(products);
      } else {
        return res
          .status(404)
          .send({ success: false, msg: "No product found" });
      }
    }

    if (query || category) {
      if (query === "all") {
        products = await Product.find().populate("reviews");
      } else {
        products = await Product.find({ $or: searchOptions }).populate(
          "reviews"
        );
      }

      if (products) {
        return res.status(200).send(products);
      } else {
        return res
          .status(404)
          .send({ success: false, msg: "No product found" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getAllProduct = async (req, res) => {
  try {
    let data = await Product.find().populate("reviews");
    if (data.length > 0) {
      res.status(200).send(data);
    } else {
      res.status(400).send({ success: false, msg: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    let getProduct = await Product.findOne({ _id: productId }).populate(
      "reviews"
    );
    if (getProduct) {
      res.status(200).send(getProduct);
    } else {
      res.status(404).send({ success: false, msg: "No Product found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateAvgReview = async (req, res) => {
  try {
    // const {productId,star} = req.body;
    //   let product = await Product.updateOne({_id:productId},{
    //     $inc:{reviewedBy}
    //   })
    res.status(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
  getAllProduct,
  getSingleProduct,
  updateAvgReview,
};
