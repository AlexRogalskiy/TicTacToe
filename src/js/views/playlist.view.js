'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements } from 'libs/elements.lib';
import PlaylistItemView from 'views/playlist-item.view';

const headerStyle = {
  color: "#333",
  fontFamily: "monospace",
  fontSize: "32",
};

type PlaylistItem = {
	id: string;
	className?: string;
};
type Props = {
	items?: Array<PlaylistItem>;
	onClick?: func;
	children?: Node;
};

const PlaylistView = (props: Props): Node => (
  <Elements.Table class={props.className}>
    <Elements.THead style={headerStyle}>
      <Elements.TRow>
        <Elements.THeadField>Title</Elements.THeadField>
        <Elements.THeadField>Artist</Elements.THeadField>
      </Elements.TRow>
    </Elements.THead>
    <Elements.TBody>
    {
      props.items.map((item: PlayListItem): Node => (
        <PlaylistItemView
          item={item}
          onClick={props.onClick}
        />
      ))
    }
    </Elements.TBody>
  </Elements.Table>
);

export default PlaylistView;