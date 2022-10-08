import { Button } from "react-bootstrap"
import logo from "../img/img.gif"
import "./diffStyles.css"
import { useLocation, useNavigate } from "react-router-dom"

const WelcomePage = () => {
    const location = useLocation()
    const navigation = useNavigate()
    return (
        <div className="center" style={{backgroundColor: "#4BB0FE"}}>
            <img src={logo} alt="K-Notes Logo"/><br />
            <h1>
            a simple way to store all of your thoughts, notes and more
            </h1>
            <h2>
               Stay motivated with K-Notes, and keep up with the daily quotes! 
            </h2>
            <Button onClick={() => navigation("/login")}>Login</Button> <Button onClick={() => navigation("/signup")}>Sign up for free</Button>
        </div>
    )
}

export default WelcomePage