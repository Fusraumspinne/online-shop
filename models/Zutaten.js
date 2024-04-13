import mongoose, { Mongoose, mongo } from "mongoose";

const ZutatenSchema = new mongoose.Schema({
    zutat:{
        type: String,
        required: true,
        maxlength: 50
    },
    preis:{
        type: Number,
        required: true,
    },
    bild:{
        type: String,
        required: true,
    },
})

export default mongoose.models.Zutaten || mongoose.model("Zutaten", ZutatenSchema)