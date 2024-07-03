import "./styles/style.css";
import Display from "./components/Display";
import {StopBtn,StartBtn,ZeroBtn} from "./components/Buttons";
import { useState } from "react";

function App() {

    let [startBtnDis, setStartBtnDis] = useState(false);
    let [stopBtnDis, setStopBtnDis] = useState(true);
    let [zeroBtnDis,setZeroBtnDis]=useState(true);
    let [flag, setFlag] = useState("false");
    let [miliseconds, setMiliseconds] = useState(0);
    let [seconds, setSeconds] = useState(0);

    function start() {
        let display = document.querySelector(".display");
        let timeout;
        let miliseconds = Number(display.textContent.split(":")[1]);
        if (display.id == "true") {
            clearTimeout(timeout);
            timeout = undefined;
            setFlag(oldValue => oldValue = "false");
            return;
        }
        if (display.id == "false") {
            setStopBtnDis(oldValue=>oldValue=false);
            setZeroBtnDis(oldValue=>oldValue=false);
            setStartBtnDis(oldValue => oldValue = true);
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
        let display = document.querySelector(".display");
        if (display.id == "false") {
            setFlag(oldValue => oldValue = "true");
        } else {
            setFlag(oldValue => oldValue = "false");
        }
        setStartBtnDis(oldValue => oldValue = false);
        setStopBtnDis(oldValue=>oldValue=true);
    }

    function zero() {
        let display = document.querySelector(".display");
        if (display.id == "false" && display.textContent=="0:0") {
            setFlag(oldValue => oldValue = "true");
        } else {
            setFlag(oldValue => oldValue = "false");
        }
        setStartBtnDis(oldValue => oldValue = false);
        setMiliseconds(oldValue => oldValue = 0);
        setSeconds(oldValue => oldValue = 0);
        setZeroBtnDis(oldValue=>oldValue=true);
    }

    return (
        <>
            <div className="container">
                <h1>Chronometer</h1>
                <Display miliseconds={miliseconds} seconds={seconds} flag={flag} />
                <div className="buttons">
                    <StartBtn disabled={startBtnDis} event={start} />
                    <StopBtn disabled={stopBtnDis} event={stop}/>
                    <ZeroBtn disabled={zeroBtnDis} event={zero}/>
                </div>

            </div>
        </>
    )
}

export default App
