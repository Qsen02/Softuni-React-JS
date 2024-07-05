import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import TodoListItem from './TodoListItem';
import Form from './Form';

export default function Main() {

    const host = "http://localhost:3030/jsonstore";
    const [exercises, setExercises] = useState([]);
    const [pending, setPending] = useState(true);

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
                setPending(false);
            } catch (err) {
                alert(err);
                return;
            }
        }
        getResources();
    }, [])

    function changeStatus(todoId) {
        async function updateTodoStatus() {
            let todo = exercises.find(el => el._id == todoId)
            try {
                let response = await fetch(`${host}/todos/${todoId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ isCompleted: !todo.isCompleted })
                });
                if (!response.ok) {
                    let err = response.json();
                    throw new Error(err.message);
                }
                setExercises(() =>
                    exercises.map(el =>
                        el._id == todoId
                            ? { ...el, isCompleted: !el.isCompleted }
                            : el
                    )
                )
            } catch (err) {
                alert(err);
                return;
            }
        }
        updateTodoStatus();
    }
    function createTodo(event) {
        event.preventDefault();
        async function onCreate() {
            console.log(event.target);
            let formData = new FormData(event.target);
            let text = formData.get("text");
            let isCompleted = formData.get("isCompleted");
            if(isCompleted=="Not Completed"){
                isCompleted=false;
            }else{
                isCompleted=true;
            }
            try {
                if (!text) {
                    throw new Error("Text must filled!");
                }
                let response=await fetch(`${host}/todos`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        text:text,
                        isCompleted:isCompleted
                    })
                })
                if(!response.ok){
                    let err=await response.json();
                    throw new Error(err.message);
                }
                let data=await response.json();
                setExercises(exercises=>[...exercises,data]);
                event.target.reset();
            } catch (err) {
                alert(err);
                return;
            }
        }
        onCreate();
    }

    return (
        <main className="main">
            <section className="todo-list-container">
                <h1>Todo List</h1>

                <Form addTodoHandler={createTodo} />

                <div className="table-wrapper">

                    <LoadingSpinner isPending={pending} />

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
                                exercises.map(el =>
                                    <TodoListItem
                                        id={el._id}
                                        key={el._id}
                                        text={el.text}
                                        status={el.isCompleted}
                                        host={host}
                                        onChangeStatus={changeStatus}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}