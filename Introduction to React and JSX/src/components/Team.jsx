import Members from "../partials/Members";
export default function Team() {
    return (
        <>
            <section className="team_section layout_padding">
                <div className="container-fluid">
                    <div className="heading_container heading_center">
                        <h2 className="">
                            Our <span> Team</span>
                        </h2>
                    </div>

                    <div className="team_container">
                        <div className="row">
                            <Members />
                            <Members />
                            <Members />
                            <Members />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}