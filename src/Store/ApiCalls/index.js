import { Actions as Games } from '../Actions/Games';
import amazon from 'amazon-product-api';

const client = amazon.createClient({
    awsTag: process.env.REACT_APP_AWS_TAG,
    awsId: process.env.REACT_APP_AWS_ID,
    awsSecret: process.env.REACT_APP_AWS_SECRET
})
client.itemLookup({
  idType: 'UPC',
  itemId: '884392579524'
}).then(function(results) {
  console.log(JSON.stringify(results));
}).catch(function(err) {
  console.log(err);
});
export default function ApiCalls(action, next) {
    if (action.type === Games.GAMES_LOAD) {
        loadGames(action, next);
    }
}

export function loadGames(action, next) {
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
