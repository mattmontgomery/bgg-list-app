export const Actions = {
    GAMES_LOAD: 'GAMES_LOAD',
    GAMES_LOADED: 'GAMES_LOADED',
    GAME_LOAD_AMAZON: 'GAME_LOAD_AMAZON',
    GAME_LOADED_AMAZON: 'GAME_LOADED_AMAZON'
};

export function fetchGames(userName) {
    return {
        type: Actions.GAMES_LOAD,
        payload: userName
    };
}
export function fetchAmazon(id) {
    return {
        type: Actions.GAME_LOAD_AMAZON,
        payload: id
    };
}
