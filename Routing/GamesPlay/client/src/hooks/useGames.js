import { useEffect, useState } from "react";
import { getAllGames, getLatesGames } from "../api/gameService";

export function useGetAllGames(initalValues) {
    let [games, setGames] = useState(initalValues);

    useEffect(() => {
        (async() => {
            let data = await getAllGames();
            setGames(data);
        })()
    }, [])

    return {
        games
    }
}

export function useGetLatestGames(initalValues) {
    let [games, setGames] = useState(initalValues);

    useEffect(() => {
        (async() => {
            let data = await getLatesGames();
            setGames(data);
        })()
    }, [])

    return {
        games
    }
}