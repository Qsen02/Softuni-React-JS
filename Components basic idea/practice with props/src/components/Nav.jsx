import NavLinks from "../partials/navLinks"

export default function Nav() {
    let navLinks = [
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
        <ul className="navbar-nav  ">
            <NavLinks link={navLinks[0]} />
            <NavLinks link={navLinks[1]} />
            <NavLinks link={navLinks[2]} />
            <NavLinks link={navLinks[3]} />
            <NavLinks link={navLinks[4]} />
            <li className="nav-item">
                <a className="nav-link" href="#"> <i className="fa fa-user" aria-hidden="true"></i> Login</a>
            </li>
            <form className="form-inline">
                <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>
        </ul>
    )
}