import React, { useReducer, useEffect, useRef } from "react";
import "./styles.css";

const App = () => {
  const initialState = {
    "0": "",
    "1": "",
    "2": "",
    "3": ""
  };

  const [otpValue, setOtpValue] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef()
  ]);

  useEffect(() => {
    inputRefs.current[0].current.focus();
  }, []);

  const handleInputChange = (event, index) => {
    const maxLength = 1;
    const input = event.target;
    const value = input.value.slice(0, maxLength);

    setOtpValue({ [index]: value });

    if (value) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handleInputKeyDown = (event, index) => {
    const input = event.target;

    if (event.key === "Backspace" && input.value === "") {
      setOtpValue({ [index]: "" });

      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handleClick = () => {
    const OTP = prompt("Please enter a 4-digit dummy OTP");

    if (OTP && OTP.length !== 4) {
      alert("Invalid OTP");
    }

    if (OTP && OTP.length === 4) {
      let array = Array.from(OTP);
      array.forEach((currElement, index) => {
        setOtpValue({ [index]: OTP[index] });
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].current.focus();
        }
      });
    }
  };

  return (
    <div className="App">
      <h2>OTP Login</h2>
      <form>
        {Object.entries(otpValue).map(([key, value], index) => (
          <input
            key={key}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={value}
            ref={inputRefs.current[index]}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleInputKeyDown(e, index)}
          />
        ))}
        <h4>Entered OTP</h4>
        {Object.values(otpValue).map((value, index) => (
          <span key={index}>{value}</span>
        ))}
      </form>
      <button onClick={handleClick}>Click to autofill OTP</button>
    </div>
  );
};

export default App;
