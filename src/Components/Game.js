import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Labels from './Game/Labels';

import './Game.css';
export default class Game extends PureComponent
{
    static propTypes = {
        name: PropTypes.string.isRequired
    }
    round(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    render() {
        return (
            <div className="Game Game-small">
                <Labels {...this.props} />
                <div className="Game-header">
                    <div className="Game-thumb"><img alt={this.props.name} src={this.props.thumbnail} /></div>
                    <h3 className="Game-title">
                        <Link to={`/games/${this.props.gameId}`}>{this.props.name}</Link>
                        {' '}
                        <a href={`https://boardgamegeek.com/boardgame/${this.props.gameId}`} target="_blank">{'🎲 BGG'}</a>
                    </h3>
                </div>
                <div className="Game-description">{this.props.userComment}</div>
            </div>
        )
    }
}
