import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Game from './Components/Game';
import Filter from './Components/Filter';
import { fetchGames } from './Store/Actions/Games';
import { setFilter } from './Store/Actions/GamesFilters';

import './App.css';
import './Components/Games.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = ev => this._handleSubmit(ev);
    this.handleFilter = (...args) => this._handleFilter(...args);
  }
  _handleSubmit(ev) {
    ev.preventDefault();
    const { value } = this.username;
    if(value) {
      this.props.fetchGames(value);
    }
  }
  _handleFilter(name, type, value) {
      this.props.setFilter(name, type, value);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BGG List</h1>
        </header>
        <section className="App-section Games">
            <div className="Games-filters">
              <Filter label="Name" onChange={this.handleFilter} name="name" />
              <Filter label="Min players" onChange={this.handleFilter} name="minPlayers" mode="gte" type="number"/>
              <Filter label="Max players" onChange={this.handleFilter} name="maxPlayers" mode="gte" type="number"/>
              <Filter label="< Rating" onChange={this.handleFilter} name="averageRating" mode="gte" type="number"/>
              <Filter label="> Rank" onChange={this.handleFilter} name="rank" mode="lte" type="number"/>
              <Filter label="Expansion?" onChange={this.handleFilter} name="isExpansion" mode="bool" type="checkbox"/>
              <Filter defaultChecked label="Owned" onChange={this.handleFilter} name="owned" mode="bool" type="checkbox" />
              <Filter label="Want" onChange={this.handleFilter} name="want" mode="bool" type="checkbox" />
              <Filter label="Want to play" onChange={this.handleFilter} name="wantToPlay" mode="bool" type="checkbox" />
              <Filter label="Want to buy" onChange={this.handleFilter} name="wantToBuy" mode="bool" type="checkbox" />
              <form onSubmit={this.handleSubmit} ref={e => this.form = e}>
                <input type="text" name="username" ref={e => this.username = e} defaultValue="moonty" />
                <input type="submit" value="Fetch" />
              </form>
            </div>
            <div className="Games-list">
                {this.props.games.map((game, idx) => <Game key={idx} {...game} />)}
            </div>
        </section>
      </div>
    );
  }
}

const regExps = {

};
export default connect(
  (state) => ({
    games: state.get('games'),
    gamesFilters: state.get('gamesFilters')
  }),
  (dispatch) => ({
    fetchGames: bindActionCreators(fetchGames, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch),
  }),
  ({ games, gamesFilters }, propsFromDispatch) => ({
    games: games.filter(item => filterGame(item, gamesFilters)),
    ...propsFromDispatch
  })
)(App);

function filterGame(game, filters) {
  return filters.reduce((carry, filter, prop) => {
    if (typeof game[prop] === 'undefined') {
      return carry;
    }
    if (filter.type === 'loose') {
      if (!regExps[prop] || regExps[prop].raw !== filter.value) {
        try {
          regExps[prop] = {exp: new RegExp(filter.value, ['i']), raw: filter.value};
        } catch(e) {
          regExps[prop] = {exp: new RegExp(''), raw: filter.value};
          console.error(e);
        }
      }
      if (regExps[prop]) {
        return carry && regExps[prop].exp.test(game[prop]);
      }
    } else if (filter.type === 'exact') {
      return carry && filter.value === game[prop];
    } else if (filter.type === 'gte') {
      return carry && filter.value <= game[prop];
    } else if (filter.type === 'lte') {
      return carry && filter.value >= game[prop];
    } else if (filter.type === 'bool') {
      return carry && filter.value === game[prop];
    }
    return carry;
  }, true);
}
