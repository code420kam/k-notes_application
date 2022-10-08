import { ReactComponentElement } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../img/k_notes_logo_2.png"

const NotFound = ()=> {

    const navigate = useNavigate();

    return (
      <div style={{textAlign: "center"}}>
        <h1>Error 404:</h1>
        <div>
          <h1>Page not found</h1> 
        </div>
        <Button onClick={() => navigate("/")}> Back to home </Button>
        <br /><img src={logo} alt="k-notes logo" /> 
      </div>
    );};
  
  export default NotFound;