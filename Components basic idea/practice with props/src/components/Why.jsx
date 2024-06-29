import Reasons from "../partials/Reasons";

export default function WhySection() {
    let reasons = [
        {
            image: "images/w1.png",
            name: "Expert Management",
            description: " Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus"
        },
        {
            image: "images/w2.png",
            name: "Secure Investment",
            description: " Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus"
        },
        {
            image: "images/w3.png",
            name: "Instant Trading",
            description: " Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus"
        },
        {
            image: "images/w4.png",
            name: "Happy Customers",
            description: " Incidunt odit rerum tenetur alias architecto asperiores omnis cumque doloribus aperiam numquam! Eligendi corrupti, molestias laborum dolores quod nisi vitae voluptate ipsa? In tempore voluptate ducimus officia id, aspernatur nihil.Tempore laborum nesciunt ut veniam, nemo officia ullam repudiandae repellat veritatis unde reiciendis possimus animi autem natus"
        }
    ]
    return (
        <>
            <section className="why_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Why Choose <span>Us</span>
                        </h2>
                    </div>
                    <div className="why_container">
                        <Reasons reason={reasons[0]}/>
                        <Reasons reason={reasons[1]}/>
                        <Reasons reason={reasons[2]}/>
                        <Reasons reason={reasons[3]}/>
                    </div>
                    <div className="btn-box">
                        <a href="">
                            Read More
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}