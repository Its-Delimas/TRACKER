import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    duration:{
        type: Number,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
},{timestamps:true})

export default mongoose.model('Session',sessionSchema)