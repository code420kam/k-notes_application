import { useEffect, useState } from 'react';
import DatePicker, {Calendar} from 'react-multi-date-picker'; 
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import "./calendar.css";

const Calendary = () => {
    type Data = {
        note_id:number,
        subject: string,
        note: string,
        user_id: number,
        date: number
    }
    const location = useLocation();
    const decode:Object = jwtDecode(location.state as string)
    const userId = Object.values(decode)
    const [date, setDate] = useState([]);

    const options = {
        method: "GET",
        url: `http://localhost:8000/note/${userId[0]}`,
        headers: {
            "authorization": location.state as string,
            "Content-Type": "application/json"
        }
    }
    
    useEffect(() => {
        axios.request(options).then(function(response){
            setDate(response.data)
        })},[])

        const dateRange = date.map((data:Data, index):Date => {
         return new Date(data.date*1)
        })

    return(
        <div>
            <h1>Calendar</h1>
            <div style={{marginLeft:"30%"}}>
            <Calendar className='customCalendar' multiple value={dateRange} readOnly />
            </div>
        </div>
    )}
export default Calendary