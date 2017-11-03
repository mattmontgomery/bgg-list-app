import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAmazon } from '../../Store/Actions/Games';
import Labels from './Labels';

import './Main.css';

export class Main extends PureComponent {
    componentDidMount() {
        this.props.fetchAmazon(this.props.id);
    }
    render() {
        return (
            <div className="Game Game-main">
                <div className="Game-main-image">
                    <Labels {...this.props} />
                    <img alt={this.props.name} src={this.props.image} />
                </div>
                <div className="Game-details">
                    <h3>{this.props.name}</h3>
                </div>
            </div>
        );
    }
}


export default connect(
    (state, { match: { params: { id }}}) => {
        const game = state.get('games')
            .filter(({ gameId }) => gameId === parseInt(id, 10))
            .get(0);

        return {
            ...(game && typeof game === 'object' ? game : {})
        };
    },
    (dispatch) => ({
        fetchAmazon: bindActionCreators(fetchAmazon, dispatch)
    })
)(Main);
