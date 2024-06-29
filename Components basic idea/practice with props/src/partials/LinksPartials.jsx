export default function LinksPartial(props) {
    return (
        <a className="" href={props.link.path}>
            {props.link.name}
        </a>
    )
}