import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Page from "./components/Page";
import "./css/page.css";

export default function App() {
    return (
        <Router>
            <Page/>
        </Router>
    );
}
