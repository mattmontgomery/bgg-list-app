# bgg-list-app

This is a simple application for viewing a given user's BoardGameGeek collection.

To get BGG data, this uses a [JSON API](https://bgg-json.azurewebsites.net/).

## Clearing data

To avoid hitting the API too frequently, this stores data in local storage. If you clear that,
you'll get the most recent data available from BGG.

## Technologies used
- React
- redux (+ react-redux, redux-immutable)
- Bootstrapped for quick development with [Create React App](https://github.com/facebookincubator/create-react-app).
