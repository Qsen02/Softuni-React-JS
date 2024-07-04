import { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import TodoListItem from './components/TodoListItem';

function App() {
    const host = "http://localhost:3030/jsonstore";
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        async function getResources() {
            try {
                let response = await fetch(`${host}/todos`);
                if (!response.ok) {
                    let err = await response.json();
                    throw new Error(err.message);
                }
                let data = await response.json();
                setExercises(Object.values(data));
            } catch (err) {
                alert(err);
                return;
            }
        }
        getResources();
    }, [])

    return (
        <main className="main">
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <button className="btn">+ Add new Todo</button>
                </div>

                <div className="table-wrapper">

                    <LoadingSpinner exercises={exercises} />

                    <table className="table">
                        <thead>
                            <tr>
                                <th className="table-header-task">Task</th>
                                <th className="table-header-status">Status</th>
                                <th className="table-header-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exercises.map(el => <TodoListItem id={el._id} key={el._id} text={el.text} status={el.isCompleted} host={host}/>)
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default App
