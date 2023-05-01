require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
const d=new Date();
app.use(cors());
app.use(express.json());
const username = encodeURIComponent("prajwal");
const password = encodeURIComponent(process.env.password);
const User=require("./models/UserModel");
const Plan=require("./models/PlanModel");
mongoose.connect(
    `mongodb+srv://${username}:${password}@atlascluster.4w0lgud.mongodb.net/test`
  );
  const db = mongoose.connection;
  // check connection status
  db.once("open", () => {
    console.log("Db is connected");
  });


app.post("/add",(req,res)=>{
    const{email,movie}=req.body;
    try {
        User.create({
            email,movie
        });
        res.send({success:true});
        
    } catch (error) {
        res.send({success:false});
    }
});


app.get("/list",async (req,res)=>{
    const{email}=req.body;
    try {
        const list=await User.find({email:email});
        res.send({list,success:true});
    } catch (error) {
        res.send({success:false});
    }
});


app.post("/delete", async (req,res)=>{
    const{movie}=req.body;
    try {
        await User.deleteOne({_id:movie._id});
        res.send({success:true});
    } catch (error) {
        console.log(error);
        res.send({success:false});
    }
});


app.get("/plan",async (req,res)=>{
    const {email}=req.body;
    try {
        const data=await Plan.findOne(email);
        if(data){
        res.send({data,success:true});
        }
        else{
            res.send({success:false});
        }
    } catch (error) {
        res.send({success:false});
    }
});

app.post("/plan",async (req,res)=>{
    const {email,plan}=req.body;
    console.log(email,plan);
    try {
        const data=await Plan.findOne({email});
        if(data){
            const data=  await Plan.updateOne({plan});
            if(data){
            res.send({success:true});
        }
        }
        else{
           const data= await Plan.create({
                email,
                plan
            })
            console.log(data);
            if(data){
            res.send({success:true});
            }
        }
    } catch (error) {
        console.log(error);
        res.send({success:false});
    }
})

app.get("/",(req,res)=>{
    res.send("backend has started");
})

app.listen(5000, ()=>{
    console.log(`app is running on port 5000 at ${d.toLocaleString()}`)
});
