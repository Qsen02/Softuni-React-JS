export default function StartBtn(props){
return (
    <button onClick={props.event} disabled={props.disabled}>Start</button>
)
}