import { Map } from 'immutable';

const initialState = Map({
    owned: {
        type: 'bool',
        value: true
    },
    isExpansion: {
        type: 'custom',
        value: 'expansions-off'
    }
});

export default function GamesFilters(state = initialState, action)
{
    switch(action.type) {
        case 'GAMES_FILTER_SET':
            return action.payload.value ?
                state.set(action.payload.name, { type: action.payload.type, value: action.payload.value }) :
                state.delete(action.payload.name);
        default:
            return state;
    }
}
