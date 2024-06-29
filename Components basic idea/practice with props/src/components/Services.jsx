import Service from "../partials/Service";

export default function Services() {
    let services = [
        {
            image: "images/s1.png",
            name: "Currency Wallet",
            description: "fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using"
        },
        {
            image: "images/s2.png",
            name: "Security Storage",
            description: "fact that a reader will be distracted by the readable content of a page when looking at its layout The point of using"
        },
        {
            image: "images/s3.png",
            name: "Expert Support",
            description: "fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using"
        }
    ]
    return (
        <>
            <section className="service_section layout_padding">
                <div className="service_container">
                    <div className="container ">
                        <div className="heading_container heading_center">
                            <h2>
                                Our <span>Services</span>
                            </h2>
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                            </p>
                        </div>
                        <div className="row">
                            <Service curService={services[0]}/>
                            <Service curService={services[1]}/>
                            <Service curService={services[2]}/>
                        </div>
                        <div className="btn-box">
                            <a href="">
                                View All
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}