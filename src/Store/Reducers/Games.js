import { List } from 'immutable';

const initialState = List();

export default function Games(state = initialState, action)
{
    switch(action.type) {
        case 'GAMES_LOADED':
            return new List(action.payload);
        default:
            return state;
    }
}
