import { useEffect, useState } from "react"
import { getAllGames } from "../../api/gameService";
import CatalogGames from "./catalog-games/CatalogGames";

export default function Catalog() {
    let [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            let data = await getAllGames();
            setGames(data);
        })()
    },[])

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0
                ? games.map(el =>
                    <CatalogGames
                        key={el._id}
                        id={el._id}
                        title={el.title}
                        imageUrl={el.imageUrl}
                        category={el.category}
                    />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    )
}