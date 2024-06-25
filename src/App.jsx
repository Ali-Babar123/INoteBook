import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./MyComponents/Navbar";
import Home from "./MyComponents/Home";
import About from "./MyComponents/About";
import NoteState from "./context/NoteState";
import Services from "./MyComponents/Services";
import Product from "./MyComponents/Product";
import Alert from "./MyComponents/Alert";
import Login from "./MyComponents/Login";
import SignUp from "./MyComponents/SignUp";


const App = () => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type)=>{
    setAlert({
        msg: message,
        tp: type
    })
    setTimeout(()=>{
     setAlert(null);
    }, 2000)
    }
    return (
        <NoteState>
            <Router>
                <Navbar />
                <Alert alert={alert}/>
                <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home showAlert={showAlert}/>} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/services" element={<Services/>}/>
                    <Route exact path="/products" element={<Product/>}></Route>
                    <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
                    <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>}></Route>
                </Routes>
                </div>
            </Router>
        </NoteState>
      
    );
}

export default App;
