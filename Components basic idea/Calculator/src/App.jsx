import Options from './components/Options';
import Result from './components/Result';
import Labels from './components/Labels';
import Inputs from './components/Fields';
import Notification from './components/Notification';
import "./components/Calculator.css";
import { useState } from "react";

function App() {
    let operators = ["+", "-", "*", "/", "^"];

    let labels = [
        {
            textContent: "First number:"
        },
        {
            textContent: "Second number:"
        },
    ]

    let inputs = [
        {
            type: "Number",
            id: "firstNum",
            placeholder: "Enter first number..."
        },
        {
            type: "Number",
            id: "secondNum",
            placeholder: "Enter second number..."
        }
    ]

    let [result, setResult] = useState("");
    let [errorLabel, setErrorLabel] = useState(false);
    let [errorFields, setErrorField] = useState(false);
    let [notification, setNotification] = useState(false);

    function calculation(event) {
        event.preventDefault();
        let firstNum = document.getElementById("firstNum").value;
        let operator = document.getElementById("operator").value;
        let secondNum = document.getElementById("secondNum").value;
        if ((firstNum.length > 15 || !firstNum) || (secondNum.length > 15 || !secondNum)) {
            setErrorLabel(error => error = true);
            setErrorField(error => error = true);
            setNotification(error => error = true);
            return;
        } else {
            setErrorLabel(error => error = false);
            setErrorField(error => error = false);
            setNotification(error => error = false);
        }
        switch (operator) {
            case "+":
                setResult(result => result = Number(firstNum) + Number(secondNum));
                break;
            case "-":
                setResult(result => result = Number(firstNum) - Number(secondNum));
                break;
            case "/":
                setResult(result => result = Number(firstNum) / Number(secondNum));
                break;
            case "*":
                setResult(result => result = Number(firstNum) * Number(secondNum));
                break;
            case "^":
                setResult(result => result = Math.pow(Number(firstNum), Number(secondNum)));
                break;
        }
        document.getElementById("firstNum").value = "";
        document.getElementById("secondNum").value = "";
    }

    return (
        <>
            <Notification notify={notification}/>
            <div className="container">
                <h2>Calculator</h2>
                <Labels label={labels[0]} isError={errorLabel} />
                <Inputs input={inputs[0]} isError={errorFields} />
                <label>Select operator</label>
                <select id="operator">
                    <Options option={operators[0]} />
                    <Options option={operators[1]} />
                    <Options option={operators[2]} />
                    <Options option={operators[3]} />
                    <Options option={operators[4]} />
                </select>
                <Labels label={labels[1]} isError={errorLabel} />
                <Inputs input={inputs[1]} isError={errorFields} />
                <label>Result:</label>
                <Result result={result} />
                <button onClick={calculation}>Calculate</button>
            </div>
        </>
    )
}

export default App
