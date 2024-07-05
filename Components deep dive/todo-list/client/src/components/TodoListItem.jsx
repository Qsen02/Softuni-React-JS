export default function TodoListItem(props) {

    return (
        <tr className={props.status ? "is-completed" : "todo"}>
            <td>{props.text}</td>
            <td>{props.status ? "Completed" : "Not completed"}</td>
            <td className="todo-action">
                <button onClick={()=>props.onChangeStatus(props.id)} className="btn todo-btn">Change status</button>
            </td>
        </tr>
    )
}