import User from "../model/user.model.js"
import bcrypt from "bcrypt"
export const signup = async(req,res)=>{
   try {
    const {fullName,email,password} = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:"User already exits"})
    }

    const hashPassword = await bcrypt.hash(password,10)
    const createUser = new User({
        fullName: fullName,
        email:email,
        password: hashPassword,
    })
    await createUser.save();
    res.status(201).json({message:"User created successfully"})
   } catch (error) {
    console.log("Error",error)
    res.status(500).json({message:"Internal server Error"})
   }

 }

 export const login = async(req,res)=>{
    try {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    const isMatch = await bcrypt.compare(password, user.password)
    if(!user || !isMatch){
         res.status(400).json({message: "Invalid username or password"})
    }else{
        res.status(200).json({
            user:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email
            },
        })
    }
    } catch (error) {
        console.log("error",error)
        res.status(500).json({message:"Internal server error"})
    }
 }