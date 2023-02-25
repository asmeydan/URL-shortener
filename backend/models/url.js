import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 10)
    }
})

export default mongoose.model('Url', urlSchema)