export default function Service(props) {
    return (
        <>
            <div className="col-md-4 ">
                <div className="box ">
                    <div className="img-box">
                        <img src={props.curService.image} alt={props.curService.name} />
                    </div>
                    <div className="detail-box">
                        <h5>
                            {props.curService.name}
                        </h5>
                        <p>
                            {props.curService.description}
                        </p>
                        <a href="">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}