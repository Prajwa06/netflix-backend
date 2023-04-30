const mongoose =require ('mongoose');

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:false,
    },
    movie:Object,
    
});

const userModel=mongoose.model('user', UserSchema );

module.exports=userModel;