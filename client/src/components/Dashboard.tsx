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
    const singleQuote = Object.values(quotes)[2] as string
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
        params:{language_code: "de"},
        headers: {
          'X-RapidAPI-Key': quoteAPI,
          'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
      };
      const quoteOptions= {
        method:"POST",
        // url:`http://localhost:8000/quote/quote_post`,
        headers: {
            "Content-Type":"application/json",
            "authorization" : location.state as string
 },
        body: JSON.stringify({
            quote: quotes.content,
            quote_id: quotes.id,
            user_id: userData[0]
        })
    }
    
      axios.request(options).then(function (response) {
          setQuotes(response.data)
          setLoading(false)
          fetch(`http://localhost:8000/quote/quote_post`, quoteOptions)
      }).catch(function (error) {
      });
      console.log(quotes)
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
              {newNote && (<NewNote />)}
                </span>
                <p>
                <TwitterShareButton title={singleQuote} url="http://localhost:3000">
                <TwitterIcon round={true} size={36}/>
            </TwitterShareButton>
              <WhatsappShareButton title={singleQuote} url={"http://localhost:3000"}>
                <WhatsappIcon round={true} size={36}/>
              </WhatsappShareButton>
              {/* Facebook share is not working, because of facebooks api removed the option. Maybe later it will be available.
                Because of that I will let this part of code stay here*/}
              <FacebookShareButton quote={singleQuote} url={"http://www.localhost:3000"}>
                <FacebookIcon round={true} size={36}/> 
              </FacebookShareButton>
              <RedditShareButton title={singleQuote} url="http://www.localhost:3000">
                <RedditIcon round={true} size={36} />
              </RedditShareButton>
              <TelegramShareButton title={singleQuote} url="http://www.localhost:3000">
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