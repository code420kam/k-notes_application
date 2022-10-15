import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import editLogo from "../img/edit.png"
import jwtDecode from "jwt-decode";
import {useLocation} from "react-router-dom";
import axios from "axios";

const UpdatePopup = ( {note_id, note, index, subject, date} : {note_id: any, note: any, index: number, subject: any, date: any} ) => {
 
    const location = useLocation()
    const [popup, setPopup] = useState(false);
    const [updateNote, setUpdateNote] = useState();
    const [updateSubject, setUpdateSubject] = useState();
    const [quote, setQuote] = useState();
    const token:Object = jwtDecode(location.state as string)
    const userData = Object.values(token)
    let val;
    const handleChangeSbjt = (ev: any):void => {
        setUpdateSubject(ev.target.value)
    }
    const handleChangeNote = (ev: any):void => {
        setUpdateNote(ev.target.value)
    }
    const getQuoteID = async (node_id:number):Promise<void> =>{
        await fetch(`http://localhost:8000/quote/single/${note_id}`, {
           method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state as string
            }
    }).then((res) => {
       return res.json()}).then((resSon) => {
        console.log("QQ" + JSON.stringify(resSon))
        setQuote(resSon[0].quote)
    })
            
    }
    // const tt = getQuoteID(note_id)
    useEffect(() => {
     getQuoteID(note_id)
     
    },[popup])

    const updateRequest = () => {
        fetch(`http://localhost:8000/note/update/${note_id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
            "authorization": location.state as string
        },
        body: JSON.stringify({
            subject: updateSubject, 
            note: updateNote,
            user_id: userData[0]
        })
    })
    .then(function(response){
        window.location.reload()
    })
    }
    
    const handleSubmit = async (note_id:number):Promise<void> => {
        setPopup(current => !current)
        console.log(userData[0])
        if (updateSubject === undefined){
            return setUpdateSubject(subject)
        }
        if(updateNote === undefined){
            return setUpdateNote(note);
        }
         
    await updateRequest()
}
  
    return(
        <div>
            <span><img src={editLogo} alt="edit logo" onClick={()=>setPopup(current => !current)}></img></span>
            <Modal  show={popup} onHide={() =>  setPopup(current => !current)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Update your Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mp-3">
                            <Form.Label>Origin Quote</Form.Label>
                            <Form.Control type="text" value={quote} readOnly></Form.Control>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control defaultValue={subject} onChange={handleChangeSbjt} type="text" placeholder={subject} autoFocus/>
                            <Form.Label>Note</Form.Label>
                            <Form.Control onChange={handleChangeNote} type="text" placeholder={note} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type="submit" variant="primary" onClick={() => handleSubmit(note_id)}> Save Changes</Button>
                    <Button variant="secondary" onClick={()=>setPopup(current => !current)}>
                    Close
                    </Button>
                    </Modal.Footer>
                    </Modal>
        </div>
    )}

export default UpdatePopup