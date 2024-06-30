export default function Labels(props) {
    return (
        <>
            {props.isError
                ? <label className="errorLabel">{props.label.textContent}</label>
                : <label>{props.label.textContent}</label>
            }
        </>
    )
}