const mongoose =require ('mongoose');

const PlanSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    plan:Object,
    
});

const planModel=mongoose.model('plan', PlanSchema );

module.exports=planModel;