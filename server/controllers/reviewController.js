const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

const addReview = async (req, res) => {
  try {
    let { productId, heading, stars, body } = req.body;
    let newReview = new Review({
      user: {
        name: req.userData.name,
        picture: req.userData.picture,
      },
      heading: heading,
      stars: stars,
      body: body,
      img: req.cloudinary_image,
    });

    await newReview.save();

    let product = await Product.findOne({ _id: productId });
    let updateProduct = await product.updateOne({
      $push: { reviews: newReview._id },
      $inc: { reviewedBy: 1, totalStars: stars },
      $set: {
        avgStar: (product.totalStars + stars) / (product.reviewedBy + 1),
      },
    });

    if (updateProduct.modifiedCount === 1) {
      res.status(200).send({
        success: true,
        msg: "Thanks for reviewing this product",
        review: newReview,
      });
    } else {
      res.status(400).send({ success: false, msg: "Cannot add review" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const removeReview = async (req, res) => {
  try {
    let { productId, heading, stars, body } = req.body;
    let reivew = new Review({
      user: req.userData._id,
      heading: heading,
      stars: stars,
      body: body,
    });

    await reivew.save();

    let addRev = await Product.updateOne(
      { _id: productId },
      { $pull: { reviews: productId } }
    );
    if (addRev.modifiedCount === 1) {
      res
        .status(200)
        .send({ success: true, msg: "Review removed successfully" });
    } else {
      res.status(400).send({ success: false, msg: "Cannot remove review" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const helpFull = async (req, res) => {
  try {
    const { productId, reviewId } = req.body;
    let update = await Product.updateOne(
      { _id: productId, "reviews._id": reviewId },
      { $inc: { "reviews.$.helpfull": +1 } }
    );
    if (update.modifiedCount === 1) {
      res.status(200).send({ success: true, msg: "Thanks for the feedback" });
    } else {
      res.status(400).send({ success: false, msg: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  addReview,
  removeReview,
  helpFull,
};
