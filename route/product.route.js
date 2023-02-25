const express = require("express");
const {productModel} = require("../model/Product.model")

const productRouter = express.Router()


productRouter.get("/" , async(req , res)=>{
    let product = await productModel.find();
  res.send(product); 

  
})

//   const value_low = +req.query.value_low;
//   const value_high = +req.query.value_high;
//   const Type = req.query.location;
 
//   const sort_by = req.query.sort_by;
//   const { door, Ac, bodycolor, seats } = req.query;

//   console.log(req.query);
//   const filterQuery = {};
//   if (door) {
//     filterQuery.door = door;
//   }
//   if (Ac) {
//     filterQuery.Ac = Ac;
//   }
//   if (bodycolor) {
//     filterQuery.bodycolor = bodycolor;
//   }
//   if (seats) {
//     filterQuery.seats = seats;
//   }
//   const carCount = await CarModel.countDocuments(filterQuery);
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 5;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   const results = {};
//   if (endIndex < carCount) {
//     results.next = {
//       page: page + 1,
//       limit: limit,
//     };
//   }
//   if (startIndex > 0) {
//     results.previous = {
//       page: page - 1,
//       limit: limit,
//     };
//   }

//   try {
//     results.results = await CarModel.find(filterQuery)
//       .limit(limit)
//       .skip(startIndex)
//       .exec();
   
//   } catch (error) {
   
//     return res.status(500).json({ message: error.message });
//   }

//   let sort_order = 1;
//   if (sort_by === "desc") {
//     sort_order = -1;
//   }

//   if (location) {
//     let cars = await CarModel.find({ location: location }).sort({
//       value: sort_order,
//     });
//     res.send(cars);
//   } else if (model) {
//     let cars = await CarModel.find({ model: model }).sort({
//       value: sort_order,
//     });
//     res.send(cars);
//   } else if (brand) {
//     let cars = await CarModel.find({ brand: brand }).sort({
//       value: sort_order,
//     });
//     res.send(cars);
//   } else if (value_high && value_low) {
//     try {
//       let cars = await CarModel.find({
//         $and: [{ value: { $gt: value_low } }, { value: { $lt: value_high } }],
//       }).sort({ value: sort_order });
//       res.send(cars);
//     } catch (err) {
//       console.log(err);
//       res.send({ err: "something went wrong" });
//     }
//   } else {
//     try {
//       let cars = await CarModel.find().sort({ value: sort_order });
//       res.send(cars);
//     } catch (err) {
//       console.log(err);
//       res.send({ err: "something went wrong" });
//     }
//   }
// });



productRouter.post("/addproduct" , async(req , res)=>{
   const {Title , Description , Type, Weight , Price , DiscountPrice ,Img , Brand} = req.body
     try{
       let newProduct = new productModel({
        Title , Description , Type, Weight , Price , DiscountPrice ,Img , Brand
       })
       await newProduct.save()
       res.status(200).send(newProduct);
       
     }catch(err){
        res.status(400).send(err.message);
     }
})
productRouter.get("/:id", async (req, res) => {
    let id=req.params.id;
    id.toString()
  
    let products = await productModel.find({_id:id});
    res.send(products);
    // console.log(products);
  });

  productRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    let id = req.params.id;
    try {
   let updatedProducts = await productModel.findByIdAndUpdate({ _id: id }, payload);
      res.send(updatedProducts);
    } catch (e) {
      res.send(e.message);
    }
  });
  productRouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let deleteProducts =    await productModel.findByIdAndDelete({ _id: id });
      res.send("deleted");
    } catch (e) {
      res.send(e.message);
    }
  });
module.exports = {
    productRouter
}



