import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "../index.css";
import { CompletedState } from "./completedstate.tsx";

// Step 1: Define prop types for the component
interface CardDetails {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

interface InputFormProps {
  details: CardDetails;
  setDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
}

interface ErrorState {
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;
}

const InputForm: React.FC<InputFormProps>= ({ details, setDetails }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorState>({});

  //Step 2: Strongly type event parameters

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "month" || name === "year") {
      setDetails((prev) => {
        const month = name === "month" ? value : prev.expiry.split("/")[0];
        const year = name === "year" ? value : prev.expiry.split("/")[1] || "";
        return {
          ...prev,
          expiry: `${month}/${year}`,
        };
      });
    } else {
      setDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
//Type the form validation function
  const validateForm = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: ErrorState = {};
    const rawNumber = details.number.replace(/\s/g, "");

    if (!details.name.trim()) {
      newErrors.name = "Can't be blank";
    }
    if (/[a-zA-Z]/.test(details.number)) {
      // Case: letters present in original input
      newErrors.number = "Wrong format,numbers only";
    } else if (rawNumber.length !== 16) {
      // Case: not 16 digits
      newErrors.number = "Card number must be 16 digits";
    }
    if (!/^\d{2}\/\d{2}$/.test(details.expiry)) {
      newErrors.expiry = "Can't be blank";
    }
    if (!/^\d{3}$/.test(details.cvc)) {
      newErrors.cvc = "Can't be blank";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // If no errors, proceed to submit
    setIsSubmitted(true);
  };

  return (
    <form className="form" autoComplete="on" >
      {isSubmitted ? (
        <CompletedState setDetails={setDetails} setErrors={setErrors} setIsSubmitted={setIsSubmitted} />
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="cardholder-name" className="label">
              CARDHOLDER NAME
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g Jane Appleseed"
              value={details.name}
              autoComplete="on"
              onChange={handleChange}
              className= {`input ${errors.name ? "error" : ""}`}
              id="cardholder-name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="card-number"> CARD NUMBER</label>
            <input
              type="text"
              name="number"
              placeholder="e.g 1234 5678 9123 0000"
              value={details.number}
              onChange={handleChange}
              className={`input ${errors.number ? "error" : ""}`}
              maxLength={19}
              id="card-number"
            />
            {errors.number && <span className="error-message">{errors.number}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="Exp-date">EXP. DATE (MM/YY)</label>
              <div className="exp-date-wrapper">
                <input
                  type="text"
                  name="month"
                  placeholder="MM"
                  maxLength={2}
                  value={details.expiry.split("/")[0] || ""}
                  onChange={handleChange}
                  className={`input ${errors.expiry ? "error" : ""}`}
                  id="Exp-date"
                />
                <input
                  type="text"
                  name="year"
                  placeholder="YY"
                  maxLength={2}
                  value={details.expiry.split("/")[1] || ""}
                  onChange={handleChange}
                  className= {`input ${errors.expiry ? "error" : ""}`}
                  id="Exp-date-year"
                />
              </div>
              {errors.expiry && <span className="error-message">{errors.expiry}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cvc">CVC</label>
              <input
                type="text"
                name="cvc"
                placeholder="eg.123"
                value={details.cvc}
                onChange={handleChange}
                className= {`input ${errors.cvc ? "error" : ""}`}
                maxLength={3}
                id="cvc"
              />
              {errors.cvc && <span className="error-message">{errors.cvc}</span>}
            </div>
          </div>
          <button
            type="submit"
            id="submit-btn"
            onClick= {validateForm}
          >
            Confirm
          </button>
        </>
      )}
    </form>
  );
};

export default InputForm;
