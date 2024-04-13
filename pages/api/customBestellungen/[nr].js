import mongodb from "../../../utils/mongodb";
import CustomBestellung from "../../../models/CustomBestellung";

export default async function handler(req, res) {
    const { method, query: { nr } } = req;
    await mongodb.dbConnect();

    if (method === "GET") {
        try {
            const customBestellung = await CustomBestellung.findById(nr);
            res.status(200).json(customBestellung);
        } catch (error) {
            res.status(200).json(error);
        }
    }

    if (method === "PUT") {
        try {
            const customBestellung = await CustomBestellung.findByIdAndUpdate(nr, req.body, {new:true});
            res.status(200).json(customBestellung);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === "DELETE") {
        try {
            const customBestellung = await CustomBestellung.findByIdAndDelete(nr);
            res.status(200).json(customBestellung);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}