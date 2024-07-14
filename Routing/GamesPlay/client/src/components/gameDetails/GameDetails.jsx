import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteGame, getComments, getGameById, postComment } from "../../api/gameService";
import { getUserData } from "../../utils/userDataHelper";
import GameDetailsComments from "./gameDetailsComments/GameDetailsComments";

export default function GameDetails() {
    let [game, setGame] = useState({});
    let [isOwner, setIsOwner] = useState(false);
    let [comments, setComments] = useState([]);
    let [formValues, setFormValues] = useState({
        comment: ""
    })
    let { id } = useParams();
    let navigate = useNavigate();
    let userData = getUserData();

    useEffect(() => {
        (async () => {
            let game = await getGameById(id);
            setGame(game);
            if (userData) {
                if (userData._id == game._ownerId) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            let comments = await getComments(id);
            console.log(comments);
            setComments(comments);
        })()
    }, [])

    async function onDelete() {
        let confirming = confirm("Are you sure?");
        if (confirming) {
            await deleteGame(id);
            navigate("/");
        } else {
            navigate(`/catalog/${id}`);
        }
    }

    function changeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }))
    }

    async function onComment(event) {
        let comment = formValues.comment;
        try {
            if (!comment) {
                throw new Error("Field must be filled!");
            }
            await postComment({ gameId: id, comment });
            event.target.reset();
            navigate(`/catalog/${id}`);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>
                {isOwner
                    ? <div className="buttons">
                        <Link to={`/catalog/${game._id}/edit`} className="button">Edit</Link>
                        <Link to={`/catalog/${game._id}`} onClick={onDelete} className="button">Delete</Link>
                    </div>
                    : ""
                }
                <div className="details-comments">
                    <h2>Comments:</h2>
                    {comments.length > 0
                        ? <ul>
                            {comments.map(el => <GameDetailsComments key={el._id} content={el.comment} />)}
                        </ul>
                        : <p className="no-comment">No comments.</p>
                    }
                </div>
            </div>
            {userData && !isOwner
                ? <article className="create-comment">
                    <label>Add new comment:</label>
                    <form onSubmit={onComment} className="form">
                        <textarea name="comment" placeholder="Comment......" value={formValues.comment} onChange={changeHandler} />
                        <input className="btn submit" type="submit" value="Add comment" />
                    </form>
                </article>
                : ""
            }
        </section>
    )
}