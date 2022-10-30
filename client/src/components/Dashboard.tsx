import { useEffect, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./diffStyles.css"
import audioLogo from "../img/audio.png"
import logo from "../img/k_notes_logo_2.png"
import { Button} from "react-bootstrap";
import NotesBoard from "./NotesBoard";
import Calendary from "./Calendar";
import axios from "axios"
import NewNote from "./NewNote";
import jwtDecode from "jwt-decode";
import speech from "../actions/speech"
import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon,
    TelegramShareButton, TelegramIcon} from "react-share/lib";

const Dashboard = () => {
    //useLocation for public token
    const navigate = useNavigate()
    const location = useLocation()
    const [logout, setLogout] = useState(false)
    const [authenticate, setAuthenticate] = useState(location.state as string)
    const [quotes, setQuotes] = useState(Object)
    const [newNote, setNewNote] = useState(false);
    const token:Object = jwtDecode(location.state as string)
    const userData = Object.values(token)
    const [refreshBtn, setRefreshBtn] = useState(0)
    const [loading, setLoading] = useState(true)
    const quoteAPI = process.env.REACT_APP_QUOTEAPI as string

    const handleClick = () => {
        setNewNote(current => !current);
    }

    const handleClickLogout= () => {
        window.history.replaceState({}, document.title)
        navigate("/")
      }
   
    useEffect(() => 
    {
    const options = {
        method: 'GET',
        url: 'https://quotes15.p.rapidapi.com/quotes/random/',
        params:{language_code: "en"},
        headers: {
          'X-RapidAPI-Key': quoteAPI,
          'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
      };
  
      axios.request(options).then(function (response) {
          setQuotes(response.data)
          setLoading(false)
      }).catch(function (error) {
      });
    },[refreshBtn, logout])
    if(authenticate){
      return (
            <div className="center">
                <span className="head">
               <img src={logo} alt="k-notes logo"/>
               <Button className="logout" style={{fontWeight: "bolder"}} onClick={handleClickLogout}>
                Logout
                </Button>
               <br />
              {
                loading ? (<p>Loading...</p>) : (<p style={{fontSize:"2.6vh", width:"80%", margin: "auto"}}>
                    {quotes.content} 
                    </p>)
              }
             <Button type="button" onClick={() => setRefreshBtn(refreshBtn + 1)}>Refresh</Button> 
              <img src={audioLogo} alt="voice output" onClick={() => speech(quotes.content)} />
             <Button onClick={handleClick}>Create Note</Button>
              {newNote && (<NewNote quotes={quotes}/>)}
                </span>
                <p>
                <TwitterShareButton title={quotes.content} url="http://localhost:3000">
                <TwitterIcon round={true} size={36}/>
            </TwitterShareButton>
              <WhatsappShareButton title={quotes.content} url={"http://localhost:3000"}>
                <WhatsappIcon round={true} size={36}/>
              </WhatsappShareButton>
              {/* Facebook share is not working, because of facebooks api removed the option. Maybe later it will be available.
                Because of that I will let this part of code stay here*/}
              <FacebookShareButton quote={quotes.content} url={"http://www.localhost:3000"}>
                <FacebookIcon round={true} size={36}/> 
              </FacebookShareButton>
              <RedditShareButton title={quotes.content} url="http://www.localhost:3000">
                <RedditIcon round={true} size={36} />
              </RedditShareButton>
              <TelegramShareButton title={quotes.content} url="http://www.localhost:3000">
                <TelegramIcon round={true} size={36} />
              </TelegramShareButton>
                </p>
               <div className="parent">
            <div className="quotesArea">
            <NotesBoard />
            <Button className="btn-info" style={{fontWeight: "bolder"}} onClick={() => navigate("/allnotes",{state: location.state})}>All Notes</Button>
            </div>
            <div className="calendarArea">
            <Calendary />
            </div>
               </div> 
            </div>
        )
    }
    else
    return <Navigate replace to="/login" />
}

export default Dashboard