export default function NavLinks(props) {

    function activate(event) {
        event.preventDefault();
        let liArr=Array.from(event.target.parentElement.parentElement.children);
        if (event.target.parentElement.className == "nav-item") {
            for(let li of liArr){
                if(li.className=="nav-item active" && li.children[0]!=event.target){
                    li.className="nav-item";
                }
                if(li.children[0]==event.target){
                    li.className="nav-item active";
                }

            }
        }
    }

    return (
        <li className="nav-item">
            <a onClick={activate} className="nav-link" href={props.link.path}> {props.link.name}</a>
        </li>
    )
}