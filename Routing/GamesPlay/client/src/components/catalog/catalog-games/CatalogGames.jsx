import { Link } from "react-router-dom"

export default function CatalogGames({
    imageUrl,
    id,
    title,
    category
}) {
    return (
        <div class="allGames">
            <div class="allGames-info">
                <img src={imageUrl} alt={title} />
                <h6>{category}</h6>
                <h2>{title}</h2>
                <Link to={`/catalog/${id}`} class="details-button">Details</Link>
            </div>
        </div>
    )
}