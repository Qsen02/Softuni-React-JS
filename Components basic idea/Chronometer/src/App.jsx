import "./styles/style.css";
import Display from "./components/Display";
import StartBtn from "./components/StartBtn";
import { useState } from "react";

function App() {

    let [disabled, setDisabled] = useState(false);
    let [flag, setFlag] = useState("false");
    let [miliseconds, setMiliseconds] = useState(0);
    let [seconds, setSeconds] = useState(0);

    function start() {
        setDisabled(oldValue => oldValue = true);
        let timeout;
        let display = document.querySelector(".display");
        let miliseconds=Number(display.textContent.split(":")[1]);
        setFlag(oldValue => oldValue = "false");
        if (display.id == "true") {
            clearTimeout(timeout);
            timeout = undefined;
            return;
        }
        if (display.id == "false") {
            setMiliseconds(oldValue => oldValue += 1);
            if (miliseconds == 59) {
                console.log(miliseconds);
                setMiliseconds(oldValue => oldValue = 0);
                setSeconds(oldValue => oldValue += 1);
            }
            timeout = setTimeout(start, 10);
        }
    }

    function stop() {
        setFlag(oldValue => oldValue = "true");
        setDisabled(oldValue => oldValue = false);
    }

    function zero() {
        setFlag(oldValue => oldValue = "true");
        setDisabled(oldValue => oldValue = false);
        setMiliseconds(oldValue => oldValue = 0);
        setSeconds(oldValue => oldValue = 0);
    }

    return (
        <>
            <div className="container">
                <h1>Chronometer</h1>
                <Display miliseconds={miliseconds} seconds={seconds} flag={flag} />
                <div className="buttons">
                    <StartBtn disabled={disabled} event={start} />
                    <button onClick={stop}>Stop</button>
                    <button onClick={zero}>Zeroed</button>
                </div>

            </div>
        </>
    )
}

export default App
