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
        type: Date,
        expires: "1h",
    }
})

export default mongoose.model('Url', urlSchema)