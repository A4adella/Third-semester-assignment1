
import React from "react";
import { type CardDetails } from "../types.ts";
import "../index.css"; 

type CardDisplayProps = {
  details: CardDetails;
};
const CardDisplay: React.FC<CardDisplayProps> = ({ details }) => {
  return (
    
    <div className="card-wrapper">
  {/* Front of the card */}
  <div className="card front">
    <img src="../images/card-logo.svg" alt="card-logo" id="card-logo" />
    <div className="card-number">{details.number || "0000 0000 0000 0000"}</div>
    <div className="card-name">{details.name || "JANE APPLESEED"}</div>
    <div className="card-expiry">{details.expiry || "00/00"}</div>
  </div>

  {/* Back of the card */}
  <div className="card back">
    <div className="card-cvc">{details.cvc || "000"}</div>
  </div>
</div>

  );
};

export default CardDisplay;
