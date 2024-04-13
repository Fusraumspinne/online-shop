import Link from "next/link"
import Image from "next/image"
import { Table, CloseButton, Button, Card, ListGroupItem, ListGroup } from "react-bootstrap" 
import jsondb from "@/jsondb/zutaten"
import { useState } from "react"
import { useRouter } from "next/router"
import {motion} from "framer-motion"
import axios from "axios";

export default function Sandbox({}){
    const [customBurger, setCustomBurger] = useState([]);

    const router = useRouter()

    const [userName, setUserName] = useState('');
    const [userLName, setUserLName] = useState('');
    const [userAdresse, setUserAdresse] = useState('');

    let totalPrice = 4;
    let finalPrice = 0

    const addBurger = (zutat) => {
        const existingIndex = customBurger.findIndex(item => item.zutat === zutat.zutat);
        if (existingIndex !== -1) {
            const updatedBurger = [...customBurger];
            updatedBurger[existingIndex].menge += 1;
            setCustomBurger(updatedBurger);
        } else {
            const updatedBurger = [...customBurger, { ...zutat, menge: 1 }];
            setCustomBurger(updatedBurger);
        }
    };

    const removeZutat = (zutat) =>{
        const updatedBurger = customBurger.filter(item => item.zutat !== zutat.zutat);
        setCustomBurger(updatedBurger);
    }

    const calculatePreis = () => {
        for (let i = 0; i < customBurger.length; i++) {
            totalPrice += customBurger[i].preis * customBurger[i].menge;
        }
        finalPrice = totalPrice
        return(totalPrice);
    };

    const erstelleBestellung = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/customBestellungen", data);
            if (res.status === 201){
                router.push(`/customBestellungen/${res.data._id}`);
            }
        } catch (error) {
          console.log(error)
        }
    }
    
      const bezahlen = async ()=>{
        const aktuelleZeit = new Date().toLocaleString();

        erstelleBestellung({
            kunde: userName + " " + userLName,
            adresse: userAdresse,
            betrag: finalPrice,
            status: 0,
            zahlung: 1,
            zeit: aktuelleZeit,
            zutaten: customBurger
        })
    }

    const isValidForm = () => {
        return userName.trim() !== '' && userAdresse.trim() !== '' && userLName.trim() !== '';
    };
    

    return (
        <motion.div initial={{ x: 300 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120 }}>
            <div>
                <h1>Ihr Burger</h1>
                <div className="row mt-4">
                    <div className="col-3 p-2">
                        <div className="shadow">
                            <Card>
                                <Card.Header as="h5">Zutaten</Card.Header>
                                <Card.Body>
                                    {jsondb.zutaten.map((zutat) => (
                                        <div key={zutat.zutat}>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>{zutat.zutat}</span>
                                                <Button variant="danger" onClick={() => addBurger(zutat)} style={{ marginLeft: "10px", paddingBlock: 0, paddingInline: "7px" }}>+</Button>
                                            </div>
                                        </div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="col-6">
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Bild</th>
                                    <th>Zutat</th>
                                    <th>Menge</th>
                                    <th>Preis</th>
                                    <th><CloseButton disabled /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customBurger.map((zutat) => (
                                    <tr key={zutat.zutat}>
                                        <td><Image src={zutat.bild} width={40} height={40}></Image></td>
                                        <td>{zutat.zutat}</td>
                                        <td>{zutat.menge}</td>
                                        <td>{zutat.preis.toFixed(2)}€</td>
                                        <td><Button className="button-sm" variant="danger" onClick={() => removeZutat(zutat)}>X</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-3 p-2">
                        <div className="shadow">
                            <Card>
                                <Card.Header as="h5">Gesamt</Card.Header>
                                <Card.Body className="text-center">
                                    <Card.Title>
                                        {calculatePreis().toFixed(2)}€
                                    </Card.Title>
                                    <Button variant="danger" onClick={bezahlen} disabled={!isValidForm()}>Zur Kasse</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                        <ListGroup className="shadow" style={{marginBottom: "100px"}}>
                            <ListGroupItem>
                                <input type="text" className="form-control mt-1 mb-1" onChange={(e) => setUserName(e.target.value)} placeholder="Vorname"/>
                                <input type="text" className="form-control mt-1 mb-1" onChange={(e) => setUserLName(e.target.value)} placeholder="Nachname"/>
                                <input type="text" className="form-control mt-1 mb-1" onChange={(e) => setUserAdresse(e.target.value)} placeholder="Adresse"/>
                            </ListGroupItem>
                        </ListGroup>
                </div>
            </div>
        </motion.div>
    )
}