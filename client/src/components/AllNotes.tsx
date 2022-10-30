import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./diffStyles.css";
import deleteLogo from "../img/delete.png";
import Collapsible from 'react-collapsible';
import UpdatePopup from "./UpdatePopup";

const AllNotes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [notes, setNotes] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [authenticate, setAuthenticate] = useState(location.state as string)
    const token:Object = jwtDecode(location.state as string)
    const userData = Object.values(token)
    const user_id = userData[0]
    
    useEffect(() => {
        const options= {
            method: "GET",
            url: `http://localhost:8000/note/${userData[0]}`,
            headers:{
                "authorization": location.state as string
            }
        }
        axios.request(options).then(function(response){
            setNotes(response.data)
        })
    },[])
    
    function dateConverter(date: number):Date{
        const data =  new Date(date*1)
        return data
    }

    const handleClickLogout= () => {
      window.history.replaceState({}, document.title)
      navigate("/")
    }
    
    const deleteQuote = (note_id:any) => {
               fetch(`http://localhost:8000/note/delete`, {
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json",
                    "authorization" : location.state as string
                },
                body:  JSON.stringify({
                    user_id: user_id,
                    note_id: note_id
                })}).then((resp => {
                    if(resp.status === 200){
                        setDeleted(true)
                        setTimeout(() => {
                            window.location.reload();
                        },500)
                    }
                }))
            }

    if(authenticate){
    return (
        <div className="allNotesContainer"style={{textAlign:"center"}}>
        <h1 className="headline">All Notes!</h1>
    <div className="logoutBtn">
        <Button style={{fontWeight: "bolder", padding: "-80%"}} onClick={handleClickLogout} >
                Logout
                    </Button>
    </div>
    <div className="allNotes">
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Subject</th>
      <th scope="col">Date</th>
      <th scope="col">Details</th>
    </tr>
  </thead>
  <tbody>
      {notes.map((desNote: any, index) => {
        const {note_id, note, subject, date} = desNote
        return(
            <tr key={note_id}>
                <th scope="row" >{index+1}</th>
                <td>{subject}</td>
                <td>{dateConverter(date).toLocaleDateString("en")}</td>
                <td>
                <Collapsible key={note_id} trigger={<Dropdown><Dropdown.Toggle key={note_id} style={{fontWeight: "bolder"}} variant="info">Details</Dropdown.Toggle></Dropdown>}>
                    <p>{note}</p>
                    <UpdatePopup note_id={note_id}
                    index={index}
                    note={note}
                    subject={subject} 
                    date={date}
                    />
                    <span onClick={() => deleteQuote(note.note_id)}><img src={deleteLogo} alt="delete logo" /></span>
                    {deleted && <p className="alert alert-success">&#x2713; Successful deleted</p>}
                   </Collapsible>
                </td>
            </tr>
        )
      })}
  </tbody>
</table>
    </div>
    <span className="backBtn">
      <Button type="submit" style={{fontWeight: "bolder"}} variant="info" onClick={()=>navigate("/dashboard", {state: location.state})}>Back to Dashboard</Button>
    </span>
    </div>)
    }
    else
    return <Navigate replace to="/login" />
}

export default AllNotes;