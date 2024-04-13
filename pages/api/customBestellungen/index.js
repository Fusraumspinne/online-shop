import mongodb from "../../../utils/mongodb";
import CustomBestellung from "../../../models/CustomBestellung";

export default async function handler(req, res) {
    const { method } = req;
    await mongodb.dbConnect();

    if (method === "GET") {
        try {
            const customBestellung = await CustomBestellung.find();
            res.status(200).json(customBestellung);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    if (method === "POST") {
        try {
            const customBestellung = await CustomBestellung.create(req.body);
            res.status(201).json(customBestellung);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}