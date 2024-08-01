import { del, get, post, put } from "./api";

let endpoint = "/data/games";
let commentEndpoint = "/data/comments";

export async function getAllGames() {
    let data = await get(`${endpoint}?sortBy=_createdOn%20desc`);
    return data;
}

export async function getLatesGames() {
    let data = await get(`${endpoint}?sortBy=_createdOn%20desc&distinct=category&pageSize=3`);
    return data;
}

export async function getGameById(id) {
    let data = await get(`${endpoint}/${id}`);
    return data;
}

export async function createGame(data) {
    await post(`${endpoint}/`, data);
}

export async function deleteGame(id) {
    await del(`${endpoint}/${id}`);
}

export async function editGame(id, data) {
    await put(`${endpoint}/${id}`, data);
}

export async function getComments(gameId) {
    let data = await get(`${commentEndpoint}?where=gameId%3D%22${gameId}%22&load=author%3D_ownerId%3Ausers`);
    return data;
}

export async function postComment(data) {
    return await post(commentEndpoint, data);
}