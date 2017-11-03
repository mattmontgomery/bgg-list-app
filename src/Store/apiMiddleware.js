import apiCalls from './ApiCalls';
export default function apiMiddleware(store) {
    return function (next) {
        return function (action) {
            next(action);
            if (action && action.type) {
                apiCalls(action, next);
            }
        }
    }
}
