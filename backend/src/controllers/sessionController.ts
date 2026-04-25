import {Response} from 'express'
import {AuthRequest} from '../middleware/auth'
import Session from '../models/Session'

export const createSession = async (req: AuthRequest, res:Response)=>{
    try{
        const {duration} = req.body
        if(!duration || duration < 0){
            res.status(400).json({message:"Invalid duration"})
            return
        }

        const session = await Session.create({
            user: req.userId,
            duration,
            date: new Date()
        })

        res.status(201).json(session)
    } catch ( err){
        res.status(500).json({message:'Server error'})
    }
}

export const getSessions = async (req: AuthRequest, res: Response)=>{
    try{
        const sessions = await Session.find({user:req.userId}).sort({date:-1})
        res.status(200).json(sessions)
    } catch(err){
        res.status(500).json({message:'Server error'})
    }
}

export const getTodaySessions = async (req: AuthRequest, res:Response)=>{
    try{
        const start = new Date ()
        start.setHours(0,0,0,0)

        const end = new Date()
        end.setHours(23,59,59,999)

        const sessions = await Session.find({
            user: req.userId,
            date:{$gte: start, $lte:end}
        }).sort({date:-1})

        res.status(200).json(sessions)
    } catch (err){
        res.status(500).json({message:"Server error"})
    }
}