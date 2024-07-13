import { useEffect, useState } from "react"
import { getLatesGames } from "../../api/gameService";
import HomeGames from "./home-games/HomeGames";

export default function Home() {
    let [games, setGames] = useState([]);
    useEffect(() => {
        (async () => {
            let data = await getLatesGames();
            setGames(data);
        })()
    }, [])

    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="/images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>
                {games.length > 0
                    ? games.map(el=><HomeGames
                        key={el._id}
                        id={el._id}
                        imageUrl={el.imageUrl}
                        title={el.title}
                        />
                    )
                    : <p className="no-articles">No games yet</p>
                }
            </div>
        </section>
    )
}