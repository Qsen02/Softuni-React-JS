export default function Members(props) {
    return (
        <>
            <div className="col-lg-3 col-sm-6">
                <div className="box ">
                    <div className="img-box">
                        <img src={props.member.image} className="img1" alt="" />
                    </div>
                    <div className="detail-box">
                        <h5>
                            {props.member.name}
                        </h5>
                        <p>
                            {props.member.position}
                        </p>
                    </div>
                    <div className="social_box">
                        <a href="#">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-youtube-play" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}