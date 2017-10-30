import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Filters.css';
export default class Filter extends PureComponent
{
    static propTypes = {
        defaultChecked: PropTypes.bool,
        filter: PropTypes.string,
        label: PropTypes.string,
        mode: PropTypes.oneOf([
            'bool',
            'custom',
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
                    name={this.props.name}
                    onChange={ev => this.props.onChange(
                        this.props.name,
                        this.props.mode,
                        this.props.mode === 'custom' ? this.props.filter : (
                            this.props.mode === 'bool' ? ev.target.checked : ev.target.value
                        )
                    )}
                    onClick={this.props.type === 'radio' ? ev => this.props.onChange(
                        this.props.name,
                        this.props.mode,
                        this.props.mode === 'custom' ? this.props.filter : (
                            this.props.mode === 'bool' ? ev.target.checked : ev.target.value
                        )
                    ) : null}
                    type={this.props.type}
                />
            </div>
        )
    }
}
