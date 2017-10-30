export default function logMiddleware(store) {
    return function (next) {
        return function (action) {
            const beforeState = store.getState();
            next(action);
            console.groupCollapsed(
                `%cAction:%c ${action.type}`,
                'font-weight: bold; text-decoration: underline;',
                'color: blue;'
            );

            console.log(
                '%cpayload:',
                'font-weight: bold',
                action.payload
            )

            console.log(
                '%cbefore: ',
                'font-weight: bold;',
                beforeState.toJS()
            );
            console.log(
                '%cafter:  ',
                'font-weight: bold;',
                store.getState().toJS()
            )
            console.groupEnd();
        }
    }
}
