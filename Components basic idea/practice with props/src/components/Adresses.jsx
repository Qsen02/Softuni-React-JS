import Contacts from "../partials/Contacts";

export default function Adresses() {
    let contacts = [
        {
            icon: "fa fa-map-marker",
            content: "Location"
        },
        {
            icon: "fa fa-phone",
            content: "Call +01 1234567890"
        },
        {
            icon: "fa fa-envelope",
            content: "demo@gmail.com"
        }
    ]
    return (
        <>
            <div className="info_contact">
                <h4>
                    Address
                </h4>
                <div className="contact_link_box">
                    <Contacts contact={contacts[0]} />
                    <Contacts contact={contacts[1]} />
                    <Contacts contact={contacts[2]} />
                </div>
            </div>
        </>
    )
}