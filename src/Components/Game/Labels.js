import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Labels.css';

export default class Labels extends PureComponent
{
    static propTypes = {
        name: PropTypes.string
    }
    round(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    render() {
        return (
            <div className="Game-labels">
                {this.props.isExpansion ? <span className="Game-labels-expansion">{'⚙️ Expansion'}</span> : null}
                <span
                    className={classnames("Game-labels-rating", {
                        'Game-labels-rating--very-high': this.props.averageRating >= 8,
                        'Game-labels-rating--high': this.props.averageRating >= 7 && this.props.averageRating < 8,
                        'Game-labels-rating--med-high': this.props.averageRating >= 6 && this.props.averageRating < 7,
                        'Game-labels-rating--med': this.props.averageRating >= 5 && this.props.averageRating < 6,
                        'Game-labels-rating--low': this.props.averageRating < 5,
                    })}
                >{'👍 '}{this.round(this.props.averageRating, 2)}</span>
                <span className="Game-labels-year">{'📅 '}{this.props.yearPublished}</span>
                <span
                    className={classnames("Game-labels-plays", {
                        'Game-labels-plays--unplayed': !this.props.numPlays,
                    })}
                >{'🎲 '}{this.props.numPlays ? this.props.numPlays : 'Unplayed'}</span>
                <span className="Game-labels-players">
                    {'👫 '}
                    {this.props.minPlayers}
                    {this.props.maxPlayers !== this.props.minPlayers ? ` to ${this.props.maxPlayers}` : null}
                    {' players'}
                </span>
                {this.props.rank > 0 ? <span className="Game-labels-rank">{'📈 #'}{this.props.rank}</span> : null}
                <span
                    className={classnames("Game-labels-playtime", {
                        'Game-labels-playtime--very-high': this.props.playingTime >= 120,
                        'Game-labels-playtime--high': this.props.playingTime >= 90 && this.props.playingTime < 120,
                        'Game-labels-playtime--med-high': this.props.playingTime >= 45 && this.props.playingTime < 90,
                        'Game-labels-playtime--med': this.props.playingTime >= 30 && this.props.playingTime < 45,
                        'Game-labels-playtime--low': this.props.playingTime < 30,
                    })}
                >{'⏰ - '}{this.props.playingTime}</span>
            </div>
        )
    }
}
