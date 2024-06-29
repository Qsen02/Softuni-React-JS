import Members from "../partials/Members";
export default function Team() {
    let members=[
        {
            image:"images/team-4.jpg",
            name:"Josephine Allard",
            position:"Marketing Head"
        },
        {
            image:"images/team-1.jpg",
            name:"Joseph Brown",
            position:"Marketing Head"
        },
        {
            image:"images/team-2.jpg",
            name:"Nancy White",
            position:"Marketing Head"
        },
        {
            image:"images/team-3.jpg",
            name:"Earl Martinez",
            position:"Marketing Head"
        }
    ]
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
                            <Members member={members[0]}/>
                            <Members member={members[1]}/>
                            <Members member={members[2]}/>
                            <Members member={members[3]}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}