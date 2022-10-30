import { useState } from "react";
import { Form, FormLabel, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NewNote = (quotes:any) => {
    const location = useLocation();
    const [noteSubject, setNoteSubject] = useState("")
    const [note, setNote] = useState("")
    const [success, setSuccess] = useState(false)
    const token:Object = jwtDecode(location.state as string)
    const userData = Object.values(token)
    const quotePost = async () => {
        await fetch (`http://localhost:8000/quote/quote_post`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": location.state as string
            },
            body: JSON.stringify({
                quote: quotes.quotes.content,
                quote_id: quotes.quotes.id,
                user_id: userData[0]
            })
        })
    };

    const quoteReq = async () => {
        await fetch(`http://localhost:8000/quote/note_quote`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                "authorization" : location.state as string
     },
            body: JSON.stringify({
                user_id: userData[0],
                quote_id: quotes.quotes.id
            })
        })
    };

    const notePost = async () => {
        await fetch("http://localhost:8000/note/create", {
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
        })
    };

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
        await quotePost();
        await notePost();
        await quoteReq();
        setTimeout(() => {
            setSuccess(true)
            window.location.reload()
        }, 300)
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