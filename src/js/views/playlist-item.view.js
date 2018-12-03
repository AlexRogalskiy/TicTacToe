'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements } from 'libs/elements.lib';

const rowStyle = {
  color: "#333",
  fontFamily: "monospace",
  fontSize: "32",
};

type PlayListItemField = {
	id: string;	
	className?: string;
	content?: string;
};
type Props = {
	item: Object<PlayListItemField>;
	onClick?: func;
	children?: Node;
};


const PlayListItemView = (props: Props): Node => (
	<Elements.TRow style={rowStyle} onClick={props.onClick}>
    {
      props.item.fields.map((field: PlayListItemField): Node => (
        <Elements.TBodyField id={props.item.id} className={props.item.className}>props.content</Elements.TBodyField>
      ))
    }
    </Elements.TRow>
);

export default PlayListItemView;