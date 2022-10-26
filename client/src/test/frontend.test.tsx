import { Root } from "react-dom/client";
import React from "react"
import {Router, Routes} from "react-router-dom"
import {createMemoryHistory} from "history"
import { render } from "@testing-library/react";
import WelcomePage from "../components/WelcomePage";
import LoginPage from "../components/LoginPage";
import App from ".."

describe("frontend test", () => {
     const Test = () => {
        render(
        <Routes>
        < LoginPage />            

        </Routes>
    )}
    console.log(Test)
})