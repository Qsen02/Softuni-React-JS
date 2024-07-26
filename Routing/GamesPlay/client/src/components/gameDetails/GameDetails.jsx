import { useContext, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import GameDetailsComments from "./gameDetailsComments/GameDetailsComments";
import { UserContext } from "../../context/userContext";
import { useDeleteGame, useGetOneGame, usePostComment } from "../../hooks/useGames";
import { useNormalForm } from "../../hooks/useForm";

export default function GameDetails() {
    const initalGameValue = {};
    const initalCommentsValue = [];
    const initalOwnerValue = false;
    const initalvalues = {
        comment: ""
    }
    let { id } = useParams();
    let navigate = useNavigate();
    const deleteGame = useDeleteGame();
    const postComment = usePostComment();
    const { user } = useContext(UserContext);
    const { game, comments, isOwner, setCommentHandler } = useGetOneGame(initalGameValue, initalCommentsValue, initalOwnerValue, user, id);
    const { formValues, changeHandler, submitHandler } = useNormalForm(initalvalues, onComment, `/catalog/${id}`)

    async function onDelete() {
        let confirming = confirm("Are you sure?");
        if (confirming) {
            await deleteGame(id);
            navigate("/");
        } else {
            navigate(`/catalog/${id}`);
        }
    }

    async function onComment() {
        let comment = formValues.comment;
        try {
            if (!comment) {
                throw new Error("Field must be filled!");
            }
            let newComment = await postComment({ gameId: id, comment });
            setCommentHandler(newComment);
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
                    <form onSubmit={submitHandler} className="form">
                        <textarea name="comment" placeholder="Comment......" value={formValues.comment} onChange={changeHandler} />
                        <input className="btn submit" type="submit" value="Add comment" />
                    </form>
                </article>
                : ""
            }
        </section>
    )
}