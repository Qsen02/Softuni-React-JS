import { useEffect, useState } from "react";
import { createGame, deleteGame, editGame, getAllGames, getComments, getGameById, getLatesGames, postComment } from "../api/gameService";

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

    async function setCommentHandler(newComment) {
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
    }, [gameId, comments])

    return {
        game,
        isOwner,
        comments,
        setCommentHandler
    }
}

export function useCreateGame() {
    async function creatingGame(data) {
        await createGame(data);
    }

    return creatingGame;
}

export function useDeleteGame() {
    async function deletingGame(gameId) {
        await deleteGame(gameId);
    }

    return deletingGame;
}

export function useEditGame() {
    async function editingGame(gameId, data) {
        await editGame(gameId, data);
    }

    return editingGame;
}

export function usePostComment() {
    async function postingComment(data) {
        return await postComment(data);
    }

    return postingComment;
}