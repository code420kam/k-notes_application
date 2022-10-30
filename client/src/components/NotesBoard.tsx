import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./diffStyles.css"
import Collapsible from 'react-collapsible';

const NotesBoard = () => {
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const [notes, setNotes] = useState(Array)
    const decode:Object = jwtDecode(location.state as string)
    const userId = Object.values(decode)
    const options = {
        method: "GET",
        headers: {
            "authorization": location.state as string,
            "Content-Type": "application/json"
        }
    }

    useEffect(() => {
        fetch(`http://localhost:8000/note/${userId[0]}`, options).then(res => {
            if(res.ok){
                return res.json()
            }})
        .then(res => {
            setNotes(res)
            setLoading(false)
            if(notes.length === 0){
                setLoading(true)
            }
        })
    }, [])
        return(
            <div>
                <h1>Notes</h1>
                <div>{notes.map((note: any)=>{
                    return (
                    <li key={note.note_id} style={{fontWeight:"bolder", color:"#0dcaf0"}}><Collapsible trigger={note.subject}>
                        <p>{note.note}</p>
                        </Collapsible></li>
                        )}
                    )}
                </div>
            </div>
        )
   
    }

export default NotesBoard;