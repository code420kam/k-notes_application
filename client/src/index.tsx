import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css';
import LoginPage from './components/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import WelcomePage from './components/WelcomePage';
import NewNote from './components/NewNote';
import AllNotes from './components/AllNotes';
import NotFound from './components/404';
// import {loginState } from "./components/LoginPage"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); 

root.render(
  <React.StrictMode> 
    <BrowserRouter>
   <Routes>
    <Route index element={<WelcomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/allnotes" element={<AllNotes />} />
    <Route path="/newnote" element={<NewNote />} />
    <Route path='*' element={<NotFound />} />
   </Routes>
    </BrowserRouter>
    </React.StrictMode>
);
