import React from "react";
import propTypes from 'prop-types';

export default class Provider extends React.Component {
    static childContextTypes = {
        store: propTypes.object.isRequired
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return this.props.children;
    }
}