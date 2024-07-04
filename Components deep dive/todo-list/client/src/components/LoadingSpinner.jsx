export default function LoadingSpinner(props) {
    return (
        <>
            {props.exercises.length == 0
                ? <div className="loading-container">
                    <div className="loading-spinner">
                        <span className="loading-spinner-text">Loading</span>
                    </div>
                </div>
                : ""
            }
        </>
    )
}