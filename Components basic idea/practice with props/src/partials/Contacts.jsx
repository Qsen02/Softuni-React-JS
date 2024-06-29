export default function Contacts(props) {
    return (
        <>
            <a href="">
                <i className={props.contact.icon} aria-hidden="true"></i>
                <span>
                    {props.contact.content}
                </span>
            </a>
        </>
    )
}