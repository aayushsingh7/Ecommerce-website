const User = require('../models/userModel')
const Product = require('../models/productModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


const sendResetPasswordMail = async (name, email, token, id) => {
  const html =  `<div style="width:100vw;height:100vh;padding:"20px;display:flex;align-item:"center;justify-content:center">
   <h2>Reset Your Password</h2>
  <div style={"width:100%;marginTop:20px;"}>
  <p style={"color:white"}> Hii ${name} </p> 
  <p>Let's reset your password so you can get back to enjoying foods</p>
  <a href="https://ecommerce-website-ocdk.onrender.com/api/v1/reset-password/${id}/${token}">
  <button style={"width:100%;padding:12px;font-size:17px;color:white;background:#008ee6;margin-top:20px"}>Reset Your Password</button> </a>
  </div>
  </div>`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOption = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "For Reset Password",
    html: html,
  };
  transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      res.status(500).send({success:false , msg:"Something Went Wrong"})
    } 
  });
};

const generateToken = async (id) => {
  try {
    let token = await jwt.sign({ _id: id }, process.env.SECRET_KEY)
    return token;
  } catch (err) {
    console.log(err)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let isUserExists = await User.findOne({ email: email })
    if (!isUserExists) { return res.status(404).send({ success: false, msg: "User not exists" }) }
    let verifyPassword = await bcryptjs.compare(password, isUserExists.password)
    if (!verifyPassword) { return res.status(401).send({ success: false, msg: "Invalid password" }) }
    let token = await generateToken(isUserExists._id)
    res.cookie('amazon', token, { expire: "10d", httpOnly: true, secure: true })
    res.status(200).send({ success: true, msg: "Login successfully" })
  } catch (err) { res.status(500).send(err.message) }
}

