import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getGameById } from "../../api/gameService";
import { useEditGame } from "../../hooks/useGames";

export default function EditForm() {
    let [formValues, setFormValues] = useState({
        title: "",
        category: "",
        maxLevel: "",
        imageUrl: "",
        summary: ""
    })
    let { id } = useParams();
    let navigate=useNavigate();
    const editGame=useEditGame();

    function changeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }));
    }

    useEffect(() => {
        (async () => {
            let game = await getGameById(id);
            setFormValues(game);
        })()
    }, [])

    async function onEdit(event) {
        event.preventDefault();
        let title = formValues.title;
        let category = formValues.category;
        let maxLevel = formValues.maxLevel;
        let imageUrl = formValues.imageUrl;
        let summary = formValues.summary;
        try {
            if (!title || !category || !imageUrl || !summary || !maxLevel) {
                throw new Error("All fields required!");
            }
            await editGame(id, { title, category, imageUrl, summary, maxLevel, _id: id });
            event.target.reset();
            navigate(`/catalog/${id}`);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <section id="edit-page" className="auth">
            <form onSubmit={onEdit} id="edit">
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={formValues.title} onChange={changeHandler} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={formValues.category} onChange={changeHandler} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value={formValues.maxLevel} onChange={changeHandler} />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={formValues.imageUrl} onChange={changeHandler} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={formValues.summary} onChange={changeHandler} />
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}