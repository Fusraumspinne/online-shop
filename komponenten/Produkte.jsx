import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";

export default function Produkte({ produkte }) {
  const [filter, setFilter] = useState("");

  const resetFilter = () =>{
    setFilter("")
  }

  return (
    <div>
      <div className="row mt-4">
        <div className="col-9">
          <input
            className="form-control mt-3 mb-3"
            type="text"
            placeholder="Suchen"
            value={filter}
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
        </div>
        <div className="col-3">
          <Button className="form-control mt-3 mb-3" variant="danger" onClick={resetFilter}>X</Button>
        </div>
      </div>
      <div className="shadow row row-cols-3">
        {produkte
          .filter((produkt) =>
            produkt.kategorie.toLowerCase().includes(filter)
          )
          .map((produkt) => (
            <div key={produkt.name} className="mt-3 col">
              <Card>
                <Link href={`/produkte/${produkt.url}`} passHref>
                  <Card.Img variant="top" src={produkt.bild} />
                </Link>
              </Card>
              <Card.Body>
                <Card.Title>
                  {produkt.name} {produkt.preis.toFixed(2)}€
                </Card.Title>
                <Card.Text>{produkt.beschreibung}</Card.Text>
                <Link href={`/produkte/${produkt.url}`} passHref>
                  <Button
                    className="mb-2"
                    style={{ marginRight: "10px" }}
                    variant="danger"
                  >
                    Bestellen
                  </Button>
                </Link>
                <Link href={`/sandbox/`} passHref>
                  {produkt.kategorie === "burger" ? (
                    <Button className="mb-2" variant="danger">
                      Erstellen sie ihren Burger
                    </Button>
                  ) : (
                    <Button
                      className="mb-2"
                      variant="danger"
                      style={{ display: "none" }}
                    >
                      Erstellen sie ihren Burger
                    </Button>
                  )}
                </Link>
              </Card.Body>
            </div>
          ))}
      </div>
      <br />
      <br />
    </div>
  );
}