const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const userExists = await User.findOne({ email: email })
    if (userExists) { return res.status(409).send({ success: false, msg: "User already exists" }) }
    let hashPassword = await bcryptjs.hash(password, 12)
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      address: address
    })
    await newUser.save()
    if (newUser) {
      let token = await generateToken(newUser._id)
      res.cookie('amazon', token, { expire: '10d', httpOnly: true, secure: true })
      res.status(200).send({ success: true, msg: "Registered successfully", newUser: newUser })
    } else {
      res.status(400).send({ success: true, msg: "Failed to create user" })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const addToFevorates = async (req, res) => {
  try {
    let user = req.userData;
    const { product } = req.body;
    let addItem = await User.updateOne({ _id: user._id }, { $push: { fevorates: product } })
    if (addItem.modifiedCount === 1) { res.status(200).send({ success: true, msg: "Item added successfully" }) }
    else { res.status(400).send({ success: false, msg: "Failed to add item to favorites" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const removeFromFevorates = async (req, res) => {
  try {
    let user = req.userData;
    const { product } = req.body;
    let addItem = await User.updateOne({ _id: user._id }, { $pull: { fevorates: product } })
    if (addItem.modifiedCount === 1) { res.status(200).send({ success: true, msg: "Item removed successfully" }) }
    else { res.status(400).send({ success: false, msg: "Failed to remove item from favorites" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const addToCart = async (req, res) => {
  try {
    let user = req.userData;
    const { product } = req.body;
    let addItem = await User.updateOne({ _id: user._id }, { $push: { cart: product } })
    if (addItem.modifiedCount === 1) { res.status(200).send({ success: true, msg: "Item added successfully" }) }
    else { res.status(400).send({ success: false, msg: "Failed to add item to cart" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const removeFromCart = async (req, res) => {
  try {
    let user = req.userData;
    const { product } = req.body;
    let addItem = await User.updateOne({ _id: user._id }, { $pull: { cart: product } })
    if (addItem.modifiedCount === 1) { res.status(200).send({ success: true, msg: "Item removed successfully" }) }
    else { res.status(400).send({ success: false, msg: "Failed to remove item from cart" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const increaseQty = async (req, res) => {
  try {
    const { productId } = req.body;
    let increaseQuantity = await User.updateOne({ _id: req.userData._id, "cart._id": productId }, { $inc: { "cart.$.quantity": +1 } })
    if (increaseQuantity.modifiedCount === 1) { res.status(200).send({ success: true, msg: "Item quantity decreased" }) }
    else { res.status(200).send({ success: false, msg: "Something went wrong" }) }
  } catch (err) { res.status(500).send(err.message) }
}

const decreaseQty = async (req, res) => {
  try {
    const { productId } = req.body;
    let decreaseQuantity = await User.updateOne({ _id: req.userData._id, "cart._id": productId }, { $inc: { "cart.$.quantity": -1 } })
    if (decreaseQuantity.modifiedCount === 1) { res.status(200).send({ success: true, msg: "Item quantity decreased" }) }
    else { res.status(200).send({ success: false, msg: "Something went wrong" }) }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const checkUser = async (req, res) => {
  try {
    res.status(200).send(req.userData)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const editUserInfo = async (req,res)=> {
  try {
    let user = req.userData;
    let editUser = await User.updateOne({_id:user._id},{$set:req.body})
    if(editUser.modifiedCount === 1 ){res.status(200).json("Changes saved successfully")}
    else{res.status(400).send({success:false,msg:"Something went wrong"})}
    } catch (err) {
    res.status(500).send(err.message)
  }
}

const logout = async(req , res)=> {
  try { 
    res.clearCookie("amazon", {
      path:"/",
      secure:false,
      httpOnly:true
    });
    res.status(200).send({success:true , msg:"User Logout Successfully"})
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const forgotPassword = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await User.findOne({email:email})

    if(!user){return res.status(404).send({success:false,msg:"User not found"})}

    let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
    let verifyToken = { token: token, expire: false };
    let updateUserToken = await user.updateOne({
      $push: { resetPasswordLinks: verifyToken },
    });
    let sendEmail = await sendResetPasswordMail(
      user.name,
      user.email,
      token,
      user._id
    );

    
      res.clearCookie("amazon", {
        path:"/",
        secure:false,
        httpOnly:true
      });
    
    res
      .status(200)
      .send({
        success: true,
        msg: "Reset Password Link Has Been SuccessFully Send",
        update: updateUserToken,
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const resetPasswordClient = async(req , res)=> {
    try {
    let schema = User
    let secret_key = process.env.SECRET_KEY
     let token = req.params.token;
     let id = req.params.id;
     
     let checkToken =  jwt.verify(token , secret_key)
     if(checkToken){
      let verifyToken = await schema.findOne({_id:id , "resetPasswordLinks.token":token},{"resetPasswordLinks.$":1})
      if(verifyToken.resetPasswordLinks[0].expire !== true){
        res.render('resetPassword',{ id: id, token: token })
        let updateToken = await schema.updateOne({_id:id , "resetPasswordLinks.token":token},{$set:{"resetPasswordLinks.$.expire":true}})
      }else{
        res.render('linkUsed')
      }
     }else{
      res.render('invalidLink')
     }
    } catch (err) {
      res.render('invalidLink')
    }
};

const resetPassword = async(req , res)=> {
  try {
    let schema = User;
    let id = req.params.id;
    let password = req.body.password;

  let hashPassword = await bcryptjs.hash(password,12)
  let changeUserPassword = await schema.updateOne({_id:id},{$set:{password:hashPassword}})
   if(changeUserPassword.modifiedCount === 1){
    res.status(200).send({success:true , msg:"Password Reset Successfully"})}
    else{res.status(400).send({success:false,msg:"Something went wrong"})
  }
  } catch (err) {
    res.status(500).send(err.message)
  }
};


module.exports = {
  login,
  register,
  addToFevorates,
  removeFromFevorates,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  checkUser,
  editUserInfo,
  resetPassword,
  resetPasswordClient,
  forgotPassword,
  logout
}
