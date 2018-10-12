"use strict";
/**
 * Module dependencies
 */
import { React }     from 'react';
import { BasicIcon } from 'appRoot/js/components/elements/basicIcon';

let Types = React.PropTypes;

export default class BasicMenuItem extends React.Component {
    displayName: 'BasicMenuItem'
	static propTypes: {
        dataClass: Types.object,
		title: Types.string,
        item: Types.object
    }
    static defaultProps = {
        dataClass: { iconClass: 'menuitemIcon' },
        className: 'menuitem',
        title: '',
        item: {}
    }
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: props.dataClass,
            className: props.className,
            title: props.title,
            item: props.item
        };
    }
    onClick(e) {
        if(this.props.onClick) {
            this.props.onClick(e);
        }
    }
    render() {
    	const { dataClass, item, key, title, onClick, ...rest } = this.props;
        const { iconClass, ...restClass } = dataClass;
        return (
            <li key={key} onClick={this.onClick} {...rest}><BasicIcon className={iconClass} />{title}</li>
        );
    }
}