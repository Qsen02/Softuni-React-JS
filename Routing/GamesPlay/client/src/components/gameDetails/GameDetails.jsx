import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteGame, getGameById } from "../../api/gameService";
import { getUserData } from "../../utils/userDataHelper";

export default function GameDetails() {
    let [game, setGame] = useState({});
    let [isOwner, setIsOwner] = useState(false);
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            let game = await getGameById(id);
            setGame(game);
            let userData = getUserData();
            if (userData) {
                if (userData._id == game._ownerId) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            }
        })()
    }, [])

    async function onDelete() {
        let confirming = confirm("Are you sure?");
        console.log(confirming)
        if (confirming) {
            await deleteGame(id);
            navigate("/");
        } else {
            navigate(`/catalog/${id}`);
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
            </div>
        </section>
    )
}