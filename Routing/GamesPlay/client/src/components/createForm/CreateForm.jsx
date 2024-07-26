import { useCreateGame } from "../../hooks/useGames";
import { useNormalForm } from "../../hooks/useForm";

export default function CreateForm() {
    const initialvalues={
        title: "",
        category: "",
        maxLevel: "",
        imageUrl: "",
        summary: ""
    }

    const createGame=useCreateGame();

    const {formValues,changeHandler,submitHandler}=useNormalForm(initialvalues,onCreate,"/")

    async function onCreate() {
        let title = formValues.title;
        let category = formValues.category;
        let imageUrl = formValues.imageUrl;
        let summary = formValues.summary;
        let maxLevel = formValues.maxLevel;
        try {
            if (!title || !category || !imageUrl || !summary || !maxLevel) {
                throw new Error("All fields required!");
            }
            await createGame({title,category,imageUrl,summary,maxLevel});
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <section id="create-page" className="auth">
            <form onSubmit={submitHandler} id="create">
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title..." value={formValues.title} onChange={changeHandler} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category..." value={formValues.category} onChange={changeHandler} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" value={formValues.maxLevel} onChange={changeHandler} />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." value={formValues.imageUrl} onChange={changeHandler} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={formValues.summary} onChange={changeHandler} />
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    )
}