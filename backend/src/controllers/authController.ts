import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const register = async (req:Request, res:Response)=>{
    try{
        const {email,password} = req.body
        
        const existing = await User.findOne({email})
        if(existing){
            res.status(400).json({message:"Email already registered"})
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET!,
            {expiresIn:'7d'}
        )

        res.status(201).json({
            token,
            user:{
                id:user._id,
                email: user.email
            }
        })
    } catch (err){
        res.status(500).json({message:'Server error'})
    }
}

export const login = async(req:Request, res:Response)=>{
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message:'Invalid credentials'})
            return
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid credentials"})
            return
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET!,
            {expiresIn:'7d'}
        )

        res.status(200).json({
            token,
            user:{
                id:user._id,
                email:user.email
            }
        })
    } catch (err){
        res.status(500).json({message:'Server error'})
    }
}