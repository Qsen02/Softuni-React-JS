export default function Notification(props) {
    function closing(){
        let notification=document.querySelector(".error");
        notification.style.display="none";
    }

    return (
        <>
            {props.notify
                ? <div class="error" onClick={closing}>
                    <p>Numbers must be between 1 or 15 digits!</p>
                  </div>
                : null
            }
        </>
    )
}