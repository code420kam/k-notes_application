import { useState } from "react";
import { Form, FormLabel, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NewNote = () => {
    const location = useLocation();
    const [noteSubject, setNoteSubject] = useState("")
    const [note, setNote] = useState("")
    const [success, setSuccess] = useState(false)
    const token:Object = jwtDecode(location.state as string)
    const userData = Object.values(token)
    const options= {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "authorization" : location.state as string
 },
        body: JSON.stringify({
            subject: noteSubject,
            note: note,
            user_id: userData[0]
        })
    }
    const handleChangeNote= (event:any):void => {
        event.preventDefault()
        setNote(event.target.value)
    }
    const handleChangeSubject= (event:any):void => {
        event.preventDefault()
        setNoteSubject(event.target.value)
    }
    const handleClick= async (e:any):Promise<void> => {
        e.preventDefault()
        await fetch("http://localhost:8000/note/create", options)
        .then(res => {
            res.json()
            setTimeout(() => {
                window.location.reload()
            },100)
            setSuccess(true)})
    }

    return(
        <div>
            <Form>
            <FormLabel> New Note<br />
            <Form.Control 
            onChange={handleChangeSubject}
            value={noteSubject}
            placeholder="Enter a subject..."/>
            <textarea 
            onChange={handleChangeNote}
            value={note}
            placeholder="Enter your thoughts..."/>
            <Button type="submit" disabled={!note || !noteSubject} onClick={handleClick}>Submit</Button>
            {success && <p className="alert alert-success">&#x2713; Note added successful</p>}
            </FormLabel>
            </Form>
        </div>
    )
}

export default NewNote;