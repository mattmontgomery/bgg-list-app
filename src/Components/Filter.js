import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Filters.css';
export default class Filter extends PureComponent
{
    static propTypes = {
        defaultChecked: PropTypes.bool,
        label: PropTypes.string,
        mode: PropTypes.oneOf([
            'bool',
            'exact',
            'gte',
            'loose',
            'lte',
        ]),
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string,
        value: PropTypes.string
    }
    static defaultProps = {
        mode: 'loose',
        type: 'text'
    }
    render() {
        return (
            <div className="Filter">
                <label className="Filter-label">{this.props.label}</label>
                <input
                    defaultChecked={this.props.defaultChecked}
                    defaultValue={this.props.value}
                    onChange={ev => this.props.onChange(
                        this.props.name,
                        this.props.mode,
                        this.props.type === 'checkbox' ? ev.target.checked : ev.target.value
                    )}
                    type={this.props.type}
                />
            </div>
        )
    }
}
