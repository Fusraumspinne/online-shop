import { Table, Spinner, Button, Card } from 'react-bootstrap'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function CustomBestellung({customBestellung}) {
    const router = useRouter();
    const { nr } = router.query;

    let status;
    switch (customBestellung.status) {
        case 0:
            status = "Eingegangen";
            break;
        case 1:
            status = "Zubereitung";
            break;
        case 2:
            status = "Unterwegs";
            break;
        case 3:
            status = "Ausgeliefert";
            break;
    }

    if(nr !== customBestellung._id){
        return(
            <div>
                <h2>Bestellnummer {nr} ist nicht vorhanden</h2>
                <Button variant='danger' onClick={() => router.push("/")}>Zur Karte</Button>
            </div>
        )
    }else{
        return (
            <div>
                <h1>Bestellstatus Ihres Customburgers</h1>
                <div className="row mt-4">
                    <div className="col-9">
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Bestell Nr.</th>
                                    <th>Kunde</th>
                                    <th>Adresse</th>
                                    <th>Uhrzeit</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{nr}</td>
                                    <td>{customBestellung.kunde}</td>
                                    <td>{customBestellung.adresse}</td>
                                    <td>{customBestellung.zeit}</td>
                                    <td>
                                    <span>{status} </span>
                                        {customBestellung.status < 3 ? (
                                            <Spinner animation='border' variant='success' size='sm' />
                                        ) : (<span>✔️</span>)}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Zutat</th>
                                    <th>Menge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customBestellung.zutaten.map((zutat)=>(
                                <tr key={zutat._id}>
                                    <td>{zutat.zutat}</td>
                                    <td>{zutat.menge}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-3 p-2">
                        <div className='shadow'>
                            <Card>
                                <Card.Header as="h5">Gesamt</Card.Header>
                                <Card.Body className='text-center'>
                                    <Card.Title>
                                        {customBestellung.betrag.toFixed(2)} EUR
                                    </Card.Title>
                                    {customBestellung.zahlung === 0 ? (
                                        <Button variant='danger disabled'>offen</Button>
                                    ) : (<Button variant='success disabled'>bezahlt</Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export async function getServerSideProps({ params }) {
    const res = await axios.get(`http://localhost:3000/api/customBestellungen/${params.nr}`);
    return {
        props: { customBestellung: res.data },
    };
}