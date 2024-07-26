import CatalogGames from "./catalog-games/CatalogGames";

import { useGetAllGames } from "../../hooks/useGames";

export default function Catalog() {
    const {games}=useGetAllGames([])

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