import LinksPartial from "../partials/LinksPartials"

export default function Links() {
    let links = [
        {
            path: "index.html",
            name: "Home"
        },
        {
            path: "about.html",
            name: "About"
        },
        {
            path: "service.html",
            name: "Services"
        },
        {
            path: "why.html",
            name: "Why Us"
        },
        {
            path: "team.html",
            name: "Team"
        }
    ]
    return (
        <div className="info_link_box">
            <h4>
                Links
            </h4>
            <div className="info_links">
                <LinksPartial link={links[0]} />
                <LinksPartial link={links[1]} />
                <LinksPartial link={links[2]} />
                <LinksPartial link={links[3]} />
                <LinksPartial link={links[4]} />
            </div>
        </div>
    )
}