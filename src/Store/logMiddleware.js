export default function logMiddleware(store) {
    return function (next) {
        return function (action) {
            const beforeState = store.getState();
            next(action);
            console.log(action.type, action.payload, {
                beforeState: beforeState.toJS(),
                afterState: store.getState().toJS()
            });
            // next(action);
            // console.log(action);
        }
    }
}
