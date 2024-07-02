import "./styles/style.css";
import Display from "./components/Display";
import { useState } from "react";

function App() {
    let [count, setCount] = useState("00:00");

    function start(event) {
        event.target.disabled = true;
        let hundreds = 10;
        for (let i = 0; i < 60; i++) {
            for (let j = 0; j < 60; j++) {
                hundreds += 10;
                setTimeout(() => setCount(oldValue => oldValue = `${i}:${j}`), hundreds);
            }
        }
    }

    return (
        <>
            <div className="container">
                <h1>Chronometer</h1>
                <Display count={count} />
                <div className="buttons">
                    <button onClick={start}>Start</button>
                    <button>Stop</button>
                    <button>Zeroed</button>
                </div>

            </div>
        </>
    )
}

export default App
