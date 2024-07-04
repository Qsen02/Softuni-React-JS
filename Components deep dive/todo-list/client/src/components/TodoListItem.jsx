export default function TodoListItem(props) {

    async function updateStatus() {
        try {
            console.log(props.id);
            let response = await fetch(`${props.host}/todos/${props.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isCompleted: !props.status })
            });
            if (!response.ok) {
                let err = response.json();
                throw new Error(err.message);
            }
        } catch (err) {
            alert(err);
            return;
        }
    }

    return (
        <tr className={props.status ? "is-completed" : "todo"}>
            <td>{props.text}</td>
            <td>{props.status ? "Completed" : "Not completed"}</td>
            <td className="todo-action">
                <button onClick={updateStatus} className="btn todo-btn">Change status</button>
            </td>
        </tr>
    )
}