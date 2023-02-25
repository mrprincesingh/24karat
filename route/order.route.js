const express = require("express");
const {OrderModel} = require("../model/order.model")

const OrderRouter = express.Router();


OrderRouter.get("/",async(req,res)=>{
    const userId = req.body.userId;
    try {
        const data  = await OrderModel.find()
        res.send(data)
        
    } catch (error) {
        res.send(error)
    }
});

OrderRouter.post("/add",async(req,res)=>{
    try {
        const data  = new OrderModel(req.body)
        await data.save()
        res.send("data is added")
    } catch (error) {
        res.send(error)
    }
});
OrderRouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let deleteProducts =    await OrderModel.findByIdAndDelete({ _id: id });
      res.send("deleted");
    } catch (e) {
      res.send(e.message);
    }
  });


module.exports ={OrderRouter}