import { useContext, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { postComment } from "../../api/gameService";
import GameDetailsComments from "./gameDetailsComments/GameDetailsComments";
import { UserContext } from "../../context/userContext";
import { useDeleteGame, useGetOneGame } from "../../hooks/useGames";

export default function GameDetails() {
   const initalGameValue={};
   const initalCommentsValue=[];
   const initalOwnerValue=false;
    let [formValues, setFormValues] = useState({
        comment: ""
    })
    let { id } = useParams();
    let navigate = useNavigate();
    const deleteGame=useDeleteGame();
    const {user}=useContext(UserContext);
    const {game,comments,isOwner,setCommentHandler}=useGetOneGame(initalGameValue,initalCommentsValue,initalOwnerValue,user,id )

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
        event.preventDefault();
        let comment = formValues.comment;
        try {
            if (!comment) {
                throw new Error("Field must be filled!");
            }
            let newComment = await postComment({ gameId: id, comment });
            setCommentHandler(newComment);
            setFormValues(oldValues => ({ ...oldValues, comment: "" }))
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
            {user && !isOwner
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