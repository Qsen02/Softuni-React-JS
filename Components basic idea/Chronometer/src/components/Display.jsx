export default function Display(props) {
    return (
        <div className="display" id={props.flag}>{props.seconds}:{props.miliseconds}</div>
    )
}