import mongoose, { Mongoose } from "mongoose";

const ProduktSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50
    },
    beschreibung:{
        type: String,
        required: true,
        maxlength: 50
    },
    kategorie:{
        type: String,
        required: true,
        maxlength: 30
    },
    preis:{
        type: Number,
        required: true,
    },
    url:{
        type: String,
        require: true,
        maxlength: 30,
        unique: true
    },
    bild:{
        type: String,
        required: true,
    },
    gewicht:{
        type: Number,
        required: true,
    },
    x:{
        type: Number,
        required: true
    },
    y:{
        type: Number,
        required: true
    },
    z:{
        type: Number,
        required: true
    },
    extras:{
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                preis:{
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

export default mongoose.models.Produkt || mongoose.model("Produkt", ProduktSchema)