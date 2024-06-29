export default function Reasons(props) {
    return (
        <>
            <div className="box">
                <div className="img-box">
                    <img src={props.reason.image} alt={props.reason.name} />
                </div>
                <div className="detail-box">
                    <h5>
                    {props.reason.name}
                    </h5>
                    <p>
                    {props.reason.description}
                    </p>
                </div>
            </div>
        </>
    )
}