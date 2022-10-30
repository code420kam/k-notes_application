import {Router, Routes} from "react-router-dom"
import React from "react";
import { render } from "@testing-library/react";
import WelcomePage from "../components/WelcomePage";
import LoginPage from "../components/LoginPage";
import Dashboard from "../components/Dashboard";
import SignUp from "../components/SignUp";
import AllNotes from "../components/AllNotes";
import NotFound from "../components/404"

describe("frontend snapshot test", () => {
    it("login page test",async () => {
         const Test = () => {
            render(
            <Routes>
            < LoginPage />            
            </Routes>
        )}
        expect(Test).toMatchSnapshot()
    })
    it("Welcome page test",async () => {
         const Test = () => {
            render(
            <Routes>
            < WelcomePage />            
            </Routes>
        )}
        expect(Test).toMatchSnapshot()
    })
    it("Dashboard test",async () => {
        const Test = () => {
           render(
           <Routes>
           < Dashboard />            
           </Routes>
       )}
       expect(Test).toMatchSnapshot()
   })
   it("Sign up Page test",async () => {
    const Test = () => {
       render(
       <Routes>
       < SignUp />            
       </Routes>
   )}
   expect(Test).toMatchSnapshot()
})
it("All notes page test",async () => {
    const Test = () => {
       render(
       <Routes>
       < AllNotes />            
       </Routes>
   )}
   expect(Test).toMatchSnapshot()
})
it("404 page test",async () => {
    const Test = () => {
       render(
       <Routes>
       < NotFound />            
       </Routes>
   )}
   expect(Test).toMatchSnapshot()
})
})