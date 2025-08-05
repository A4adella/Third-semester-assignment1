// src/App.jsx
import React, { useState } from "react";
import InputForm from "./components/inputform.tsx";
import CardDisplay from "./components/carddisplay.tsx";
import { CompletedState } from "./components/completedstate.tsx";
import "./index.css";
import "./App.css"; 

function App() {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    cvc: "",
    expiry: "",
  });

  return (
    <main className="container">
      <div className="card-display"><CardDisplay details={cardDetails} /></div>
      <div className="form-section"> <InputForm details={cardDetails} setDetails={setCardDetails} /></div>
     
    </main>
  );
}

export default App;



