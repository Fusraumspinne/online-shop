import { useState } from "react";
import { useRouter } from "next/router";
import {Form, Button} from "react-bootstrap"
import axios from "axios";

export default function login(){
    const [benutzer, setBenutzer] = useState(null)
    const [passwort, setPasswort] = useState(null)
    const [error, setError] = useState(false)
    const router = useRouter()

    const login = async () =>{
        try{
            await axios.post("http://localhost:3000/api/login",{
                benutzer,
                passwort
            })
            router.push("/backend")
        }catch(error){
            setError(true)
        }
    }

    return(
        <div>
            <h1>Login</h1>
            {error && <p className="text-danger">Login fehlgeschlagen</p>}
            <div className="row mt-4">
                <Form>
                    <Form.Group className="mb-3" controlId="benutzer">
                        <Form.Control type="text" placeholder="Benutzer" onChange={(e) =>setBenutzer(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="benutzer">
                        <Form.Control type="password" placeholder="Password" onChange={(e) =>setPasswort(e.target.value)}/>
                    </Form.Group>
                    <Button variant="danger" onClick={login}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}