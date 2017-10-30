export const Actions = {
    GAMES_FILTER_SET: 'GAMES_FILTER_SET',
    GAMES_FILTER_REMOVE: 'GAMES_FILTER_REMOVE',
};

export function setFilter(name, type, value) {
    return {
        type: Actions.GAMES_FILTER_SET,
        payload: {name, type, value}
    };
}
