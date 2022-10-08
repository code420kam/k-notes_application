import { Button, Form } from "react-bootstrap"
import "./diffStyles.css"
import logo from "../img/k_notes_logo_2.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [username, setUsername] = useState(String);
    const [password, setPassword] = useState();
    const [loginState, setLoginState] = useState(Boolean)
    const navigate = useNavigate();
    const handleChangeUser = (event:any) => {
        setUsername(event.target.value)
        
    }
    const handleChangePw = (event:any) => {
        setPassword(event.target.value)
    }

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
   
    const login =async (e:any):Promise<void|undefined> => {
        e.preventDefault()
        try {
            await fetch("http://localhost:8000/user/login",requestOptions).then(res => {
                if(res.ok){
                    console.log("status" + res.status)
                    const test = res.text()
                    test.then((res) => {
                            navigate("/dashboard", {replace: true, state: res})
                            return test
                        })
        }
        else if(res.status === 401){
           return setLoginState(true)
        }})
        } catch (error) {
            return window.alert("Server connection failed...")
        }
    }
    
    return (
        <div className="center">
            <img src={logo} alt="k_notes_logo"/> 
        <Form id="loginForm">
      <Form.Group className="mb-4 w-25" style={{fontWeight: "bolder", margin:"auto"}}  >
        <Form.Label></Form.Label>
        <Form.Control type="username" id="username" onChange={handleChangeUser} placeholder="Enter username" />
        <Form.Control type="password"  id="password" onChange={handleChangePw} placeholder="Enter password" required/>
        <Button variant="primary" onClick={login}>Login</Button> <Button variant="secondary" onClick={() => navigate("/signup")}>Create Account</Button>
      </Form.Group>
        </Form>
        <div>
        {
            loginState && <div className="alert alert-danger" role="alert">
            Wrong Username or Password. Please try again.. </div>
        }
        </div>
        </div>
    )
}
export default LoginPage;