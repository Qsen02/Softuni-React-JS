export default function Inputs(props) {
    return (
        <>
            {props.isError
                ? <input type={props.input.type} id={props.input.id} placeholder={props.input.placeholder} className="errorField"/>
                : <input type={props.input.type} id={props.input.id} placeholder={props.input.placeholder} />
            }
        </>
    )
}