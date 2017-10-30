export default function logMiddleware(store) {
    return function (next) {
        return function (action) {
            next(action);
            console.log(action);
        }
    }
}
