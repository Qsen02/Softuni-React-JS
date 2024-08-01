import {  useNavigate, useParams } from "react-router-dom";
import { useEditGame } from "../../hooks/useGames";
import { useNormalForm } from "../../hooks/useForm";

export default function EditForm() {
    const initialvalues={
        title: "",
        category: "",
        maxLevel: "",
        imageUrl: "",
        summary: ""
    }
    let { id } = useParams();
    const editGame=useEditGame();
    const navigate=useNavigate();
    const {formValues,changeHandler,submitHandler}=useNormalForm(initialvalues,onEdit,id)

    async function onEdit() {
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
            navigate(`/catalog/${id}`);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <section id="edit-page" className="auth">
            <form onSubmit={submitHandler} id="edit">
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