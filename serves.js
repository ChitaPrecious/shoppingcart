const express=require("express")
const mongoose=require("mongoose")
const port=2013
const app=express()
app.use(express.json())
const shoppingSchma=new mongoose.Schema({
    fruits:String,
    quantity:Number,
    price:Number,
    fresh:Boolean
})
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to my page",
    
    })
})
const user=mongoose.model("shoppingcart",shoppingSchma)
//creating a data in our database
app.post("/createuser",async(req,res)=>{
    const newResult=await new user(req.body)
  newResult.save()
    res.status(200).json (newResult)
})
//retrieving data
app.get("/getall",async(req,res)=>{
    const All=await user.find()
    res.status(200).json(
        {
            message:"the available carts are "+All.length,
            data:All
        }
    )
})
//retrieve a single user
app.get("/getOne/:id",async(req,res)=>{
    const id=req.params.id
    const Oneuser=await user.findById(id)
    res.status(200).json({
        message:`these products are in the cart with the id of ${id}`,
        data:Oneuser}
    )
})
//delete one
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const deleteuser=await user.findByIdAndDelete(id)
    res.status(200).json({
        message:`the cart with the id${id} has been deleted`,
        data:deleteuser}
    )
})



mongoose.connect("mongodb+srv://preciouschita37:OLiBbFgDz9JdsclA@cluster0.xfxpksl.mongodb.net/")
.then(()=>{
   console.log("connection to database is successful")
})


app.listen(port,()=>{
    console.log(`server is listening to port  ${port}`)
})