import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GameList from './Components/GameList';
import Main from './Components/Game/Main';

import { fetchGames } from './Store/Actions/Games';

import './App.css';

export class App extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = ev => this._handleSubmit(ev);
    }
    componentDidMount() {
        this.handleSubmit();
    }
    _handleSubmit(ev) {
        if (ev) {
            ev.preventDefault();
        }
        const { value } = this.username;
        if(value) {
            this.props.fetchGames(value);
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title"><Link to="/">BGG List</Link></h1>
                    <form onSubmit={this.handleSubmit} ref={e => this.form = e}>
                      <input type="text" name="username" ref={e => this.username = e} defaultValue="moonty" />
                      <input type="submit" value="Fetch" />
                    </form>
                </header>
                <Route path="/games/:id" component={Main} />
                <Route exact path="/" component={GameList} />
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        fetchGames: bindActionCreators(fetchGames, dispatch)
    })
)(App);
