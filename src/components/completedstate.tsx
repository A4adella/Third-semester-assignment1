import React from "react";

type DetailsType = {
  name: string;
  number: string;
  cvc: string;
  expiry: string;
};

interface ErrorState {
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;
}

type CompletedStateProps = {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
  setDetails: React.Dispatch<React.SetStateAction<DetailsType>>;
};


export const CompletedState: React.FC<CompletedStateProps> = ({ setIsSubmitted, setErrors, setDetails }) => {
  const handleReset = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDetails({
      name: "",
      number: "",
      cvc: "",
      expiry: "",
    });
    setIsSubmitted(false)
    setErrors({})
  };

  return (
    <div className="completed-state">
      <img src="/images/icon-complete.svg" alt="complete" />
      <h2 id="completedstate-heading">THANK YOU!</h2>
      <p id="completedstate-txt">We've added your card details</p>
      <button
        onClick={handleReset}
        className="reset-button"
        style={{
          marginTop: "20px",
          backgroundColor: "hsl(278, 68%, 11%)",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Continue
      </button>
    </div>
  );
};
