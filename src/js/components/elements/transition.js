"use strict";
/**
 * Module dependencies
 */
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';

export default function ImageCarousel(props) {
	const { transition, img, ...rest } = props;
	return (
		<div {...rest}>
			<CSSTransitionGroup
				transitionName={transition.name ? transition.name : "carousel"}
				transitionEnterTimeout={transition.enterTimeout ? transition.enterTimeout : 300}
				transitionLeaveTimeout={transition.leaveTimeout ? transition.leaveTimeout : 300}>
				<img src={img.src} key={img.id} {...img} />
			</CSSTransitionGroup>
		</div>
	);
}