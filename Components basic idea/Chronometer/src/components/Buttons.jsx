function StartBtn(props) {
    return (
        <button onClick={props.event} disabled={props.disabled}>Start</button>
    )
}

function StopBtn(props) {
    return (
        <button onClick={props.event} disabled={props.disabled}>Stop</button>
    )
}

function ZeroBtn(props) {
    return (
        <button onClick={props.event} disabled={props.disabled}>Zeroed</button>
    )
}

export {
    StartBtn, StopBtn,ZeroBtn
}