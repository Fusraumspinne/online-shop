import { Table, CloseButton, Button, Card, ListGroupItem, ListGroup, Form } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {loescheProdukt, leeren } from "../redux/warenkorbSlice"
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {motion} from "framer-motion"

export default function Warenkorb() {
  const dispatch = useDispatch()
  const warenkorb = useSelector((state) => state.warenkorb)
  const router = useRouter()

  const [userName, setUserName] = useState('');
  const [userLName, setUserLName] = useState('');
  const [userAdresse, setUserAdresse] = useState('');

  let aktuelleBoxen = 1;
  let aktuelleMegaBoxen = 0;

  const [penisBox, setPenisBox] = useState(0)
  const [penisMegaBox, setPenisMegaBox] = useState(0)

  const [lieferkostenFinal, setLieferKostenFinal] = useState(0)

  const erstelleBestellung = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/bestellungen", data);
      if (res.status === 201){
        dispatch(leeren());
        router.push(`/bestellungen/${res.data._id}`);
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
      betrag: warenkorb.gesamtBetrag + lieferkostenFinal,
      status: 0,
      zahlung: 1,
      zeit: aktuelleZeit,
      produkte: warenkorb.produkte.map((produkt) =>(
        {
          name: produkt.name, menge: produkt.menge, extras:
          produkt.extras.map(extra => (extra.text))
        }
      )),
    })
  }

  const entfernen = (produkt) =>{
    dispatch(loescheProdukt(produkt))
    toast.error(produkt.name + " wurde entfernt!",{
      position: "top-center",
      autoClose: 3000
    })
  }

  const lieferkosten = () => {
    let boxX = 30;
    let boxY = 30;
    let boxZ = 30;

    let lastHeight = 0;

    warenkorb.produkte.map((produkt) => {
      for (let i = 0; i < produkt.menge; i++) {
        if(produkt.y > 30 || produkt.x > 30 || produkt.z > 30){
          aktuelleMegaBoxen++
        }else if (produkt.x <= boxX && produkt.z <= boxZ && produkt.y <= boxY) {
          boxX -= produkt.x;
          boxZ -= produkt.x
  
          if(lastHeight < produkt.y){
            lastHeight = produkt.y
          }

        }else{
          boxX = 30
          boxZ = 30
          boxY -= lastHeight
          lastHeight = 0

          if(produkt.y <= boxY){
            boxX -= produkt.x;
            boxZ -= produkt.x
    
            if(lastHeight < produkt.y){
              lastHeight = produkt.y
            }
          }
          else{
            aktuelleBoxen++
            boxX = 30
            boxY = 30
            boxZ = 30
  
            boxX -= produkt.x;
            boxZ -= produkt.x
  
            if(lastHeight < produkt.y){
              lastHeight = produkt.y
            }
          }
        }
      }
    });  
    setLieferKostenFinal(aktuelleBoxen * 2 + aktuelleMegaBoxen * 6)
    setPenisBox(aktuelleBoxen)
    setPenisMegaBox(aktuelleMegaBoxen)
  };
  useEffect(() => {
      lieferkosten();
  });


  const isValidForm = () => {
    return userName.trim() !== '' && userAdresse.trim() !== '' && userLName.trim() !== '';
  };

    return (
    <motion.div initial={{y: -300}} animate={{y:0}} transition={{type: "spring", stiffness:120}}>
      {warenkorb.warenkorbAnzahl === 0 ? (
          <h2>Der Warenkorb ist leer!</h2>
        ) : (
        <div>
          <h1>Warenkorb</h1>
          <div className="row mt-4">
            <div className="col-9">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Bild</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Menge</th>
                    <th>Betrag</th>
                    <th><CloseButton disabled/></th>
                  </tr>
                </thead>
                <tbody>
                  {warenkorb.produkte.map((produkt) =>(
                    <tr key={produkt._id}>
                      <td>
                        <Image src={produkt.bild} alt={produkt.name} width={50} height={50}/>
                      </td>
                      <td>
                        <Link legacyBehavior href={`/produkte/${produkt.url}`}>
                          <a className="text-danger">
                            {produkt.name}
                          </a>
                        </Link>
                      </td>
                      <td>
                        {produkt.extras.map(extra =>(
                          <span key={extra._id}>{extra.text}</span>
                        ))}
                      </td>
                      <td>{produkt.menge}</td>
                      <td>{(produkt.preis * produkt.menge).toFixed(2)}</td>
                      <td><Button className="button-sm" variant="danger" onClick={() => entfernen(produkt)}>X</Button></td>
                    </tr>
                  ))}

                </tbody>
              </Table>
              <ListGroup className="shadow">
                <ListGroupItem>
                    <input type="text" className="form-control mt-1 mb-1" onChange={(e) => setUserName(e.target.value)} placeholder="Vorname"/>
                    <input type="text" className="form-control mt-1 mb-1" onChange={(e) => setUserLName(e.target.value)} placeholder="Nachname"/>
                    <input type="text" className="form-control mt-1 mb-1" onChange={(e) => setUserAdresse(e.target.value)} placeholder="Adresse"/>
                  </ListGroupItem>
              </ListGroup>
            </div>
            <div className="col-3 p-2">
              <div className="shadow">
                <Card>
                  <Card.Header as="h5">Gesamt</Card.Header>
                  <Card.Body className="text-center">
                    <Card.Title>
                    <div style={{fontSize:"15px"}}>Lieferkosten: {lieferkostenFinal.toFixed(2)}</div> <br/>
                    <div style={{fontSize:"15px"}}>kleine Boxen: {penisBox}</div> <br/>
                    <div style={{fontSize:"15px"}}>große Boxen: {penisMegaBox}</div> <br/>
                    {(warenkorb.gesamtBetrag + lieferkostenFinal).toFixed(2)}€
                    </Card.Title>
                    <Button variant="danger" onClick={bezahlen} disabled={!isValidForm()}>Zur Kasse</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
        )}
      </motion.div>
    )
} 