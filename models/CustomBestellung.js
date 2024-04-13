import mongoose, { Mongoose, mongo } from "mongoose";

const CustomBestellungsSchema = new mongoose.Schema({
    kunde:{
        type: String,
        required: true,
        maxlength: 100
    },
    adresse:{
        type: String,
        required: true,
        maxlength: 200
    },
    betrag:{
        type: Number,
        required: true,
    },
    status:{
        type: Number,
        default: 0
    },
    zahlung:{
        type: Number,
        required: true,
    },
    zeit:{
        type: String,
        required: true,
    },
    zutaten:{
        type:[
            {
                zutat:{
                    type:String,
                    required:true
                },
                menge:{
                    type:Number,
                    required:true
                },
            }
        ]
    }
})

//delete mongoose.connection.model["Bestellung"]
export default mongoose.models.CustomBestellung || mongoose.model("CustomBestellung", CustomBestellungsSchema)