import { useEffect, useState } from "react";
import { getAllGames, getComments, getGameById, getLatesGames } from "../api/gameService";

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

export function useGetOneGame(initalGameValue, initalCommentsValue, initalOwnerValue, userData, gameId) {
    let [game, setGame] = useState(initalGameValue);
    let [isOwner, setIsOwner] = useState(initalOwnerValue);
    let [comments, setComments] = useState(initalCommentsValue);

    function setCommentHandler(newComment) {
        setComments(oldValues => [...oldValues, newComment]);
    }

    useEffect(() => {
        (async() => {
            let game = await getGameById(gameId);
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
        (async() => {
            let comments = await getComments(gameId);
            setComments(comments);
        })()
    }, [])

    return {
        game,
        isOwner,
        comments,
        setCommentHandler
    }
}