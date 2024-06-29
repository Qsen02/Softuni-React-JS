import Icons from "../partials/Icons";

export default function Socials() {
    let icons = ["fa fa-facebook", "fa fa-twitter", "fa fa-linkedin", "fa fa-instagram"];

    return (
        <div className="info_social">
            <Icons icon={icons[0]} />
            <Icons icon={icons[1]} />
            <Icons icon={icons[2]} />
            <Icons icon={icons[3]} />
        </div>
    )
}