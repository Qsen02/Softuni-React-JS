import Options from './components/Options';
import "./components/Calculator.css"

function App() {
    let operators = ["+", "-", "*", "/", "^"];
    function calculation(event) {
        event.preventDefault();
        let resultRef = document.getElementById("result");
        let firstNum = Number(document.getElementById("firstNum").value);
        let operator = document.getElementById("operator").value;
        let secondNum = Number(document.getElementById("secondNum").value);
        let result="";
        switch (operator) {
            case "+":
                result = firstNum + secondNum;
                break;
            case "-":
                result = firstNum - secondNum;
                break;
            case "/":
                result = firstNum / secondNum;
                break;
            case "*":
                result = firstNum * secondNum;
                break;
            case "^":
                result = Math.pow(firstNum,secondNum);
                break;
        }
        resultRef.textContent=result;
    }

    return (
        <>
            <div className="container">
                <h2>Calculator</h2>
                <label>First number:</label>
                <input type="number" id="firstNum" placeholder="Enter first number..." />
                <label>Select operator</label>
                <select id="operator">
                    <Options option={operators[0]} />
                    <Options option={operators[1]} />
                    <Options option={operators[2]} />
                    <Options option={operators[3]} />
                    <Options option={operators[4]} />
                </select>
                <label>Second number:</label>
                <input type="number" id="secondNum" placeholder="Enter second number..." />
                <label>Result:</label>
                <div id="result"></div>
                <button onClick={calculation}>Calculate</button>
            </div>
        </>
    )
}

export default App
