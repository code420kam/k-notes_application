import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import editLogo from "../img/edit.png"
import jwtDecode from "jwt-decode";
import {useLocation} from "react-router-dom";

const UpdatePopup = ( {note_id, note, index, subject, date} : {note_id: any, note: any, index: number, subject: any, date: any} ) => {
 
    const location = useLocation()
    const [popup, setPopup] = useState(false);
    const [updateNote, setUpdateNote] = useState();
    const [updateSubject, setUpdateSubject] = useState();
    const token:Object = jwtDecode(location.state as string)
    const userData = Object.values(token)
    const handleChangeSbjt = (ev: any):void => {
        setUpdateSubject(ev.target.value)
    }
    const handleChangeNote = (ev: any):void => {
        setUpdateNote(ev.target.value)
    }

    
    const handleSubmit = (note_id:number):void => {
        setPopup(current => !current)
        console.log(userData[0])
        if (updateSubject === undefined){
            return setUpdateSubject(subject)
        }
        if(updateNote === undefined){
            return setUpdateNote(note);
        }
         
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