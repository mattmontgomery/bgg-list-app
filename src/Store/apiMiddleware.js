import { Actions as Games } from './Actions/Games';

export default function apiMiddleware(store) {
    return function (next) {
        return function (action) {
            next(action);
            if (action && action.type) {
                if (action.type === Games.GAMES_LOAD) {
                    // check local storage cache
                    const stored = checkLocalStorage('games');
                    if(stored && !stored.error && !stored.message) {
                        next({
                            type: Games.GAMES_LOADED,
                            payload: stored
                        });
                    } else {
                        fetch(`https://bgg-json.azurewebsites.net/collection/${action.payload}`)
                            .then(function(response) { return response.json(); })
                            .then((json) => {
                                storeInLocalStorage('games', json);
                                next({
                                    type: Games.GAMES_LOADED,
                                    payload: json
                                });
                        });
                    }
                }
            }
        }
    }
}


function checkLocalStorage(key) {
    try {
        const stored = localStorage.getItem(key)
        if (stored) {
            return JSON.parse(stored);
        }
    } catch(e) {
        console.error(e);
        return { error: true };
    }
}

function storeInLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch(e) {
        console.error(e);
    }
}
