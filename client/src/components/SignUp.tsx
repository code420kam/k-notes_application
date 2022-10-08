import logo from "../img/k_notes_logo_2.png"
import { Button, Form } from "react-bootstrap"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [sPassword, setSPassword] = useState("");
    const [message, setMessage] = useState("");
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
    function checkPassword():Boolean{
        if(password === sPassword){
            return false
        }
        return true
    }
    function sendForm (e:any):void {
        e.preventDefault()
     
     fetch("http://localhost:8000/user/create", requestOptions)
    .then(res => {
        if(res.ok){
            return res.json()
        }
    }).then(res => {
        navigate("/login")
        window.alert("Account successfull created. Please Login")
    }) 
    }
    return(
        <div className="center">
            <img src={logo} alt="k_notes_logo"/>

            <Form id="signup-form" onSubmit={(e) => sendForm(e)}>
      <Form.Group className="mb-4 w-25" style={{fontWeight: "bolder", margin:"auto"}}  >
        <Form.Label></Form.Label>
        Enter a username
        <h2>Was geht ab </h2>
        <Form.Control type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="min 5 char" required/>
        Enter a password
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="min 5 char" required/>
        Reenter previous password
        <Form.Control type="password" value={sPassword} onChange={(e) => setSPassword(e.target.value)} placeholder="min 5 char" required/>
        <div>{
            checkPassword() && <div className="alert alert-danger" role="alert">
            Wrong Username or Password. Please try again.. </div>
        }</div>
        <Button disabled={password.length < 5 || sPassword.length <5 || username.length < 5} type="submit" variant="success">Create Account</Button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </Form.Group>
        </Form>
        </div>
    )
}

export default SignUp;