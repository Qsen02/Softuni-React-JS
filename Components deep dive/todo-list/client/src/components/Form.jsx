import styles from "../styles/Form.module.css";

export default function Form(props) {
    return (
        <form onSubmit={props.addTodoHandler} className={styles.addForm}>
            <label>Text</label>
            <input type="text" name="text" />
            <label>Status</label>
            <select name="isCompleted">
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
            </select>
            <button>Add todo</button>
        </form>
    )
}