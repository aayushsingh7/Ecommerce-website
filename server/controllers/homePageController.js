const {HomePageDataBox }= require('../models/homePageDataModel')

const addData = async(req,res)=> {
try {
    let data = req.body;
    let addItem = new HomePageDataBox(data)
     await addItem.save()
if(addItem){res.status(200).send({success:true,data:addItem,msg:"Item added successfully"})}
else{res.status(400).send({success:false,msg:"Something went wrong",data:addItem})}
} catch (err) {res.status(500).send(err.message)}
}

const getData = async(req,res)=> {
    try{
    let getResponse = await HomePageDataBox.find()
    if(getResponse.length > 0){res.status(200).send(getResponse)}
    else{res.status(404).send({success:false,msg:"No product found"})}
    }catch(err){
        res.status(500).send(err.message)
    }
}

module.exports = {
    addData,
    getData
}