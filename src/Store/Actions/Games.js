export const Actions = {
    GAMES_LOAD: 'GAMES_LOAD',
    GAMES_LOADED: 'GAMES_LOADED',
};

export function fetchGames(userName) {
    return {
        type: Actions.GAMES_LOAD,
        payload: userName
    };
}
